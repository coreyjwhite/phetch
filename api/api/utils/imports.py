# -*- coding: utf-8 -*-
"""Data ETL functions using pandas.

The Python pandas library provides functions to extract data from disparate
sources and formats, transform both the data itself and its structure, and
load the results into other sources and formats.

Below are functions for importing predefined data and transforming it to match
the structure of the target database table.

"""

import pandas as pd
import sqlalchemy as sqla
from config import Config


def import_dose_txs(file):
    """Import a Meditech "Dose Transactions" report to the dose_txs table.

    Args:
        file (str): Relative path to the csv file.

    """
    engine = sqla.create_engine(Config.SQLALCHEMY_DATABASE_URI)
    df = pd.read_csv(
        file,
        sep="|",
        parse_dates=["date"],
        header=0,
        names=[
            "date",
            "rx_number",
            "product",
            "mnemonic",
            "doses",
            "transaction_type",
            "control_level",
            "hazardous",
            "charge_type",
            "order_type",
            "inventory",
        ],
    )
    df.to_sql(
        "meditech_transaction", con=engine, index=False, if_exists="append"
    )


def import_mar_admins(file):
    """Import a Meditech "Mar Administrations" report to the mar_admins table.

    Args:
        file (str): Relative path to the csv file.

    """
    engine = sqla.create_engine(Config.SQLALCHEMY_DATABASE_URI)
    df = pd.read_csv(
        file,
        sep="|",
        parse_dates={"admin_time": ["date", "time"]},
        header=0,
        names=[
            "mnemonic",
            "product",
            "dose",
            "units",
            "date",
            "time",
            "patient_id",
            "rx_number",
            "order_type",
            "location",
            "prescriber",
        ],
    )
    df.to_sql(
        "meditech_administration", con=engine, index=False, if_exists="append"
    )


def import_medorder_frequencies(file):
    """Import a Meditech "Mar Administrations" report to the mar_admins table.

    Args:
        file (str): Relative path to the csv file.

    """
    engine = sqla.create_engine(Config.SQLALCHEMY_DATABASE_URI)
    df = pd.read_excel(file, header=0)
    df.to_sql(
        "medorder_frequencices", con=engine, index=False, if_exists="append"
    )
