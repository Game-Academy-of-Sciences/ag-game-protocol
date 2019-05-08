
from .utils import *
from .table import start_table

global plaza_info
global plaza_lock


plaza_info = None
plaza_lock = Lock()
plaza_data_lock = Lock()


def get_plaza_cmd_login(login_info):
    data = struct.pack('30s16s', login_info.pid_username.encode(), login_info.token)
    flags = CLIENT_LOGIN_PLAZA_TRIAL if login_info.is_guest else CLIENT_LOGIN_PLAZA
    return struct.pack(f'>iii{ len(data) }s', flags, 12 + len(data), 0, data)


def cmd_login(ws, login_info):
    # 发送登录数据
    ws.send_binary(get_plaza_cmd_login(login_info))
    # 没啥JB用
    """
    ws.send_binary(struct.pack('>iii20s', GET_TRANSTYPE, 20, 0, b'lang_cns'))
    ws.send_binary(struct.pack('>iii20s', GET_PLATFORMTYPE, 20, 0, b'lang_cns'))
    ws.send_binary(struct.pack('>iii20s', GET_PLAYTYPE, 20, 0, b'lang_cns'))
    ws.send_binary(struct.pack('>iiiii', 466958, 20, 0, 0, 0))
    ws.send_binary(struct.pack('>iiiii', GET_ALL_CHIP_SET, 20, 0, 10, 10))
    """


def cmd_get_vaild_bet(ws, login_info):
    # 获取金额
    ws.send_binary(struct.pack('>iii30s', GET_PLAYER_BALANCE, 42, 0, login_info.pid_username.encode()))


def process_plaza(ws, ws_data, callback):
    global plaza_info
    global plaza_data_lock

    (flags, ) = struct.unpack('>i', ws_data[:4])

    # 好像是视频链接的json
    """
    if flags == 299013:
        flags, length = struct.unpack('>ii', ws_data[:8])
        flags, length, _, data = struct.unpack(f'>iii{length-12}s', ws_data)
        # output_plaza_text(data)
    """
    """
    if ws_data.find(b'GC0011941612Z') > -1:
        # 131080
        print(flags)
    """
    
    # 登录
    # LoginPlazaResp pass
    if flags == 262151:
        flags, length, _, retcode, _ = struct.unpack('>iiiic', ws_data)
        if retcode == 0:
            # 重置
            with plaza_data_lock:
                plaza_info.is_login = True
                cmd_get_vaild_bet(ws, plaza_info.login_info)
            
            start_hear(ws)
            
            output_plaza_text('plaza 登录成功')

            callback('login', ws, plaza_info, True)
            # 开始登录
        else:
            ws.close()
            output_plaza_text('plaza 登录失败：{}'.format(retcode))
            callback('login', ws, plaza_info, False)
            return
    
    # 获取视频wsSecret
    # LiveStreamInfoResp pass
    elif flags == 263434:
        flags, length, _, platform, param, token = struct.unpack('>iii6s30s50s', ws_data[:98])
        platform = trim(platform).decode()
        param = trim(param).decode()
        token = trim(token).decode()

        with plaza_data_lock:
            plaza_info.video_token[platform] = {
                "platform": platform,
                "token": token,
                "param": param
            }

            callback('video_key', ws, plaza_info, platform, token, param)

        output_plaza_text('plaza 视频密匙 platform: {} \ttoken: {} \t param: {}'.format(platform, token, param))
    

    # 百家乐游戏进入赌桌后获取所有同类型结果
    # BacGameResultResp
    if flags == 131089:
        flags, length, _, vid, res, code, bval, pval, num, pair = struct.unpack('>iii4sB14sBBBB', ws_data[:35])
        vid = trim(vid).decode()
        code = trim(code).decode()

        with plaza_data_lock:
            plaza_info.room_result[vid] = {
                'vid': vid, 
                'bval': bval,
                'pval': pval
            }

            callback('game_result', ws, plaza_info, vid, bval, pval)
            # print(vid, res, code, bval, pval, num, pair)

        output_plaza_text('plaza 游戏结果 vid: {} \t bval: {} \t pval: {}'.format(vid, bval, pval))

        
    # 百家乐视频时间, 需要自行设置定时器
    elif flags == 131125:
        flags, length, _, vid, status, timeout, max_timeout, last_res = struct.unpack('>iii4sBHHB', ws_data[:22])
        vid = trim(vid).decode()

        with plaza_data_lock:
            plaza_info.room_time[vid] = timeout
            callback('reset_time', ws, plaza_info, vid, timeout)

        output_plaza_text('plaza 重置时间 vid: {} \t timeout: {}'.format(vid, timeout))

    # 有效投注
    # UserPointResp
    elif flags == 262233:
        if len(ws_data) >= 48:
            flags, length, _, retCodeInt, graphIndex, levelInt, scoreInt, dayPayoffNum, dayValidBetNum, totalBetNum, loginLongNum, totalBetNum = struct.unpack('>iiiiiiifffff', ws_data[:48])
        else:
            flags, length, _, retCodeInt, graphIndex, levelInt, scoreInt, dayPayoffNum, dayValidBetNum, totalBetNum, loginLongNum = struct.unpack('>iiiiiiifffff', ws_data[:44])
            totalBetNum = 0

        with plaza_data_lock:
            plaza_info.vaild_bet = dayValidBetNum
            plaza_info.all_vaild_bet = totalBetNum

            callback('user_vaild_bet', ws, plaza_info, dayValidBetNum, totalBetNum)

        output_plaza_text('plaza 有效投注 vaild_bet: {} \t all_vaild_bet: {}'.format(dayValidBetNum, totalBetNum))

    # ExceptionExitResp
    elif flags == 131142:
        ws.close()
        with plaza_data_lock:
            plaza_info.is_login = False
            callback('exception', ws, plaza_info)

        output_plaza_text('plaza 异常退出(可能是异地登录)')
        return
    


def connect_plaza(login_info):
    ws = create_connection(f'ws://{login_info.port_conf.domain}:{login_info.port_conf.plaza}')
    if ws.connected:
        test_data = bytes([0x00, 0x86, 0x00, 0x02, 0x00, 0x00, 0x00, 0x0C, 0x00, 0x00, 0x00, 0x00])
        ws.send_binary(test_data)
        if ws.recv() == test_data:
            return ws
    return None


def start_plaza(login_info, callback):
    global plaza_lock
    global plaza_info

    output_plaza_text('plaza 开始监控')
    with plaza_data_lock:
        plaza_info = PlazaInfo()
        plaza_info.login_info = login_info
    try:
        ws = connect_plaza(login_info)
        if ws.connected:
            cmd_login(ws, login_info)
        while ws.connected:
            ws_data = ws.recv()
            if len(ws_data) >= 12:
                with plaza_lock:
                    try:
                        process_plaza(ws, ws_data, callback)
                    except:
                        """
                        import traceback
                        print(traceback.print_exc())
                        """
                        output_plaza_text('plaza 处理消息异常')
            else:
                output_plaza_text('plaza 数据异常')
    except:
        output_plaza_text('plaza 异常结束')
    
    output_plaza_text('plaza 关闭处理')