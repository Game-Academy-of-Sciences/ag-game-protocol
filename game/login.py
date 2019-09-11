

from .utils import *


def login_from_url(login_url=None):
    try:
        session = requests.session()

        if not login_url:
            is_guest = True
            login_url = 'http://gci.ig50.com:81/forwardGame.do?params=BfUOR2ITCv/M7XuVWKRFoLEAQktsSbZH5igCG/uCJBsLkIDW/+PfMnxsg6IgOhW4irEk9czUAgO6v9oqNHF8n2an8Y3zxL8Icwh/E64a0JtKrAA0qJyh+bnJA4SJ4+qu6nIObRoTKVkRrGkuLTsbNxJ0/Kdt3GBPWP59mZc0PVi9iHiZJj/3Q9x/o1NwdKS55/wewSbL6dLbwch9DERWIitazTI8ZI+fe1/iZloMyoDhr1fsVVCBHf95iNPIkzTLyRF8RJK8NiCZhN9q6f1KzQ==&key=210b2174778ee06b27f897dcf7cc4a22'
        else:
            is_guest = False
        
        text = session.get(login_url).text

        try:
            url = PyQuery(text)('meta[http-equiv="refresh"]').attr('content')
            url = re.search(r"url=(.*)", url).group(1)
            if not url.startswith('http'):
                info = urlsplit(login_url)
                url = f'{info.scheme}://{info.hostname}:{info.port}/agingame/' + url
            version = re.search(r'/agingame/(.*?)/', url).group(1)
            text = session.get(url).text
        except:
            return None


        conf_url = f'{info.scheme}://{info.hostname}:{info.port}/agingame/{version}/resource/config/host_config.xml?timestamp={int(time.time() * 1000)}&_count=0'
        port_conf = parser_conf(requests.get(conf_url).text)

        # 获取配置信息
        text = re.findall(r'var defaultConfig = (\{(\n|.)*?\})', text)
        text = text[0][0]

        pid = re.search(r"pid:\s*'(.+)'", text).group(1)
        username = re.search(r"username:\s*'(.+)'", text).group(1)
        do_forward = re.search(r"doForward:\s*'(.+)'", text).group(1)

        # is_guest = re.search(r"dm:\s*'(.+)'", text).group(1) == 'pls_pass_dm'

        info = urlsplit(login_url)
        game_base_uri = f'{info.scheme}://{info.hostname}:{info.port}'
        do_forward = urljoin(game_base_uri, do_forward)

        # 获取ip列表
        json_data = session.get(do_forward).json()
        pwd = json_data['msg'][6:38]
        ips = json_data['ips']
        ipdomains = json_data['ipdomains']

        # 保存信息
        info = LoginInfo(pid=pid, 
                        username=username, 
                        pwd=pwd, 
                        game_base_uri=game_base_uri, 
                        ips=ips, 
                        ipdomains=ipdomains,
                        is_guest=is_guest,
                        version=version,
                        port_conf=port_conf
                        )
        info.pid_username = info.pid.upper() + info.username
        info.token = get_user_token(info)
        return info
    except:
        return None


def get_user_token(login_info):
    token = b''
    try:
        ws = create_connection(f'ws://{login_info.port_conf.domain}:{login_info.port_conf.login}')
        if ws.connected:
            test_data = bytes([0x00, 0x86, 0x00, 0x02, 0x00, 0x00, 0x00, 0x0C, 0x00, 0x00, 0x00, 0x00])
            ws.send_binary(test_data)
            if ws.recv() == test_data:
                # 发送登录数据

                def get_cmd_login_for_pwd(login_info):
                    data = struct.pack('30s16s', login_info.pid_username.encode(), bytes.fromhex(login_info.pwd))
                    flags = CLIENT_LOGIN_TRIAL if login_info.is_guest else CLIENT_LOGIN
                    return struct.pack(f'>iii{ len(data) }si', flags, 12 + len(data) + 4, 0, data, 0)

                ws.send_binary(get_cmd_login_for_pwd(login_info))
                while ws.connected:
                    data = ws.recv()
                    (flags, ) = struct.unpack('>i', data[:4])
                    if flags == 131185:
                        login_info.is_login = True

                    elif flags == 131073:
                        if not login_info.is_login:
                            output_text('登录失败')
                            ws.close()
                            return token
                        flags, length, _ , _, token_bytes, _, svr_time, user_flags = struct.unpack('>iiii16siii', data[:44])
                        token = token_bytes
                        output_text('获取到token: {}'.format(token_bytes.hex()))
                    elif flags == 73729:
                        pass
                    elif flags == 131087:
                        flags, length, mobileAcountExist, gesturePwdExist, _, account, nickname, gender, gameConfig = struct.unpack('>iicc10sd16sci', data)
                        nickname = trim(nickname).decode()
                        login_info.money = account
                        ws.close()
                        output_text('登录成功！ 用户名: {} 金额：{}'.format(nickname, account))
                        return token
                    else:
                        # 登录登出，应该是远程服务器之类的, 没什么用处
                        # CLIENT_LOGIN
                        # output_text(flags)
                        pass
        ws.close()
    except:
        ws.close()
    
    return token

