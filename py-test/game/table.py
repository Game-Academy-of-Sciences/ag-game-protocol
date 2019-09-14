from .utils import *

# 进入赌桌
# ws.send_binary(struct.pack('>iii4s', AUTO_ENTER_TABLE, 16, 0, 'C001'.encode()))

# LoginGameExtResp
# 139266


global table_lock
global userEncryptKey
global userDecryptKey
global broadcastDecryptKey
global room_lock

table_lock = Lock()
room_lock = Lock()

userEncryptKey = 0
userDecryptKey = 0
broadcastDecryptKey = 0


def get_table_cmd_login(plaza_info):
    vid = plaza_info.vid
    login_info = plaza_info.login_info
    
    data = struct.pack('4s30s3s16s', vid.encode(), login_info.pid_username.encode(), b'\x05\x00\x00', login_info.token)
    flags = CLIENT_LOGIN_GAME_EXT_TRIAL if login_info.is_guest else CLIENT_LOGIN_GAME_EXT
    return struct.pack(f'>iii{len(data)}s', flags, 12 + len(data), 0, data)


def cmd_login(ws, plaza_info):
    # 发送登录数据
    ws.send_binary(get_table_cmd_login(plaza_info))


def cmd_enter_table(ws, plaza_info):
    # 进入赌桌
    vid = plaza_info.vid
    login_info = plaza_info.login_info
    
    data = struct.pack('4s', vid.encode())
    ws.send_binary(struct.pack(f'>iii{len(data)}s', AUTO_ENTER_TABLE, 12 + len(data), 0, data))


def cmd_exit_table(ws):
    ws.send_binary(struct.pack(f'>iii', GAME_TABLE_EXIT, 12, 0))


def cmd_get_game_status(ws):
    ws.send_binary(struct.pack(f'>iii', GET_GAME_CURRENT_STATUS, 12, 0))


def cmd_down_bet(ws, gmcode, money, down_type):
    """
        桌号： GC0011941610Z
        1 庄
        2 闲
        3 和
    """
    ratio = 1
    seq = 10000

    data = struct.pack('>iii14sHII', GAME_BET_EXT, 36, seq, gmcode.encode(), down_type, int(money) * ratio, ratio)

    # data = xor_encrypt(data, userEncryptKey)
    # ws.send_binary(data)
    
    import requests
    import base64
    buffer = base64.b64encode(data).decode()
    data = {
        'userEncryptKey': int(userEncryptKey),
        'userDecryptKey': int(userDecryptKey),
        'broadcastDecryptKey': int(broadcastDecryptKey),
        'buffer': buffer
    }
    
    resp = requests.post('http://localhost:8888/AGSecurity/Encrypt', data=data)
    data = resp.content
    ws.send_binary(data)
    


def connect_table(plaza_info):
    vid = plaza_info.vid
    login_info = plaza_info.login_info
    ws = create_connection(f'ws://{login_info.port_conf.domain}:{login_info.port_conf.game[vid]["port"]}')
    if ws.connected:
        test_data = bytes([0x00, 0x86, 0x00, 0x02, 0x00, 0x00, 0x00, 0x0C, 0x00, 0x00, 0x00, 0x00])
        ws.send_binary(test_data)
        if ws.recv() == test_data:
            return ws
    return None

global buy_money
global fail_count

buy_money = 20
fail_count = 0
buy_type = 1





