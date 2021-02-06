# -*- coding: utf-8 -*-
"""SQLAlchemy mapper classes for the Omnicell database.

Because the Omnicell database is read-only, the base Omnicell mapper class
inherits directly from BaseModel. It overwrites BaseModel's __immutable__
directive to True.

Tables in the OmniCenterCPC01 database do not have explicitly-declared primary
keys. SQLAlchemy requires that mapper classes have at least one column with the
primary_key attribute so they are declared locally. They have no effect outside
of SQLAlchemy.

Tables whose name starts with 'x' are cross reference tables.

Todo:
    * Determine consistent class attribute type docstring notation.
    * Add Omni ip addresses.
    * Map omnibins.
    * Map xfer_subtype table.
    * Map order frequencies table and docstring reference to local table.
    * Define item categories in a local table.
    * Describe the difference between transaction dati and timestamp fields.
    * Better annotate where values are duplicated in a column (like item_id),
        especially when the column is flagged primary_key.
    * Determine best use of ForeignKeys and relationship attributes.
    * Workaround for 0 qty on medication orders with no issues.

"""

from datetime import datetime
from .base import BaseModel
from sqlalchemy import (
    Boolean,
    BigInteger,
    Column,
    DateTime,
    Float,
    func,
    Integer,
    String,
)
from sqlalchemy.sql.expression import case, cast
from sqlalchemy.ext.hybrid import hybrid_property


def cast_omnitime(omnitime):
    """Function to construct a string-to-datetime case clause.

    Many dates in the OmniCenterCPC01 database are stored as strings in the
    format YYYYMMDDHHMMSSSS. Neither SQL Server nor SQLAlchemy have built-in
    methods to convert these to datetime objects, so this method constructs
    a SQL clause to cast the string first as a BigInteger and then as a native
    SQL Server DateTime.

    Args:
        omnitime (str): The string representation of a datetime to be cast
            as a SQL Server datetime object.

    Returns:
        case: A SQLAlchemy SQL expression clause object.

    """

    return case(
        [
            (
                omnitime.notlike(""),
                cast(
                    func.format(
                        cast(omnitime, BigInteger), '####-##-## ##:##:##"."##'
                    ),
                    DateTime,
                ),
            )
        ]
    )


class OmnicellModel(BaseModel):
    """Omnicell database ORM base class.

    Attributes:
        __abstract__ (bool): sqlalchemy directive to ignore an ORM class when
            creating tables. The value is not inherited.
        __bind_key__ (str): Key to SQLAlchemy connection string in config.
        __immutable__ (bool): Flags a table as read-only.

    """

    __abstract__ = True
    __bind_key__ = "OmniCenterCPC01"
    __immutable__ = True


class OmniAlias(OmnicellModel):
    """Item aliases table.

    Attributes:
        __tablename__ (str): Database table name.
        omni_stid (Column): Omnicell site and machine identifier.
        item_id (Column): Non-unique item identifier.
        item_name (Column): Item alias.
        is_primary (Column): Boolean value to identify primary alias.

    """

    __tablename__ = "itemalas"

    omni_stid = Column(String)
    item_id = Column(String, primary_key=True)
    item_name = Column(String)
    is_primary = Column(Boolean)


class OmniArea(OmnicellModel):
    """Areas table.

    Attributes:
        __tablename__ (str): Database table name.
        area_key (Column): Primary key.
        area (Column): Area mnemonic.
        area_desc (Column): Area description.

    """

    __tablename__ = "areas"

    area_key = Column(Integer, primary_key=True)
    area = Column(String)
    area_desc = Column(String)


class OmniItem(OmnicellModel):
    """Items table.

    No primary key is defined on the table, but omni_stid and item_id are
    effectively a composite primary key, as an item can only be assigned to a
    machine once.

    For a list of distinct items, filter by omni_stid 'ETMASTER'. This
    represents the 'Master Formulary' pseudo-machine.

    Attributes:
        __tablename__ (str): Database table name.
        omni_stid (Column): Omnicell site and machine identifier.
        item_id (Column): Non-unique item identifier.
        omni_bin (Column): The bin to which the item is assigned. For items
            assigned to a machine but not to a bin, the value is -1. For items
            assigned to multiple bins, the value is -2, in which case the
            actual bin can be found in the omnibins table.
        qty_onhand (Column): Current on-hand value.
        qty_parlvl (Column): Par level.
        qty_min (Column): Reorder level.
        qty_alarm (Column): Critical level.
        lu_dati (Column): String representation of the last transaction
            date/time.
        ctrl_lvl (Column): Controlled-substance schedule as a string ('2'-'6'),
            'S' for supply items, or '0'.
        category (Column): Free-text field used to flag items as non-pharmacy.
        rx_disp (Column): Concatenated string of item name, dose, and form.
        is_mix (Column):

    """

    __tablename__ = "items"

    omni_stid = Column(String, primary_key=True)
    item_id = Column(String, primary_key=True)
    omni_bin = Column(Integer)
    qty_onhand = Column(Float)
    qty_parlvl = Column(Float)
    qty_min = Column(Float)
    qty_alarm = Column(Float)
    lu_dati = Column(String)
    ctrl_lvl = Column(String)
    category = Column(String)
    rx_disp = Column(String)
    is_mix = Column(Boolean)
    min_source = Column(String)
    alm_source = Column(String)


class OmniItemBin(OmnicellModel):
    __tablename__ = "itembins"

    omni_stid = Column(String, primary_key=True)
    item_id = Column(String, primary_key=True)
    bexp_dati = Column(String)
    loc_description = Column(String)

    @hybrid_property
    def expiration(self):
        return cast_omnitime(self.bexp_dati)


