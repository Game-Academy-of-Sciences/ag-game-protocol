

const format = require('format');
const struct = require('python-struct');
const axios = require('axios').default;



// const {cmd, analysis, plazeFlagsMap, RoomFlagsMap} = require('./ag');

const cmd = require('./ag/cmd');
const { RoomFlagsMap, plazeFlagsMap } = require('./ag/cmd');


const Ws = require('./ws');


async function analysis(buffer) {
    const resp = await axios.post('/analysis', { buffer: buffer.toString('base64') });
    return resp.data;
}


async function authLogin() {
    var resp = await axios.get('/authLogin');
    if(resp.data.pidUsername === undefined) {
        throw new Error('Login Fail');
    }
    return resp.data;
}

var userConfig = {
    loginToken: undefined,
    pidUsername: '',
    hostConfig: {},
    balance: 0,
    vaildBet: 0, //当天有效投注
    totalBet: 0, // 历史有效投注
    roomStatus: {}
};

var calcRoomTimer = undefined;

function setCalcRoomTimer(vue) {
    calcRoomTimer = setInterval(() => {
        for (const vid in userConfig.roomStatus) {
            if (userConfig.roomStatus.hasOwnProperty(vid)) {
                if(userConfig.roomStatus[vid].timeout > 0) {
                    userConfig.roomStatus[vid].timeout -= 1;
                }
                // vue
                if(vue.tableData[vid] !== undefined) {
                    try{
                        vue.tableData[vid].timeout = userConfig.roomStatus[vid].timeout;
                        if(vue.tableData[vid].timeout === 0) {
                            if(vue.tableData[vid].status !== '洗牌') {
                                vue.tableData[vid].status = '结算';
                            }
                        } else {
                            vue.tableData[vid].status = '正常';
                        }
                    }catch(err) {

                    }
                }
                
                /*
                if (key === 'C001') {
                    console.log(key, userConfig.roomStatus[key].timeout, userConfig.roomStatus[key].gameStatus);
                }
                */
            }
        }
    }, 1000);
}


function clearCalcRoomTimer() {
    clearInterval(calcRoomTimer);
}


async function main(vue) {
    try {
        userConfig = await authLogin();
        // console.log(format('登录成功: %s\t%s', userConfig.pidUsername, userConfig.balance));
    } catch(err) {
        // console.log('登录失败');
        alert('登录失败');
        return;
    }
    
    // 进入大厅
    var plazaUrl = format('ws://%s:%s', userConfig.hostConfig.domain, userConfig.hostConfig.plazaPort);
    Ws(plazaUrl, async (ws, buffer) => {
        if(buffer.length < 12) return;
        var result = await analysis(buffer);
        var [flags] = struct.unpack('>i', buffer);

        switch(plazeFlagsMap[result.cmd]) {
            case 'LoginPlazaResp':
                if(result.data.status == false) {
                    alert('登录失败');
                    return;
                }
                // console.log('登录大厅：' + result.data.status);
                // ws.send(cmd.plazaGetBalance(userConfig.pidUsername));

                // 开始计算房间时间
                setCalcRoomTimer(vue);
                break;
            case 'VideoStatusInfoResp':
                var timeout = result.data.timeout;
                /*
                switch(result.data.gameStatus) {
                    case 1:
                    case 10:
                        if(result.cmd === 131125 && result.data.gameStatus === 1) {
                            timeout = 0;
                        } else if(result.cmd === 32771 && result.data.gameStatus === 10) {
                            timeout = 0;
                        }
                        break;
                }
                */
                userConfig.roomStatus[result.data.vid] = {
                    gameStatus: result.data.gameStatus,
                    timeout: timeout,
                    maxTimeout: result.data.maxTimeout
                }

                break;
            case 'UpdateBalanceResp':
                userConfig.balance = result.data.balance;
                break;
            case 'UserPointResp':
                userConfig.vaildBet = result.data.dayValidBetNum;
                userConfig.totalBetNum = result.data.totalBetNum;
                break;
            case 'ExceptionExitResp':
                if(result.data.code == 0) {
                    ws.close();
                    // console.log('异地登录');
                    alert('异地登录');
                } else {
                    // console.log(format('异常退出：%s', result.data.code));
                    alert(format('异常退出：%s', result.data.code));
                }
                clearCalcRoomTimer();
                break;
            case 'ClientLastPosResp':
                break;
            case 'BacGameResultResp':
                if(vue.tableData[result.data.vid] !== undefined) {
                    var gmcode = result.data.gmcode;
                    var bval = result.data.bval;
                    var pval = result.data.pval;
                    vue.tableData[result.data.vid].beadList.push({
                        gmcode,
                        bval,
                        pval
                    });
                }
                break;
            case 'BacBetCancelResp':
                break;
            case 'RestShoecodeResp':
                // 换牌靴
                // console.log(format('洗牌中: %s', result.data.vid));
                // vue
                if(vue.tableData[result.data.vid] !== undefined) {
                    vue.tableData[result.data.vid].status = '洗牌';
                }
                
                break;
            case 'BacBeadListResp':
                // result.data.beadList;
                // beadList.push({gmcode, bval, pval});

                if(vue.tableData[result.data.vid] !== undefined) {
                    vue.tableData[result.data.vid].beadList = result.data.beadList;
                }
                
                break;
            case 'LiveStreamInfoResp':
                // 没什么用
                for (const vid in userConfig.hostConfig.roomPortConfig) {
                    if(userConfig.hostConfig.roomPortConfig[vid].platform === result.data.platform) {
                        userConfig.hostConfig.roomPortConfig[vid].param = result.data.param;
                        userConfig.hostConfig.roomPortConfig[vid].token = result.data.token;
                    }
                }
                break;
            case 'GetVideoTokenResp':
            case 'UserVideoTokenResp':
                if(userConfig.hostConfig.roomPortConfig[result.data.vid] !== undefined) {
                    userConfig.hostConfig.roomPortConfig[result.data.vid].token = result.data.token;
                }
                break;
            default:
                // console.log(plazeFlagsMap[flags], flags);
                break;
        }

    }, (ws) => {
        ws.send(cmd.plazaLogin(userConfig.pidUsername, userConfig.loginToken, true));
    }, (ws) => {
        console.log('close');
        clearCalcRoomTimer();

    }, (ws, err) => {
        console.log('error');
    });
}

window.mainProcess = main;

