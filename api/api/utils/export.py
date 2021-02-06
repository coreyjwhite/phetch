# -*- coding: utf-8 -*-
"""MySQL/MariaDB dump/backup function.

This module provides a python function wrapper for the mysqldump shell command
for programmatic export and backup. Python alembic integration could
render this module obsolete.

Todo:
    * Table- and database-specific parameters.
    * More export target options and functions.

"""

import subprocess
from ...config import Config


def dump(db="--all-databases", target="dump.sql"):
    """Export a SQL script describing data and schema.

    This is the core function used to call the mysqldump client from Python
    and pass CLI arguments.

    Args:
        db (str, optional): Relative path to the csv file. Defaults to
            '--all-databases' to export everything from the server.
        target (str, optional): Relative path of export target file. Defaults
            to 'dump.sql' to export to the pwd.

    """
    user = Config.MYSQL_USER
    pw = Config.MYSQL_PW
    subprocess.Popen(f"mysqldump {db} -u {user} -p{pw} > {target}", shell=True)
