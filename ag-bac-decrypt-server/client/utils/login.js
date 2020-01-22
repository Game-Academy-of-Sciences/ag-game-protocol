const axios = require('axios').default;
const axiosCookieJarSupport = require('axios-cookiejar-support').default;
const format = require('format');
const urlparse = require('url-parser').parse;
const tough = require('tough-cookie');
const struct = require('python-struct');
const cheerio = require('cheerio');

// const {cmd, analysis, plazeFlagsMap, RoomFlagsMap} = require('./ag');

const cmd = require('./ag/cmd');
const { RoomFlagsMap, plazeFlagsMap } = require('./ag/cmd');

const Ws = require('./ws');
const qs = require('qs');


axiosCookieJarSupport(axios);


const getUrlString = async(url, cookieJar, isJson=false) => {
    return new Promise((resolve, reject) => {
        axios.get(url, {
            jar: cookieJar, 
            withCredentials: true
          }).then((resp) => {
              if(isJson) {
                resolve(resp.data);
              } else {
                resolve(resp.data.toString());
              }
          }).catch((err) => {
              reject(err);
          });
    })
};


async function authLogin(url) {

    return await new Promise(async (resolve, reject) => {
        var isGuest = true;
        try {
            if(url == undefined) {
                url = null;
                var czjUrl = 'http://czj229.com/caiZhiJiaCPLoginWeb/app/loginDemoVerification';
                var headers = {
                    'Content-Type': 'application/json'
                }
                var cookieJar = new tough.CookieJar();
                var resp = await axios.post(czjUrl, {}, { headers, jar: cookieJar, withCredentials: true });
                if(resp.data.success) {
                    czjUrl = 'http://czj229.com/caiZhiJiaCPLoginWeb/app/playHoldem';

                    var data = {"product":"LIVE_AG","type":"undefined"};

                    resp = await axios.post(czjUrl, data, {headers, jar: cookieJar, withCredentials: true}) ;
                    if(resp.data.success) {
                        url = resp.data.link;
                    }
                }

                if(url === null) {
                    console.log('获取试玩url成功');
                } else {
                    console.log('获取试玩url失败');
                }
            } else {
                isGuest = false;
            }
            var cookieJar = new tough.CookieJar();
            
            var doc = cheerio.load(await getUrlString(url, cookieJar));
            // 获取跳转url
            var rediectUrl = doc('meta[http-equiv="refresh"]').attr('content');
            rediectUrl = rediectUrl.match(/url=(.*)/i)[1];
            // 获取游戏版本
            var gameVersion = rediectUrl.match(/(\w+)\/index\.jsp/i)[1];
            // 获取账户信息
            var urlInfo = urlparse(url);
            rediectUrl = format('%s//%s:%s/agingame/%s', urlInfo.protocol, urlInfo.hostname, urlInfo.port, rediectUrl);
        
            var loginSource = await getUrlString(rediectUrl, cookieJar);
            loginSource = loginSource.match(/var\s+defaultConfig\s+=\s+\{(\s|\n|.)*?\}/g)[0];
        
            var pidUsername = loginSource.match(/pid:\s*'(.+)'/)[1] + loginSource.match(/username:\s*'(.+)'/)[1];
            var doForwardUrl = loginSource.match(/doForward:\s*'(.+)'/)[1];
            doForwardUrl = format('%s//%s:%s%s', urlInfo.protocol, urlInfo.hostname, urlInfo.port, doForwardUrl);
        
            // 处理加密配置
            var doForwardConfig = await getUrlString(doForwardUrl, cookieJar, true);
            var password = doForwardConfig.msg.slice(6, 38);
            var ipServer = doForwardConfig.ips;
            
            // 获取配置文件
            
            var hostConfigUrl = format('%s//%s:%s/agingame/%s/resource/config/host_config.xml', urlInfo.protocol, urlInfo.hostname, urlInfo.port, gameVersion);
            
            var hostConfigDoc = cheerio.load(await getUrlString(hostConfigUrl, cookieJar));
        
            var root = hostConfigDoc('environment');
            var hostConfig = {
                domain: root.attr('domain'),
                loginPort: 0,
                plazaPort: 0,
                roadPort: 0,
                roomPortConfig: {}
            };
            root.find('host').each((_, el) => {

                switch(el.attribs['hosttype']) {
                    case 'login':
                        hostConfig.loginPort = parseInt(el.attribs['port']);
                        break;
                    case 'plaza':
                        hostConfig.plazaPort = parseInt(el.attribs['port']);
                        break;
                    case 'road':
                        hostConfig.roadPort = parseInt(el.attribs['port']);
                        break;
                    case 'game':
                        var vids = el.attribs['vids'];
                        var platform = el.attribs['platform'];
                        var port = parseInt(el.attribs['port']);
                        if (el.attribs['gametype'] === 'BAC' && vids !== undefined) {
                            vids.split(' ').forEach(vid => {
                                hostConfig.roomPortConfig[vid.trim()] = {
                                    platform,
                                    port,
                                    param: undefined, // wsABSTime
                                    token: undefined,  // wsSecret
                                    streamUrl: undefined
                                }
                                // console.log(hostConfig.roomPortConfig[vid.trim()]);
                            });
                        }
                        break;
                    default:
                        break;
                }
            });

            // 获取视频url
            var streamConfigUrl = format('%s//%s:%s/agingame/%s/resource/config/stream_config_crypto.xml', urlInfo.protocol, urlInfo.hostname, urlInfo.port, gameVersion);
            var streamConfigDoc = cheerio.load(await getUrlString(streamConfigUrl, cookieJar));
            streamConfigDoc('streams stream').each((_, el) => {
                var vid = el.attribs['vid'];
                
                if(hostConfig.roomPortConfig[vid] !== undefined) {
                    //   scheme://cdn1.phgse.cn/CDN/C12{resolution}.flv
                    hostConfig.roomPortConfig[vid].streamUrl = format('%s%s', urlInfo.protocol, cheerio.load(el)('line').attr('url')).replace('{resolution}', '1');
                }
            });

            // 获取token
            var loginServerUrl = format('ws://%s:%s', hostConfig.domain, hostConfig.loginPort);

            var isLogin = false;
            var loginToken = undefined;
            Ws(loginServerUrl, (ws, buffer) => {
                var [flags, length]  = struct.unpack('>ii', buffer);
                switch(flags) {
                    case 131185:
                        isLogin = true;
                        break;
                    case 131073:
                        if (!isLogin) {
                            
                            reject();
                            ws.close();
                            break;
                        }
                        var [flags, length, _ , __, ...tokenBytes] = struct.unpack('>iiii16B', buffer)
                        loginToken = Buffer.from(tokenBytes);
                        break;
                    case 131087:
                        var [flags, length, mobileAcountExist, gesturePwdExist, _, account, nickname, gender, gameConfig] = struct.unpack('>iicc10sd16sci', buffer);
                        var userConfig = {
                            loginToken: undefined,
                            pidUsername: '',
                            hostConfig: {},
                            balance: 0,
                            vaildBet: 0, //当天有效投注
                            totalBet: 0, // 历史有效投注
                            roomStatus: {},
                            isGuest: false
                        };
                        Object.assign(userConfig, {
                            loginToken,
                            pidUsername,
                            hostConfig,
                            isGuest,
                            balance: account,
                        });
                        resolve(userConfig);
                        ws.close();
                        break;
                    default:
                        break;
                }
            }, (ws) => {
                ws.send(cmd.loginAuth(pidUsername, password, isGuest));
                // 10秒连接不成功，就返回失败
                setTimeout(() => {
                    ws.close();
                    reject();
                }, 10000);
            }, 
            (ws) => reject(),(ws) => reject());
        }catch(err) {
            reject();
        }
    });
}


module.exports = authLogin;