class OmniItemScan(OmnicellModel):
    """Item barcodes table.

    Attributes:
        __tablename__ (str): Database table name.
        is_key (Column): Item scan key (not 'is key').
        item_id (Column): Non-unique item identifier.
        barcode (Column): Barcode string.

    """

    __tablename__ = "itemscan"

    is_key = Column(Integer, primary_key=True)
    item_id = Column(String)
    barcode = Column(String)


class OmniMedOrder(OmnicellModel):
    """Medication orders table.

    Attributes:
        __tablename__ (str): Database table name.
        mo_id (Column): Medication order (RX) numnber.
        mo_stat (Column): Order status. 'A' for active, 'D' for discontinued.
        pat_id (Column): Patient identifier (E#).
        item_id (Column): Item mnemonic.
        start_dati (Column): String representation of the start date/time.
        stop_dati (Column): String representation of the stop date/time. Null
            if no stop date provided.
        frequency (Column): Order frequency.
        prn (Column): 'Y' for PRN, 'N' for scheduled or one-time.
        qty (Column): Ordered quantity.

    """

    __tablename__ = "medorder"

    mo_id = Column(Integer, primary_key=True)
    mo_stat = Column(String)
    pat_id = Column(String)
    item_id = Column(String)
    start_dati = Column(String)
    stop_dati = Column(String)
    frequency = Column(String)
    prn = Column(String)
    qty = Column(Float)

    @hybrid_property
    def start_ts(self):
        return cast_omnitime(self.start_dati)

    @hybrid_property
    def stop_ts(self):
        return cast_omnitime(self.stop_dati)

    @hybrid_property
    def is_active(self):
        return (
            (self.mo_stat == "A")
            & (self.start_ts <= datetime.now())
            & ((self.stop_ts >= datetime.now()) | (self.stop_dati == ""))
        )


class Omni(OmnicellModel):
    """Omnicell machines table.

    Attributes:
        __tablename__ (str): Database table name.
        omni_stid (Column): Site and machine identifier.
        omni_name (Column): Machine description.
        area (Column): Area mnemonic.
        omni_stat (Column): Machine status. 'U' for up, 'D' for down.
        comm_ip (Column): IP address.

    """

    __tablename__ = "omnis"

    omni_stid = Column(String, primary_key=True)
    omni_id = Column(String)
    omni_name = Column(String)
    area = Column(String)
    omni_stat = Column(String)
    comm_ip = Column(String)


class OmniPatient(OmnicellModel):
    __tablename__ = "patients"

    pat_id = Column(String, primary_key=True)
    pat_name = Column(String)
    area = Column(String)
    room = Column(String)
    pat_stat = Column(String)
    pat_misc1 = Column(String)
    pat_type = Column(String)


class OmniVendorItem(OmnicellModel):
    __tablename__ = "vendoritems"

    vend_id = Column(String)
    vendor_item_id = Column(String)
    item_id = Column(String, primary_key=True)


class OmniXact(OmnicellModel):
    """Transactions table.

    Attributes:
        __tablename__ (str): Database table name.
        xact_key (Column): Unique transaction identifier.
        xact_dati (Column): String representation of the transaction date/time.
        time_stamp (Column):
        qty (Column): Quantity removed. Negative values are items returned or
            stocked.
        mooverride (Column):
        item_key (Column):
        med_key (Column):
        pat_key (Column):
        user_key (Column):
        xfersub (Column): Transaction subtype.

    """

    __tablename__ = "xact"

    xact_key = Column(Integer, primary_key=True)
    xact_dati = Column(String)
    time_stamp = Column(DateTime)
    qty = Column(Float)
    qty_onhand = Column(Float)
    mooverride = Column(String)
    item_key = Column(Integer)
    med_key = Column(Integer)
    omni_key = Column(Integer)
    pat_key = Column(Integer)
    user_key = Column(Integer)
    xfersub = Column(String)


class OmniXitem(OmnicellModel):
    """Items cross reference table.

    For the purposes of this table, items with the same mnemonic but in
    different Omnicell machines are considered distinct from each other.

    Attributes:
        __tablename__ (str): Database table name.
        item_key (Column): Unique item identifier.
        item_id (Column): Non-unique item mnemonic.
        is_mix (Column):
        category (Column):
        rx_name (Column): Like items.rx_disp, but a truncated length.
        item_alias (Column):
        omni_stid (Column):
        omni_bin (Column):

    """

    __tablename__ = "xitem"

    item_key = Column(Integer, primary_key=True)
    item_id = Column(String)
    is_mix = Column(Boolean)
    category = Column(String)
    rx_name = Column(String)
    item_alias = Column(String)
    omni_stid = Column(String)
    omni_bin = Column(Integer)


class OmniXmed(OmnicellModel):
    """Medication orders cross reference table.

    For most purposes, the mo_id is a unique identifier. However, the integer
    med_key is used in the xact table and can be cross referenced to the string
    mo_id here.

    Attributes:
        __tablename__ (str): Database table name.
        med_key (Column):
        mo_id (Column):
        pat_id (Column):

    """

    __tablename__ = "xmed"

    med_key = Column(Integer, primary_key=True)
    mo_id = Column(String)
    pat_id = Column(String)


class OmniXomni(OmnicellModel):
    """Omnicell machines cross reference table.

    For most purposes, the omni_stid is a unique identifier. However, the
    integer omni_key is used in the xact table and can be cross referenced to
    the string omni_stid string here.

    Attributes:
        __tablename__ (str): Database table name.
        omni_key (Column):
        omni_stid (Column): Omnicell machine mnemonic.

    """

    __tablename__ = "xomni"

    omni_key = Column(Integer, primary_key=True)
    omni_stid = Column(String)
