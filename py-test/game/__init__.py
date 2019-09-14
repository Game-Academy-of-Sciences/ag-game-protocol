import requests
import re
import json
import time
import struct

from urllib.parse import urlsplit, urljoin
from dataclasses import dataclass, field
from websocket import create_connection
from itertools import repeat
from xml.etree import ElementTree
from threading import Thread
from pyquery import PyQuery

