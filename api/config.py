# -*- coding: utf-8 -*-
"""Application configuration options singleton.

The Config object contains application and dependency configuration variables.
Secrets are managed by the keyring library and not visible in source code.

"""

import keyring


class Config:
    # Flask options
    DEBUG = True

    # AzureAD options
    CLIENT_ID = "cc59cdac-b66d-4bc2-ba96-bf7ed965f6a5"
    CLIENT_SECRET = ""
    AUTHORITY = (
        "https://login.microsoftonline.com/eaa4a71e-a2cd-46ab-b4da-1b9537285d07"
    )
    REDIRECT_PATH = "/getAToken"
    ENDPOINT = "https://graph.microsoft.com/v1.0/users"
    SCOPE = ["User.ReadBasic.All"]
    SESSION_TYPE = "filesystem"

    # SQLAlchemy options
    ADC_USER = "omniphetch"
    ADC_PW = keyring.get_password("omnicell", "omniphetch")
    ADC_SERVER = "ETCH-OMNICEN02"
    ADC_DRIVER = "?driver=ODBC+Driver+17+for+SQL+Server"
    MYSQL_USER = "myphetch"
    MYSQL_PW = keyring.get_password("mysql", "myphetch")
    MYSQL_SERVER = "localhost"
    SQLALCHEMY_TRACK_MODIFICATIONS = False  # Disable deprecated feature
    SQLALCHEMY_ECHO = True
    SQLALCHEMY_DATABASE_URI = (
        f"mysql://{MYSQL_USER}:{MYSQL_PW}@localhost/phetch"
    )
    SQLALCHEMY_BINDS = {
        "OmniCenterCPC01": f"mssql+pyodbc://{ADC_USER}:{ADC_PW}@{ADC_SERVER}/OmniCenterCPC01{ADC_DRIVER}"
    }

    # StatStock options
    TABLE_QUERY_URL = "https://stat-stock.com/g/111/vuetable/"
