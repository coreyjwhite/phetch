# -*- coding: utf-8 -*-

from .local import LocalModel
from sqlalchemy import Column, DateTime, Float, Integer, String


class MeditechAdministration(LocalModel):
    """Meditech MAR administrations table.

    Attributes:
        __tablename__ (str): Database table name.
        id (Column): Integer primary key. MariaDB applies the 'auto-increment'
            property by default.
        admin_time (Column): Datetime of administration.
        mnemonic (Column): Item mnemonic.
        rx (Column): Item description string.
        dose (Column): Documented dose administered.
        account (Column): Patient identifier (E#).
        rx_num (Column): Medication order (RX) numnber.
        order_type (Column):
        location (Column):
        prescriber (Column):

    """

    __tablename__ = "meditech_administration"

    id = Column(Integer, primary_key=True)
    rx_number = Column(String(64))
    patient_id = Column(String(64))
    mnemonic = Column(String(64))
    admin_time = Column(DateTime)
    product = Column(String(64))
    dose = Column(Float)
    units = Column(String(64))
    order_type = Column(String(64))
    location = Column(String(64))
    prescriber = Column(String(64))


class MeditechTransaction(LocalModel):
    """Meditech transactions table.

    Attributes:
        __tablename__ (str): Database table name.
        id (Column): Integer primary key. MariaDB applies the 'auto-increment'
            property by default.
        date (Column): Date of transaction.
        rx_num (Column): Medication order (RX) numnber.
        rx (Column): Item description string.
        mnemonic (Column): Item mnemonic.
        doses (Column): Transaction quantity.
        tx_type (Column):
        ctrl_lvl (Column):
        hazardous (Column):
        charge_type (Column):
        order_type (Column):
        inventory (Column):

    """

    __tablename__ = "meditech_transaction"

    id = Column(Integer, primary_key=True)
    date = Column(DateTime)
    mnemonic = Column(String(64))
    product = Column(String(64))
    rx_number = Column(String(64))
    doses = Column(Float)
    transaction_type = Column(String(64))
    control_level = Column(Float)
    hazardous = Column(String(64))
    charge_type = Column(String(64))
    order_type = Column(String(64))
    inventory = Column(String(64))
