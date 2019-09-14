import random

from game.login import login_from_url
from game.plaza import start_plaza, cmd_get_vaild_bet
from game.table import start_table
from game.utils import LoginInfo, EnvPortConf
from threading import Thread


import requests
import base64
data = { 
    'userEncryptKey': -608992409, 
    'userDecryptKey': -30736800, 'broadcastDecryptKey': 1197480507, 'buffer': 'AASaEAAAADkAAAG50Lw9GlbP6x8xcJc9GwkLOeY80OUkjn8jbEOnAw+wVrgChTuuaBGh4gh7U6sh'}
resp = requests.post('http://localhost:8888/AGSecurity/Decrypt', data=data)
decryptResult = resp.json()
print(list(base64.b64decode(decryptResult['data'])))
print(decryptResult)



'''
overallRes = 34
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

login_info = login_from_url()

if not login_info:
    print('登录失败')


def plaza_process(event, ws, plaza_info, *args):
    if event == 'login':
        (status, ) = args
        if status:
            print('登录成功')

            plaza_info.vid = 'C001'
            start_table(plaza_info)

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
