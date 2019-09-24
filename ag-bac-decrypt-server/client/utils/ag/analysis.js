
const struct = require('python-struct');
const AGSecurity = require('./security');
const { plazeFlagsMap, RoomFlagsMap } = require('./cmd');


// [GAME_BET_EXT]
const encryptList = [106499];
// [GameCurrentStatusResp, DealCardListResp, BacGameResultExtResp, BacBeadListResp]
const decryptList = [131094, 368642, 172049, 131080];


function getCardList(cardArray, isChar=false) {
    var query = 'A,1,2,3,4,5,6,7,8,9,10,J,Q,K'.split(',');
    var pattern = {
        1: '♣',
        2: '♦',
        3: '♠',
        4: '♥'
    };
    return cardArray.map(item => {
        if (item == 0) return null;
        var code = item.charCodeAt();
        var type = Math.floor(code / 16);
        var val = query[code % 16];
        return [isChar? pattern[type]:type, val]
    });
}


function analysisPlaza(buffer) {
    var [flags, length] = struct.unpack('>ii', buffer);
    if (plazeFlagsMap[flags] == undefined) return undefined;

    switch (flags) {
        // 登录
        // LoginPlazaResp
        case 262151:
            var [flags, length, _, retCode] = struct.unpack('>iiii', buffer);
            return {
                cmd: flags,
                data: {
                    status: retCode == 0
                }
            }
        // 获取视频wsSecret
        // LiveStreamInfoResp
        case 263434:
            var [flags, length, _, platform, param, token] = struct.unpack('>iii6s30s50s', buffer);
            return {
                cmd: flags,
                data: {
                    platform,
                    param,
                    token
                }
            };
        // GetPlazaRoomStatusResp
        case 262164:

            var result = {};
            var [flags, length, _, roomCount] = struct.unpack('>iiii', buffer);
            var roomStatusBuffer = Buffer.from(buffer.slice(16));
            for(var i=0; i<roomCount; i++) {
                var [vid, status, startTime1, startTime2] = struct.unpack('>4siii', roomStatusBuffer.slice(i*16));
                var startTime = startTime1 << 4 + startTime2;
                result[vid] = {
                    status,
                    startTime
                }
            }
            return {
                cmd: flags,
                data: {
                    result
                }
            };
        // BacGameResultResp
        case 131089:
            var [flags, length, _, vid, res, gmcode, bval, pval, num, pair] = struct.unpack('>iii4sB14sBBBB', buffer)
            return {
                cmd: flags,
                data: {
                    vid,
                    gmcode,
                    bval,
                    pval,
                }
            };
        // 百家乐视频时间, 需要自行设置定时器
        // VideoStatusInfoResp
        case 32771:
        case 131125:
            var [flags, length, _, vid, gameStatus, timeout, maxTimeout, lastRes] = struct.unpack('>iii4sBHHB', buffer);
            return {
                cmd: flags,
                data: {
                    vid,
                    gameStatus,
                    timeout,
                    maxTimeout,
                }
            };

        // 有效投注
        // UserPointResp
        case 262233:
            var [flags, length, _, retCodeInt, graphIndex, levelInt, scoreInt, dayPayoffNum, dayValidBetNum, _totalBetNum, loginLongNum, totalBetNum] = struct.unpack('>iiiiiiiffffd', buffer);
            return {
                cmd: flags,
                type: 'Plaza',
                data: {
                    dayValidBetNum,
                    totalBetNum
                }
            };

        // UpdateBalanceResp
        case 131106:
            var [flags, length, _, balance, seq] = struct.unpack('>iiidi', buffer);
            return {
                cmd: flags,
                data: {
                    balance
                }
            };
        //  RestShoecodeResp
        case 131100:
            var [flags, length, _, vid]  = struct.unpack('>iii4s', buffer);
            return {
                cmd: flags,
                data: {
                    vid,
                }
            }
        // ClientLastPosResp
        case 262230:
            var [flags, length, _, vid, tableCode, seat, isLink]  = struct.unpack('>iii4s4sBB', buffer);
            return {
                cmd: flags,
                data: {
                    vid, tableCode, seat, isLink
                }
            };
        
        // GetVideoTokenResp
        case 514:
        // UserVideoTokenResp
        case 516:
            var [flags, length, _, vid, ...token]  = struct.unpack('>iii4s16B', buffer);
            return {
                cmd: flags,
                data: {
                    vid, token
                }
            };
        // ExceptionExitResp
        case 131142:
            var [flags, length, _, code]  = struct.unpack('>iiiB', buffer);
            return {
                cmd: flags,
                data: {
                    code
                }
            };
        
        default:
            return undefined;
    }
}


