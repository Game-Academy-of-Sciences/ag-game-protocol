# login_info = get_login_info()
login_info = LoginInfo(pid='H17', username='p214b6aef0a663', pid_username='H17p214b6aef0a663', pwd='73cd41ac86639a1b25c2cde853598e4c', game_base_uri='http://gci.ig50.com:81', ipdomains=['s20.vpcdn.com', 'eq225.vpcdn.com', 'eq226.vpcdn.com', 'n20.vpcdn.com', 'm02.vpcdn.com'], ips=['125.88.186.209', '116.251.225.31', '116.251.226.31', '124.236.16.245', '117.184.33.26'], token=b'\xeb\xc3\xb7\xca\xad$\x04\xdf#\xa1\x8b6~\x9cZ\xdb')
login_info.token = get_protocol_token(login_info)




"""
# 进入房间
def into_room(login_info):
    ws.send_binary(pack_plaza_login_data_for_token(login_info))

    pass

Thread(target=into_room, args=(login_info,)).start()
"""