import random

from game.login import login_from_url
from game.plaza import start_plaza, cmd_get_vaild_bet
from game.table import start_table
from game.utils import LoginInfo, EnvPortConf
from threading import Thread

# 'http://gci.ig50.com:81/forwardGame.do?params=BfUOR2ITCv/M7XuVWKRFoLEAQktsSbZH5+AHtj4uaegLkIDW/+PfMk+b6F3F8CV6G8ecFMtuY5ULbqPe5cmjNWan8Y3zxL8IgJfzfwTfUBbX9Ax03a2AALnJA4SJ4+qu6nIObRoTKVkgStJt3N2QIRo45HUb7HkelO3x1cQmzb/57KQID0v5oatJlwkxuzbnZkQ6L5kVtXVu7JR/IEiaag==&key=4f79b4f35a0f5d8d2856ee8dd9292ae1'

# 'http://gci.ig50.com:81/forwardGame.do?params=BfUOR2ITCv/M7XuVWKRFoLEAQktsSbZH5+AHtj4uaegLkIDW/+PfMho2HlBDT1qd3n1n+6kIWy674k4g0Tj89man8Y3zxL8IZAxwe7/PJn7TRTmq8f4ae7nJA4SJ4+qu6nIObRoTKVmac3Af7DmBzpnXle1mmIuCToQ2QAhoL1wIoudjuB/Rw8KAXvrAQOkggsU9bpmYeFjwSV6YgQ0AhrMip50uKtYPw+KKKYG2gBQ=&key=3a86d3df309a3d769a0f9323a174caf7'
login_info = login_from_url('http://gci.ig50.com:81/forwardGame.do?params=BfUOR2ITCv/M7XuVWKRFoLEAQktsSbZH5+AHtj4uaegLkIDW/+PfMho2HlBDT1qd1QfSOgLWMGSFWkZ3gLk0pGan8Y3zxL8IZAxwe7/PJn7TRTmq8f4ae7nJA4SJ4+qu6nIObRoTKVmac3Af7DmBzpnXle1mmIuCToQ2QAhoL1wIoudjuB/Rw8KAXvrAQOkggsU9bpmYeFjwSV6YgQ0AhrMip50uKtYPw+KKKYG2gBQ=&key=ab702d6bcfc80262f01439bcad19e2d1')

if not login_info:
    print('登录失败')


def plaza_process(event, ws, plaza_info, *args):
    if event == 'login':
        (status, ) = args
        if status:
            print('登录成功')

            plaza_info.vid = random.choice(['C001', 'C002', 'C003', 'C005', 'C006'])
            Thread(target=start_table, args=(plaza_info, )).start()

            # start_table(plaza_info.login_info, 'C001')
        else:
            print('登录失败')
    
    elif event == 'video_key':
        platform, token, param = args

    elif event == 'game_result':
        vid, bval, pval = args

    elif event == 'reset_time':
        vid, timeout = args

    elif event == 'user_vaild_bet':
        vaild_bet, all_vaild_bet = args

    elif event == 'exception':
        print('异地登录')


start_plaza(login_info, plaza_process)




"""
login_info = LoginInfo(is_login=True, pid='H17', username='p27ced90aaa34f', pid_username='H17p27ced90aaa34f', pwd='310c081cc69fde75f96e34e015278071', game_base_uri='http://gci.ig50.com:81', ipdomains=['s08.vpcdn.com', 'eq227.vpcdn.com', 's10.vpcdn.com', 's12.vpcdn.com', 'eq232.vpcdn.com'], ips=['124.226.64.139', '116.251.227.31', '121.201.65.244', '111.12.13.18', '116.251.232.31'], token=b'-8\x00gL\xdfbJ\xe5Z<\x9b\x9fg<N', money=2000.0)


"""
