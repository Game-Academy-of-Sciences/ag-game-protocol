
import requests
import re
import struct
import time
import random
import ctypes

from urllib.parse import urlsplit, urljoin
from pyquery import PyQuery
from dataclasses import dataclass, field
from websocket import create_connection
from threading import Thread, Lock
from xml.etree import ElementTree


GAME_VERSION = 178

CLIENT_LOGIN_TRIAL = 201392129
CLIENT_LOGIN = 69633


CLIENT_LOGIN_PLAZA = 262150
CLIENT_LOGIN_PLAZA_TRIAL = 201588742



CLIENT_LOGIN_GAME_EXT_TRIAL = 73986
# CLIENT_LOGIN_GAME_PC_TRIAL = 65794


CLIENT_LOGIN_GAME_EXT = 73730
# CLIENT_LOGIN_GAME_PC = 65538

"""
GET_TRANSTYPE = 262288
GET_PLATFORMTYPE = 262278
GET_PLAYTYPE = 262280


GET_ALL_CHIP_SET = 262213
"""
GET_PLAYER_BALANCE = 131107

# 有效投注
GET_USER_POINT = 262232

ROAD_SELECT_VIDEOS = 69730

AUTO_ENTER_TABLE = 65542
GET_GAME_CURRENT_STATUS = 65558

GAME_TABLE_EXIT = 65541


# 下注
GAME_BET = 65539
GAME_BET_EXT = 106499



@dataclass
class EnvPortConf:
    domain: str = field(default="")
    login: int = field(default=5035)
    plaza: int = field(default=5000)
    road: int = field(default=5075)
    game: dict = field(default_factory=dict)
    '''
    {
        platform
        port
    }
    '''


@dataclass()
class LoginInfo:
    is_login: bool = field(default=False)
    pid:str = field(default='')
    username:str = field(default='')
    pid_username: str = field(default='')
    pwd:str = field(default='')
    game_base_uri:str = field(default='')
    ipdomains:[str] = field(default_factory=list)
    ips:[str] = field(default_factory=list)
    token:bytes = field(default=bytes())
    money: float = field(default=0.0)
    is_guest: bool = field(default=True)
    version: str = field(default='0')
    port_conf: EnvPortConf = field(default=EnvPortConf())


@dataclass()
class PlazaInfo:
    login_info: LoginInfo = field(default=None)
    is_login: bool = field(default=False)
    vaild_bet: float = field(default=0.0)
    all_vaild_bet: float = field(default=0.0)
    room_time: dict = field(default_factory=dict)
    video_token: dict = field(default_factory=dict)
    room_result: dict = field(default_factory=dict)

    def __init__(self):
        self.room_time = dict()
        self.video_token = dict()
        self.room_result = dict()


class TimerLoop(Thread):
    """Call a function after a specified number of seconds:

            t = TimerLoop(30.0, f, args=None, kwargs=None)
            t.start()
            t.cancel()     # stop the timer's action if it's still waiting

    """

    def __init__(self, interval, function, args=None, kwargs=None):
        Thread.__init__(self)
        self.interval = interval
        self.function = function
        self.args = args if args is not None else []
        self.kwargs = kwargs if kwargs is not None else {}
        self.finished = Event()

    def cancel(self):
        """Stop the timer if it hasn't finished yet."""
        self.finished.set()

    def run(self):
        while 1:
            self.finished.wait(self.interval)
            if not self.finished.is_set():
                self.function(*self.args, **self.kwargs)
            else:
                break


def parser_conf(conf_str):
    conf = EnvPortConf()

    root = ElementTree.XML(conf_str).find('environment')
    conf.domain = root.attrib['domain']

    for x in root.findall('host'):
        if x.attrib['hostType'] == 'login':
            conf.login = int(x.attrib['port'])
        elif x.attrib['hostType'] == 'plaza':
            conf.plaza = int(x.attrib['port'])
        elif x.attrib['hostType'] == 'road':
            conf.road = int(x.attrib['port'])
        elif x.attrib['hostType'] == 'game':
            if 'vids' in x.attrib and x.attrib['gameType'] == 'BAC':
                for vid in x.attrib['vids'].split(' '):
                    conf.game[vid] = {
                        'platform': x.attrib['platform'],
                        'port': int(x.attrib['port']),
                    }
    return conf