function analysisRoom(buffer) {
    var [flags, length] = struct.unpack('>ii', buffer);
    if (RoomFlagsMap[flags] == undefined) return undefined;

    switch (flags) {
        // 登录
        // LoginGameExtResp
        case 139266:
            var [flags, length, _, retCode, vid, deviceType] = struct.unpack('iiii4sB', buffer);
            return {
                cmd: flags,
                data: {
                    status: retCode == 0,
                    vid,
                    deviceType
                }
            }
        // AutoEnterTableVidResp
        case 73735:
            var [flags, length, _, retCode, vid, gmcode, seat] = struct.unpack('>iiii4s4sB', buffer);
            return {
                cmd: flags,
                data: {
                    status: retCode == 0,
                    vid,
                    gmcode
                }
            }
        // 未下注警告
        // GameNoBetWarnResp
        case 131103:
            var [flags, length, _, count] = struct.unpack('>iiiB',buffer);
            return {
                cmd: flags,
                data: {
                    count
                }
            }
        // 对局开始(每隔15秒发送getCMDKeepSeq)， 另外需要发送应答包 ws.send_binary(struct.pack('>iii', 1, 12, result))
        // GameStartResp
        case 131083:
            var [flags, length, _, retCode, gmcode] = struct.unpack('>iii14sH', buffer);
            return {
                cmd: flags,
                data: {
                    retCode, 
                    gmcode
                }
            }
        // GamePayoutMeResp
        case 131088:
            var [flags, length, _, gmcode, payout, balance, ptNum] = struct.unpack('>iii14sddB', buffer);
            return {
                cmd: flags,
                data: {
                    gmcode, 
                    balance,
                    payout
                }
            }
        // GameBetResp
        case 131075:
            var [flags, length, _, retCode] = struct.unpack('>iiii',buffer);
            return {
                cmd: flags,
                data: {
                    status: retCode == 0
                }
            }
        // status in [1, 2] 就重置时钟
        // GameCurrentStatusResp  
        case 131094:
            var [flags, length, _, vid, platform, status, gmcode, __, timeout, maxTimeout]  = struct.unpack('>iii4s4sB14s6sHH', buffer);
            return {
                cmd: flags,
                data: {
                    vid,
                    platform, 
                    status,
                    gmcode,
                    timeout,
                    maxTimeout
                }
            }
        // BacGameResultExtResp
        case 172049:
            var [flags, length, _, vid, gmcode, bval, pval, bankerCardList, playerCardList, overallRes]  = struct.unpack('>iii4s14scc3c3cH', buffer);
            bankerCardList = getCardList(bankerCardList, true);
            playerCardList = getCardList(playerCardList, true);
            var cardType = [];

            overallRes = Math.floor(overallRes);
            if ((overallRes & 1) >> 0 == 1 || (overallRes & 128) >> 7 == 1)  cardType.push('庄');
            if ((overallRes & 2) >> 1 == 1) cardType.push('闲');
            if ((overallRes & 4) >> 2 == 1) cardType.push('和');
            if ((overallRes & 8) >> 3 == 1) cardType.push('庄对');
            if ((overallRes & 16) >> 4 == 1) cardType.push('闲对');
            if ((overallRes & 32) >> 5 == 1) cardType.push('大');
            if ((overallRes & 64) >> 6 == 1) cardType.push('小');
            if ((overallRes & 256) >> 8 == 1) cardType.push('庄龙宝');
            if ((overallRes & 512) >> 9 == 1) cardType.push('闲龙宝');
            if ((overallRes & 1024) >> 10 == 1) cardType.push('超级6');
            if ((overallRes & 2048) >> 11 == 1) cardType.push('任意对子');
            if ((overallRes & 4096) >> 12 == 1) cardType.push('完美对子');
 
            return {
                cmd: flags,
                data: {
                    vid,
                    gmcode, 
                    bval,
                    pval,
                    bankerCardList,
                    playerCardList,
                    cardType
                }
            }
        // 历史表盘数据
        // BacBeadListResp
        case 131080:
            var [flags, length, _, vid, dataLength]  = struct.unpack('>iii4si', buffer);
            var data = buffer.slice(20, 20 + dataLength * 18);
            var beadList = [];
            for(var i=0; i<dataLength; i++) {
                var [gmcode, bval, pval, _, __] = struct.unpack('>14sBBBB',  data.slice(i * 18, (i+1) * 18));
                beadList.push({gmcode, bval, pval});
            }
            return {
                cmd: flags,
                data: {
                    vid,
                    beadList
                }
            }
        case 301825:
        case 301569:
        case 301840:
        case 301584:
            var userEncryptKey = 0;
            var userDecryptKey = 0
            var broadcastDecryptKey = 0;

            if (flags == 301825) {
                var [flags, length, seqNo, keyType,  key]  = struct.unpack('>iiiBI', buffer);
                if (keyType == 0) {
                    userEncryptKey = key;
                } else if(keyType == 1) {
                    userDecryptKey = key
                }
            }

            var result = AGSecurity.decrypt(buffer, userEncryptKey, userDecryptKey, broadcastDecryptKey);
            switch(result.type) {
                case 0:
                case 1:
                    // 递归
                    return analysis(Buffer.from(result.data, 'base64'));
                case 2:
                    // 发送 generateACKPacket
                    return {
                        cmd: flags,
                        data: {
                            seqNo,
                            userEncryptKey,
                            data
                        }
                    }
                case 3:
                    return {
                        cmd: flags,
                        data: {
                            userDecryptKey,
                        }
                    }
                case 4:
                    return {
                        cmd: flags,
                        data: {
                            broadcastDecryptKey,
                        }
                    }
            }
            break;
        // 翻拍开牌
        // DealCardListResp
        case 368642:
            var [flags, length, _, gmcode, vid, __, bankerCardList, playerCardList, __]  = struct.unpack('>iii14s4s3s3s3s2s', buffer);
            bankerCardList = getCardList(bankerCardList, true);
            playerCardList = getCardList(playerCardList, true);
            return {
                cmd: flags,
                data: {
                    gmcode,
                    vid,
                    bankerCardList,
                    playerCardList
                }
            }
        default:
            return undefined;
    }
}


function analysis(buffer) {
    var [flags, length]  = struct.unpack('>ii', buffer);
    var result = undefined;
    try {
        var analysisFn = [analysisPlaza, analysisRoom];
        while(true) {
            var fn = analysisFn.shift();
            if(fn !== undefined) {
                result = fn(buffer);
                if(result !== undefined) {
                    break;
                }
            } else {
                break;
            }
        }

    } catch(err) {

    }

    if (result == undefined) {
        if (plazeFlagsMap[flags] === undefined && RoomFlagsMap[flags] === undefined) {
            return {
                code: -1,
                message: '解析错误, 指令: ' + flags + ' 数据长度: ' + length
            }
        } else {
            return {
                code: 0,
                message: '跳过解析, 指令: ' + plazeFlagsMap[flags]? plazeFlagsMap[flags]: RoomFlagsMap[flags]
            }
        }
    } else {
        return result;
    }
}


module.exports = {
    analysis,
    plazeFlagsMap,
    RoomFlagsMap
};