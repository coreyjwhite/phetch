import requests
from flask_restful import Resource
from ..utils.serialize import serialize
from config import Config

url = Config.TABLE_QUERY_URL


def ss_get(query_string):
    payload = {}
    response = requests.request(
        "GET", f"{url}{query_string}", headers=headers, data=payload
    )
    return response


headers = {
    "Connection": "keep-alive",
    "Pragma": "no-cache",
    "Cache-Control": "no-cache",
    "Accept": "application/json, text/plain, */*",
    "DNT": "1",
    "X-XSRF-TOKEN": "eyJpdiI6IksxNHFcL3UrMnpPbVAwREJwblR6dFl3PT0iLCJ2YWx1ZSI6IjJpdjdRQlZPTjEwWDVZOElHU2R4cDVpYzYwYVFCdXNxVFZ1KzZIbzBiZEF5MkFrVFMxNEhKTXRkZEE2MUpJd3kiLCJtYWMiOiJkNjY3ZTk4Y2JkNmRkYzM5NTNmMGY1MjIxMDAyYjYyYzRmMjU0ODRkZDljZmVmNGQ3M2FkNTA5ZjM3ZjMyMWU2In0=",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Safari/537.36",
    "Sec-Fetch-Site": "same-origin",
    "Sec-Fetch-Mode": "cors",
    "Sec-Fetch-Dest": "empty",
    "Referer": "https://stat-stock.com/g/111/kits",
    "Accept-Language": "en-US,en;q=0.9",
    "Cookie": "_ga=GA1.2.363707671.1582060084; SERVERID=server-6; laravel_session=IWv8oehf2hKGBExJrmoi7heNAmqwKXQ2fscKYad1; laravel_token=eyJpdiI6IjFSN3ZUeW9IWnVmWGZleEtpNDVWM1E9PSIsInZhbHVlIjoiRXEycXdUZVRMZnNaNW9kNGdsVjB1RzdBUWxscStQSzhFMkRBaG13NTlJaEdTQlR0R1dZZk5Oa2FqRjAycHVnUlhMTEp6NXRtRDBKcU1HWWVrV2xRN25xd3F1c1VHU1lHSVF3NVVTNU5PekpyeEFiZ1wvekVrdXkzdm9BazVLd05cLzZUZFp3RUtMUm5ZeEN5VEpYclRxbStnZ1wvNGdFZ0VrOUN3eUhGeDJSbnNwSzhJZEkxOFFnU2IzTTdtUjlkT0NBb1ZyTE9MOHg4S0J0QlgwVUcySGxvOVpuakloK3Qwb0oxRWUzeThGZ1BRNkVaNHp4TXBzTis5VWtobkdRajNkZ2R4VCtMTHhqVVV1OHhUVWtMR1wvS29uRXI5QklVQVJBUStFT1drRzhwWnZcL1R6UmdLaWF2MHg2WjZ0ZjdTYWpyRyIsIm1hYyI6ImFmYzE0MzdhMmJkNzliNDQwMmQ1ZDA5MTgxYmZiNjAyMTM5MTA3ZTg1MjhjMmVkYTk4Y2ZjOTdiZmQxMTAwZDcifQ%3D%3D; XSRF-TOKEN=eyJpdiI6IksxNHFcL3UrMnpPbVAwREJwblR6dFl3PT0iLCJ2YWx1ZSI6IjJpdjdRQlZPTjEwWDVZOElHU2R4cDVpYzYwYVFCdXNxVFZ1KzZIbzBiZEF5MkFrVFMxNEhKTXRkZEE2MUpJd3kiLCJtYWMiOiJkNjY3ZTk4Y2JkNmRkYzM5NTNmMGY1MjIxMDAyYjYyYzRmMjU0ODRkZDljZmVmNGQ3M2FkNTA5ZjM3ZjMyMWU2In0%3D",
}