def trim(s):
    if s.find(b'\x00') > -1:
        s = s[:s.find(b'\x00')]
    return s


def output_text(*args):
    print(*args)


def output_plaza_text(*args):
    return
    print(*args)


def output_table_text(*args):
    
    print(*args)


def hear_threading(ws):
    try:
        while ws.connected:
            time.sleep(5)
            ws.send_binary(struct.pack('>iii', 1, 12, 0))
            test_data = bytes([0x00, 0x86, 0x00, 0x02, 0x00, 0x00, 0x00, 0x0C, 0x00, 0x00, 0x00, 0x00])
            ws.send_binary(test_data)
    except:
        pass


def start_hear(ws):
    Thread(target=hear_threading, args=(ws,)).start()


def xor_encrypt(data, key):
    # xor_encrypt([1,2,3,4,5,6,7,8], 0xffffffff)

    enc_key = ctypes.c_uint(key).value
    """
    enc_key = int(enc_key).to_bytes(4,'little')
    enc_key = int.from_bytes(enc_key, 'big')
    """
    
    enc_data = []
    for x in range(0, len(data), 4):
        n = data[x: x + 4]
        n = int.from_bytes(n, 'big')
        n = ctypes.c_uint(n ^ enc_key).value
        enc_data.extend(int(n).to_bytes(4, 'big'))

    enc_data = bytes(enc_data)
    # 301826
    return struct.pack(f'>iii{len(enc_data)}s', 301840, 48, 2, enc_data)


def xor_decrypt(data):
    dec_key = int.from_bytes(bytes([90, 191, 82, 114]), 'big')
    
    dec_data = []
    
    for x in range(0, len(data), 4):
        n = data[x: x + 4]
        n = int.from_bytes(n, 'big')
        n = ctypes.c_uint(n ^ dec_key).value
        dec_data.extend(int(n).to_bytes(4, 'big'))

    dec_data = bytes(dec_data)
    return dec_data


# xor_decrypt(bytes([90, 189, 114, 112, 90, 191, 82, 101, 90, 191, 82, 114, 90, 191, 82, 114, 8, 240, 19, 54, 95, 191, 82]))




"""
print(calc_bets_money(20, 0, 2, 3))

import sys
sys.exit()
"""


"""
a = xor_encrypt(bytes([0, 1, 160, 3, 0, 0, 0, 36, 0, 0, 39, 16, 71, 67, 48, 48, 49, 49, 57, 52, 49, 54, 49, 65, 69, 0, 0, 2, 0, 0, 0, 50, 0, 0, 0, 1]), 2302300525)
print(list(a))
import sys
sys.exit()

[0, 4, 155, 2, 0, 0, 0, 48, 0, 0, 0, 2, 137, 59, 241, 110, 137, 58, 81, 73, 137, 58, 118, 125, 206, 121, 97, 93, 184, 11, 104, 89, 184, 12, 96, 44, 204, 58, 81, 111, 137, 58, 81, 95, 137, 58, 81, 108]
[0, 4, 155, 16, 0, 0, 0, 48, 0, 0, 0, 2, 137, 59, 241, 110, 137, 58, 81, 73, 137, 58, 118, 125, 206, 121, 97, 93, 184, 11, 104, 89, 184, 12, 96, 44, 204, 58, 81, 111, 137, 58, 81, 95, 137, 58, 81, 108]
"""

# roomTimerStore  gmcode

"""
    u7v["getCMDGameBetCancel"] = function(T1Y, U1Y, m1Y) {
		console.log("----getCMDGameBetCancel----")
        var F1Y;
        void 0 === m1Y && (m1Y = 0);
        F1Y = Core["startCMD"](u7v["GAME_BET_CANCEL"], m1Y);
        return F1Y["writeBytes"](Core["stringToBytes"](T1Y, Core["_ba_"])),
        F1Y["writeBytes"](Core["stringToBytes"](U1Y, 14)),
        Core["endCMD"](F1Y);
    }
"""


