from game.login import login_from_url
from game.plaza import start_plaza, cmd_get_vaild_bet
from game.table import start_table
from game.utils import LoginInfo, EnvPortConf
from threading import Thread


login_info = login_from_url('http://gci.ig50.com:81/forwardGame.do?params=BfUOR2ITCv/M7XuVWKRFoLEAQktsSbZH5+AHtj4uaegLkIDW/+PfMuKiqQq/NFMdh98RE0KgJA5UvVrGmEvKUman8Y3zxL8IgJfzfwTfUBbX9Ax03a2AALnJA4SJ4+qu6nIObRoTKVkgStJt3N2QIRo45HUb7HkelO3x1cQmzb/57KQID0v5oatJlwkxuzbnZkQ6L5kVtXVu7JR/IEiaag==&key=e1a70b1372c4f9a44661f7b790564cff')

if not login_info:
    print('登录失败')


def plaza_process(event, ws, plaza_info, *args):
    if event == 'login':
        (status, ) = args
        if status:
            print('登录成功')

            Thread(target=start_table, args=(plaza_info.login_info, 'C001')).start()

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
