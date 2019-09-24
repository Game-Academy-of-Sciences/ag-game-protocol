
const struct = require('python-struct');
// const AGSecurity = require('./security');

const plazeFlagsMap = {
    262151: "LoginPlazaResp",
    263434: "LiveStreamInfoResp",
    262230: "ClientLastPosResp",
    131142: "ExceptionExitResp",
    131079: "DealerInfoResp",
    131077: "LedDealerInfoResp",
    262261: "VIPVideoListResp",
    294914: "WalletSessionResp",
    262164: "GetPlazaRoomStatusResp",
    327734: "PlazaMtStatusResp",
    262257: "PlazaPlayerCountResp",
    262406: "GetSlotGameRecordsResp",
    262293: "GetCreditRecordsResp",
    262545: "GetUserPointRecordsResp",
    262457: "GetNewUserPointRecordsResp",
    262291: "GetBetRecordsResp",
    262279: "GetPlatformTypeResp",
    262281: "GetPlayTypeResp",
    262289: "GetTransTypeResp",
    262412: "GetTainRecordsResp",
    262453: "GetAllPlatformRecordsResp",
    131080: "BacBeadListResp",
    131089: "BacGameResultResp",
    131100: "RestShoecodeResp",
    131114: "DtBeadListResp",
    131113: "DtGameResultResp",
    131848: "BullBeadListResp",
    131857: "BullBeadResultResp",
    131592: "RouBeadListResp",
    131601: "RouGameResultResp",
    131136: "ShbBeadListResp",
    131138: "ShbGameResultResp",
    131139: "VideoRealtimeInfoResp",
    32773: "BjBeadListResp",
    32806: "BjGameResultResp",
    32774: "VideoRealtimeInfoResp",
    32771: "VideoStatusInfoResp",
    45063: "ZjhBeadListResp",
    45071: "ZjhGameResultResp",
    45064: "ZjhVideoRealtimeInfoResp",
    45060: "ZjhVideoStatusInfoResp",
    45329: "BfBeadListResp",
    45328: "BfGameResExtResp",
    172085: "BfVideoStatusInfoResp",
    131127: "VideoRealtimeInfoResp",
    196663: "VideoRealtimeInfoExtResp",
    131125: "VideoStatusInfoResp",
    86039: "VipVideoStatusInfoResp",
    86040: "SeatStatusResp",
    131119: "PersonalLimitResp",
    196632: "CNYRateInfoResp",
    196888: "AllCurrencyInfo",
    131106: "UpdateBalanceResp",
    262214: "ChipSetResp",
    262208: "ChipSetResp",
    262210: "ChipSetSetResp",
    262233: "UserPointResp",
    262455: "UserPointNewResp",
    139313: "OnlinePlayerListResp",
    263470: "AnchorListFollowersResp",
    263171: "AnchorListStatusResp",
    263239: "AnchorListInGameBundleResp",
    263465: "ClientFavouriteAnchorResp",
    263462: "ClientFollowAnchorResp",
    263464: "ClientFollowAnchorResp",
    263469: "DealerFollowersResp",
    299010: "AnchorChatLoginResp",
    299013: "AnchorInfoListResp",
    132168: "AnchorChipSetListResp",
    263456: "MobileQRCodeResp",
    514: "GetVideoTokenResp",
    516: "UserVideoTokenResp",
    266146: "FunRedPocketResp",
    4243969: "MillionEventInfoResp",
    4243968: "MillionEventEndResp"
};

const RoomFlagsMap = {
    131106:  "UpdateBalanceResp",
    139266:  "LoginGameExtResp",
    73735:  "AutoEnterTableVidResp",
    172083:  "GameTablePoolResp",
    131094:  "GameCurrentStatusResp",
    131075:  "GameBetResp",
    131126:  "GameJettonResp",
    172086:  "GameJettonExtResp",
    131083:  "GameStartResp",
    131088:  "GamePayoutMeResp",
    131129:  "GamePayoutOtherResp",
    131103:  "GameNoBetWarnResp",
    131080:  "BacBeadListResp",
    131089:  "BacGameResultResp",
    172049:  "BacGameResultExtResp",
    131125:  "VideoStatusInfoResp",
    131119:  "PersonalLimitResp",
    131096:  "TableLimitResp",
    368642:  "DealCardListResp",
    131100:  "RestShoecodeResp",
    131092:  "UserPositionResp",
    139290:  "UserPositionResp",
    131091:  "UserPositionResp",
    131078:  "UserPositionResp",
    131350:  "GamePoolResp",
    196663:  "VideoRealtimeInfoExtResp",
    131102:  "FeeForDealerResp",
    65567:  "DealerTipsResp",
    65602:  "DealerTipsHistResp",
    192515:  "BacBetCancelResp"
};


function getTickData() {
    return struct.pack('>iii', 8781826, 12, 0);
}

function getPingData() {
    return struct.pack('>iii', 1, 12, 0);
}

/*------ Login ------*/
function loginAuth(pidUsername, password, isGuest) {
    var data = struct.pack('30s16B', [pidUsername, ...Buffer.from(password, 'hex')]);
    var flags = isGuest? 201392129: 69633;
    return struct.pack('>iii46Bi', [flags, 62, 0, ...data, 0]);
}

/*------ Room ------*/

function roomLogin(vid, pidUsername, token, isGuest) {
    token = token.data;
    var data = struct.pack('4s30s3B16B', [vid, pidUsername,  ...[5, 0, 0],  ...token]);
    var flags = isGuest? 73986: 73730;
    return struct.pack('>iii' + data.length+ 'B', [flags, 12 + data.length, 0, ...data]);
}

function roomEnter(vid) {
    return struct.pack('>iii4s', 65542, 16, 0, vid);
}

function roomExit() {
    return struct.pack('>iii4s', 65541, 12, 0);
}

function roomGetCurrentGameStatus() {
    return struct.pack('>iii4s', 65558, 12, 0);
}

/*
function roomDownBet(seqNo, gmcode, betType, money, {userEncryptKey, userDecryptKey, broadcastDecryptKey}) {
    var data = struct.pack('>iii14sHII', 106499, 36, seqNo, gmcode, betType, Math.floor(money), 1);
    return AGSecurity.encrypt(data, userEncryptKey, userDecryptKey, broadcastDecryptKey);
}
*/

/*------ Plaza ------*/

function plazaGetVaildBet(pidUsername) {
    return struct.pack('>iii30s', 131107, 42, 0, pidUsername);
}

function plazaLogin(pidUsername, token, isGuest) {
    token = token.data;
    var data = struct.pack('>30s16B', [pidUsername, ...token]);
    var flags = isGuest? 201588742: 262150;
    return struct.pack('>iii46B', [flags, 58, 0, ...data]);
}

function plazaGetBalance(pidUsername) {
    var GET_PLAYER_BALANCE = 131107;
    return struct.pack('>iii30s', [GET_PLAYER_BALANCE, 42, 0, pidUsername]);
}

module.exports = {
    plazeFlagsMap,
    RoomFlagsMap,

    
    getTickData,
    getPingData,

    loginAuth,
    // room
    roomLogin,
    roomEnter,
    roomExit,
    roomGetCurrentGameStatus,
    // roomDownBet,
    // plaza
    plazaGetVaildBet,
    plazaLogin,
    plazaGetBalance
};