def process_table(plaza_info, ws, ws_data):
    global buy_money
    global fail_count
    global buy_type

    global userEncryptKey
    global userDecryptKey
    global broadcastDecryptKey

    (flags, ) = struct.unpack('>i', ws_data[:4])
    
    # output_text('table ' + str(flags))

    # print(flags)
    # LoginGameExtResp
    if flags == 139266:
        flags, length, _, retCode, vid, deviceType, reserve1, reserve2 = struct.unpack('>iiiI4sBBB', ws_data[:23])
        vid = trim(vid).decode()

        if retCode == 0:
            output_text('table 登录成功')

            # 重置加密key
            # userEncryptKey = None
            cmd_exit_table(ws)
            cmd_enter_table(ws, plaza_info)
            
        else:
            ws.close()
            output_text('table 登录失败')
            return
    
    # AutoEnterTableVidResp
    elif flags == 73735:
        flags, length, _, retCode, vid, table_code, seat = struct.unpack('>iiii4s4sB', ws_data[:25])
        vid = trim(vid).decode()
        table_code = trim(table_code).decode()
        if retCode == 0:
            output_text('table 进入成功')
            cmd_get_game_status(ws)
            # 开始心跳
            start_hear(ws)         

        else:
            output_text('table 进入失败')

    # GameNoBetWarnResp
    elif flags == 131103:
        flags, length, _, roundNum = struct.unpack('>iiiB', ws_data[:13])
        cmd_exit_table(ws)
        cmd_enter_table(ws, plaza_info)
        output_text(f'table 未下注警告: {roundNum} -----------------------------')
        
    # GameStartResp
    elif flags == 131083:
        flags, length, result, gmcode, span = struct.unpack('>iii14sH', ws_data[:28])
        gmcode = trim(gmcode).decode()
        ws.send_binary(struct.pack('>iii', 1, 12, result))
        
        '''
        buy_type = 2
        if fail_count >=3:
            buy_type = 1
        '''
        buy_type = random.randint(1, 3)
        if buy_type != 1:
            buy_type = 2
            buy_money = 20
        else:
            buy_money = 50
        print("下注")
        cmd_down_bet(ws, gmcode, buy_money, buy_type)    
        
        print('----GameStartResp----')
        print(f'vid: {plaza_info.vid}')
        print('桌号: ' + gmcode)
        print('下注: ' + str(int(buy_money)))
        print('购买: ' + ['庄', '闲', '和'][buy_type - 1])
        
    
    # GamePayoutMeResp
    elif flags == 131088:
        flags, length, _, gmcode, payout, balance, ptNum = struct.unpack('>iii14sddB', ws_data[:43])
        gmcode = trim(gmcode).decode()

        '''
        if int(payout) > 0:
            buy_money = 20
            fail_count = 0

        elif int(payout) < 0:
            buy_money += 10
            fail_count += 1
        '''
        print('----GamePayoutMeResp----')
        print(f'vid: {plaza_info.vid}')
        print('桌号: ' + gmcode)
        print(f'balance: {balance}')
        print(f'payout: {payout}')
        print(f'ptNum: {ptNum}')

        # ws.connected = False
        
   # GameBetResp
    elif flags == 131075:
        # output_table_text('GameBetResp')
        flags, length, _, retCode = struct.unpack('>iiii', ws_data[:16])
        if retCode == 0:
            print('下注: 成功')
        else:
            print('下注: 失败')
    
    # LoginGameResp
    elif flags in [133692, 135228]:
        flags, length, seqNo  = struct.unpack('>iiI', ws_data[:12])

    elif flags == 131130:
        # output_table_text(ws_data)
        pass

    # 心跳
    elif flags == 135195:
        test_data = bytes([0x00, 0x86, 0x00, 0x02, 0x00, 0x00, 0x00, 0x0C, 0x00, 0x00, 0x00, 0x00])
        ws.send_binary(test_data)
    
    # GameCurrentStatusResp
    elif flags == 131094:
        flags, length, _, vid, gmtype, status, gmcode  = struct.unpack('>iii4s4sB14s', ws_data[:35])
        vid = trim(vid).decode()
        # BAC
        gmtype = trim(gmtype).decode()
        # 桌号
        gmcode = trim(gmcode).decode()
        
        timeout, max_timeout = struct.unpack('>HH', ws_data[-4:])
        print('时间', timeout, max_timeout)
    
    # BacGameResultResp 
    elif flags == 131089:
        print('对局结果-1')
    # BacGameResultExtResp
    # 目前下注是扩展下注
    elif flags == 176145:
        pass
    elif flags == 172049:
        print('对局结果-2')
        print('length', len(ws_data))
        print(list(ws_data))
        flags, length, _, vid, gmcode, bval, pval, bankerCardList, playerCardList, overallRes  = struct.unpack('>iii4s14scc3s3sH', ws_data[:40])
        bankerCardList = list(bankerCardList)
        playerCardList = list(playerCardList)
        gmcode = gmcode.decode()
        vid = vid.decode()
        
        bval = bval[0]
        pval = pval[0]
        
        table = 'A,1,2,3,4,5,6,7,8,9,10,J,Q,K'.split(',')
        for x in range(3):
            pType = int(bankerCardList[x] / 16)
            if pType == 0:
                pType = '♣'
            elif pType == 1:
                pType = '♦'
            elif pType == 2:
                pType = '♠'
            elif pType == 3:
                pType = '♥'
            else:
                pType = ''
            bankerCardList[x] = pType + ':' + table[bankerCardList[x] % 16]
        for x in range(3):
            pType = int(playerCardList[x] / 16)
            if pType == 0:
                pType = '♣'
            elif pType == 1:
                pType = '♦'
            elif pType == 2:
                pType = '♠'
            elif pType == 3:
                pType = '♥'
            else:
                pType = ''
            playerCardList[x] = pType + ':' + table[playerCardList[x] % 16]
        
        print(vid, gmcode, pval, bval, playerCardList, bankerCardList , overallRes)
        result = []
        if (overallRes & 1) >> 0 == 1 or (overallRes & 128) >> 7 == 1:
            result.append('庄')
        if (overallRes & 2) >> 1 == 1:
            result.append('闲')
        if (overallRes & 4) >> 2 == 1:
            result.append('和')
        if (overallRes & 8) >> 3 == 1:
            result.append('庄对')
        if (overallRes & 16) >> 4 == 1:
            result.append('闲对')
        if (overallRes & 32) >> 5 == 1:
            result.append('大')
        if (overallRes & 64) >> 6 == 1:
            result.append('小')
        if (overallRes & 256) >> 8 == 1:
            result.append('庄龙宝')
        if (overallRes & 512) >> 9 == 1:
            result.append('闲龙宝')
        if (overallRes & 1024) >> 10 == 1:
            result.append('PLAYTYPE_SUPER_SIX')
        if (overallRes & 2048) >> 11 == 1:
            result.append('任意对子')
        if (overallRes & 4096) >> 12 == 1:
            result.append('完美对子')
        print(' >> '.join(result))

        '''
                Object["defineProperty"](z84["prototype"], "winPlayTypes", {
                'get': function() {
                    var E84;
                    E84 = [];
                    return ((1 & this["overallRes"]) >> 0 == 1 || (128 & this["overallRes"]) >> 7 == 1) && E84["push"](O84["PLAYTYPE_BANKER"]),
                    (2 & this["overallRes"]) >> 1 == 1 && E84["push"](O84["PLAYTYPE_PLAYER"]),
                    (4 & this["overallRes"]) >> 2 == 1 && E84["push"](O84["PLAYTYPE_TIE"]),
                    (8 & this["overallRes"]) >> 3 == 1 && E84["push"](O84["PLAYTYPE_BANKER_PAIR"]),
                    (16 & this["overallRes"]) >> 4 == 1 && E84["push"](O84["PLAYTYPE_PLAYER_PAIR"]),
                    (32 & this["overallRes"]) >> 5 == 1 && E84["push"](O84["PLAYTYPE_BIG"]),
                    (64 & this["overallRes"]) >> 6 == 1 && E84["push"](O84["PLAYTYPE_SMALL"]),
                    (256 & this["overallRes"]) >> 8 == 1 && E84["push"](O84["PLAYTYPE_BANKER_DRAGON_BONUS"]),
                    (512 & this["overallRes"]) >> 9 == 1 && E84["push"](O84["PLAYTYPE_PLAYER_DRAGON_BONUS"]),
                    (1024 & this["overallRes"]) >> 10 == 1 && E84["push"](O84["PLAYTYPE_SUPER_SIX"]),
                    (2048 & this["overallRes"]) >> 11 == 1 && E84["push"](O84["PLAYTYPE_ANY_PAIR"]),
                    (4096 & this["overallRes"]) >> 12 == 1 && E84["push"](O84["PLAYTYPE_PERFECT_PAIR"]),
                    E84;
                },
                'enumerable': !0,
                'configurable': !0
            }),
        '''

    # BacBeadListResp
    elif flags == 131080:
        print('表盘数据')
    
        '''
        # 需要解密的内容
        elif flags == 301840: # 301854
            return
            flags, length, _, ws_data  = struct.unpack(f'>iii{len(ws_data) - 12}s', ws_data)
            my_ws_data = xor_decrypt(ws_data, userDecryptKey)
            my_ws_data = xor_decrypt(my_ws_data, 1522487922)
            process_table(plaza_info, ws, my_ws_data)
        '''
        '''
        elif flags == 301825:
            flags, length, seqNo, key_type,  key  = struct.unpack('>iiiBI', ws_data[:17])
            
            # userencryptKey
            if key_type == 0:
                if not userEncryptKey:
                    userEncryptKey = key
                Y2R = random.randint(1, 1000)
                a = ctypes.c_uint(Y2R ^ userEncryptKey & 1688052650 | -2147483648).value | 0
                b = ctypes.c_uint(userEncryptKey ^ key | 0).value 
                # a = 0
                # b = userEncryptKey ^ key
                userEncryptKey = key
                ws.send_binary(struct.pack('>iiII', 301826, 16, a, b))
                import requests
                import base64
                buffer = base64.b64encode(ws_data).decode()
                data = {
                    'flags': int(flags),
                    'userEncryptKey': int(userEncryptKey),
                    'userDecryptKey': int(userDecryptKey),
                    'broadcastDecryptKey': int(broadcastDecryptKey),
                    'buffer': buffer
                }
                
                # data = {'broadcastDecryptKey': 0, 'buffer': 'AASbAQAAABHpjMK6AA6xjco=', 'flags': 301825, 'userDecryptKey': 0, 'userEncryptKey': 246517194}
                resp = requests.post('http://localhost:8888/AGSecurity/Decrypt', data=data)
                decryptResult = resp.json()
                # print(decryptResult)
                cmd_type = decryptResult['type']
                if cmd_type == 2:
                    socketData = base64.b64decode(decryptResult['socketData'])
                    ws.send_binary(socketData)
                    print(key, int(decryptResult['userEncryptKey']))
                    # userEncryptKey = key
                    userEncryptKey = int(decryptResult['userEncryptKey'])
                else:
                    userEncryptKey = key
                
            # userDecryptKey
            # 这个用于解密
            elif key_type == 1: 
                userDecryptKey = key
        '''

    elif flags in [73730, 73986]:
        print('get userEncryptKey 1')
        userEncryptKey = struct.unpack('>I', ws_data[49:53])
        userEncryptKey = userEncryptKey
    elif flags in [65538, 65794, 69634, 69890]:
        print('get userEncryptKey 2')
        userEncryptKey = struct.unpack('>I', ws_data[42:46])
        userEncryptKey = userEncryptKey
    elif flags in [45057, 45056]:
        print('get userEncryptKey 3')
        userEncryptKey = struct.unpack('>I', ws_data[47:51])
        userEncryptKey = userEncryptKey
    
    elif flags in [301825, 301569, 301840, 301584]:

        if flags == 301825:
            flags, length, seqNo, key_type,  key  = struct.unpack('>iiiBI', ws_data[:17])
            
            # userencryptKey
            if key_type == 0:
                if not userEncryptKey:
                    userEncryptKey = key
            elif key_type == 1:
                userDecryptKey = key

        # 解密
        import requests
        import base64
        buffer = base64.b64encode(ws_data).decode()
        data = {
            'userEncryptKey': int(userEncryptKey),
            'userDecryptKey': int(userDecryptKey),
            'broadcastDecryptKey': int(broadcastDecryptKey),
            'buffer': buffer
        }
        
        # data = {'broadcastDecryptKey': 0, 'buffer': 'AASbAQAAABHpjMK6AA6xjco=', 'flags': 301825, 'userDecryptKey': 0, 'userEncryptKey': 246517194}

        resp = requests.post('http://localhost:8888/AGSecurity/Decrypt', data=data)
        decryptResult = resp.json()
        # print(decryptResult)

        cmd_type = decryptResult['type']
        if cmd_type in [0, 1]:
            __data = base64.b64decode(decryptResult['data'])
            (flags, ) = struct.unpack('>i', __data[:4])
            if flags == 176145:
                print(list(__data))

            # print('----flags:', flags)
            process_table(plaza_info, ws, __data)
            pass
        elif cmd_type == 2:
            socketData = base64.b64decode(decryptResult['socketData'])
            ws.send_binary(socketData)
            # print(key, int(decryptResult['userEncryptKey']))
            # userEncryptKey = key
            userEncryptKey = int(decryptResult['userEncryptKey'])

        elif cmd_type == 3:
            userDecryptKey = int(decryptResult['userDecryptKey'])
        elif cmd_type == 4:
            broadcastDecryptKey = int(decryptResult['broadcastDecryptKey'])

        
    # RestShoecodeResp
    elif flags == 131100:
        output_table_text('RestShoecodeResp')
        flags, length, _, vid  = struct.unpack('>iii4s', ws_data[:16])
        vid = trim(vid).decode()

    # DealCardListResp
    elif flags == 368642:
        output_table_text('DealCardListResp(翻拍开牌)')
    # DealCardResp
    elif flags == 327682:
        output_table_text('DealCardResp')
    else:
        return
        output_table_text('table: ' + str(flags))


def start_table(plaza_info):
    global table_lock
    global room_lock

    output_text('table 开始监控')
    try:
        ws = connect_table(plaza_info)
        if ws.connected:
            cmd_login(ws, plaza_info)
        while ws.connected:
            ws_data = ws.recv()
            if len(ws_data) >= 12:
                with table_lock:
                    try:
                        process_table(plaza_info, ws, ws_data)
                    except Exception as e:
                        '''
                        import traceback
                        output_text(traceback.print_exc())
                        '''
                        import traceback
                        output_text(traceback.print_exc())
                        output_text('table 处理消息异常')
                        
            else:
                output_text('table 数据异常')
    except:
        
        import traceback
        output_text(traceback.print_exc())
        
        output_text('table 异常结束')
        
    output_text('table 关闭处理')




# CRYPTO_USER_KEY_ACK