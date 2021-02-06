# -*- coding: utf-8 -*-
"""SQLAlchemy mapper classes for the inventory database.

Todo:
    * Basically everything.
    * Foreign keys.

"""

from .local import LocalModel
from sqlalchemy import Column, Float, Integer, String
from sqlalchemy.dialects.mysql import TINYINT


class MeditechModel(LocalModel):
    """Meditech database ORM base class.

    Attributes:
        __abstract__ (bool): sqlalchemy directive to ignore an ORM class when
            creating tables. The value is not inherited.
        __bind_key__ (str): Key to SQLAlchemy connection string in config.

    """

    __abstract__ = True


class MedOrderFrequencies(LocalModel):
    """Medication order frequencies table.

    Attributes:
        __tablename__ (str): Database table name.
        id (Column): Integer primary key. MariaDB applies the 'auto-increment'
            property by default.
        tx_type (Column):
        ctrl_lvl (Column):
        hazardous (Column):
        charge_type (Column):
        order_type (Column):
        inventory (Column):

    """

    __tablename__ = "medorder_frequencies"

    id = Column(Integer, primary_key=True)
    frequency = Column(String(64))
    freq_desc = Column(String(64))
    prn = Column(TINYINT)
    stat = Column(TINYINT)
    adm_times = Column(String(64))
    daily_multiplier = Column(Float)
