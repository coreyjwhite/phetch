from datetime import date, datetime, timedelta
from .. import db
from flask_restful import Resource
import pandas as pd
from sqlalchemy import and_, BigInteger, DateTime, distinct, func
from sqlalchemy.sql.expression import case, cast, literal_column
from ..models.inventory import MedOrderFrequencies
from ..models.omnicell import (
    Omni,
    OmniAlias,
    OmniItem,
    OmniItemBin,
    OmniMedOrder,
    OmniPatient,
    OmniVendorItem,
    OmniXact,
    OmniXitem,
)
from ..utils.serialize import serialize

usage_xfer_types = ["G-DR", "G-VP", "I-UN", "R-UN", "U-VR", "D-DS"]
""":obj:`list` of :obj:`str`: List of OmniXact.xfer_sub values.

In calculating overall product usage, certain sub-types of transactions need to
be evaluated. This list is a short-term solution to defining them.
"""


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


def alias_subquery():
    """SQLAlchemy subquery object for Omnicell item aliases.

    When joined to a query with item_id in the select clause, this will add a
    field for the primary alias. Since not all items have an alias, the join
    clause should include the 'isouter=True' flag to avoid missing data.

    Returns:
        subquery: A joinable SQLAlchemy subquery clause.

    """
    subquery = (
        OmniAlias.query(OmniAlias.item_name, OmniAlias.item_id)
        .filter(OmniAlias.is_primary)
        .group_by(OmniAlias.item_id, OmniAlias.item_name)
        .subquery()
        .alias(name="aliases")
    )
    return subquery


def expiration_subquery(items=None, omnis=None):
    if isinstance(items, str):
        items = [items]
    if isinstance(omnis, str):
        omnis = [omnis]
    items_filter = [True]
    omnis_filter = [True]
    if items is not None:
        items_filter = [OmniItemBin.item_id.in_(items)]
    if omnis is not None:
        omnis_filter = [OmniItemBin.omni_stid.in_(omnis)]
    subquery = (
        OmniItemBin.query(
            OmniItemBin.omni_stid, OmniItemBin.item_id, OmniItemBin.expiration
        )
        .filter(*items_filter)
        .filter(*omnis_filter)
        .subquery()
        .alias(name="expirations")
    )
    return subquery


def frequencies_subquery():
    """SQLAlchemy subquery object for order frequencies and multipliers.

    Returns:
        subquery: A joinable SQLAlchemy subquery clause.

    """
    subquery = MedOrderFrequencies.query(
        MedOrderFrequencies.frequency, MedOrderFrequencies.daily_multiplier
    )
    return subquery


def medorder_subquery(items=None):
    """SQLAlchemy subquery object for active medication orders.

    Returns:
        subquery: A joinable SQLAlchemy subquery clause.

    """
    if isinstance(items, str):
        items = [items]
    items_filter = [True]
    if items is not None:
        items_filter = [OmniMedOrder.item_id.in_(items)]
    subquery = (
        OmniMedOrder.query(
            OmniMedOrder.item_id,
            OmniMedOrder.frequency,
            OmniMedOrder.qty,
            OmniMedOrder.prn,
        )
        .filter(*items_filter)
        .filter(OmniMedOrder.prn == "N")
        .filter(OmniMedOrder.is_active)
    )
    return subquery


def onhand_subquery(items=None, omnis=None):
    """SQLAlchemy subquery object for Omnicell inventory values.

    The alias subquery is joined by default.

    Args:
        items (:obj:`list` of :obj:`str`, or 'str', optional):
            The first parameter.
        omnis (:obj:`list` of :obj:`str`, or 'str', optional):
            The second parameter.

    Returns:
        subquery: A joinable SQLAlchemy subquery clause.

    """
    if isinstance(items, str):
        items = [items]
    if isinstance(omnis, str):
        omnis = [omnis]
    items_filter = [True]
    omnis_filter = [True]
    if items is not None:
        items_filter = [OmniItem.item_id.in_(items)]
    if omnis is not None:
        omnis_filter = [OmniItem.omni_stid.in_(omnis)]
    aliases = alias_subquery()
    subquery = (
        OmniItem.query(
            OmniItem.omni_stid,
            OmniItem.item_id,
            OmniItem.rx_disp,
            OmniItem.ctrl_lvl,
            OmniItem.qty_onhand,
            OmniItem.qty_parlvl,
            OmniItem.qty_min,
            OmniItem.qty_alarm,
            OmniItem.min_source,
            OmniItem.alm_source,
            aliases.c.item_name,
        )
        .filter(*items_filter)
        .filter(*omnis_filter)
        .filter(OmniItem.omni_bin != -1)
        .filter(OmniItem.is_mix == 0)
        .filter(OmniItem.category == "")
        .join(aliases, aliases.c.item_id == OmniItem.item_id, isouter=True)
        .subquery()
        .alias(name="onhands")
    )
    return subquery


def usage_subquery(days):
    subquery = (
        OmniXact.query(
            OmniXitem.item_id.label("xitem_id"),
            (func.sum(OmniXact.qty) / days).label("xactqty"),
        )
        .filter(OmniXact.xfersub.in_(usage_xfer_types))
        .filter(OmniXact.qty > -10)
        .filter(OmniXact.time_stamp >= (date.today() - timedelta(days=days)))
        .filter(OmniXact.time_stamp < (date.today()))
        .join(OmniXitem, OmniXitem.item_key == OmniXact.item_key, isouter=True)
        .group_by(OmniXitem.item_id)
        .subquery()
        .alias(name="usage")
    )
    return subquery


class RepackagingResource(Resource):
    items = [
        "RIML500ED",
        "CHOL10SYR",
        "DIAZ1MLSYR",
        "EPINE2PACK",
        "EPIN30D5DC",
        "GABAUDCUP",
        "HYDRLUDC",
        "KETOFOL",
        "MANNFILTER",
        "METH1MLS",
        "METH5MLS",
        "MIDA3.75ML",
        "MIDA5ML",
        "MIDA7.5ML",
        "MORP.1L",
        "POLYVSS",
        "PHEN20SO",
        "SIMES",
    ]
    omnis = ["ETCPM", "ETCSM"]

    def get(self):
        frequencies = frequencies_subquery()
        usage = usage_subquery(7)
        onhand = onhand_subquery(items=self.items, omnis=self.omnis)
        medorders = medorder_subquery(items=self.items)
        expiration = expiration_subquery(items=self.items, omnis=self.omnis)
        query = (
            db.session.query(
                onhand,
                expiration.c.expiration,
                usage.c.xactqty,
                (onhand.c.qty_onhand / onhand.c.qty_parlvl).label(
                    "onhandratio"
                ),
            )
            .join(usage, usage.c.xitem_id == onhand.c.item_id, isouter=True)
            .join(
                expiration,
                expiration.c.item_id == onhand.c.item_id,
                isouter=True,
            )
        )
        dfo = pd.DataFrame(data=medorders.all())
        dff = pd.DataFrame(data=frequencies.all())
        dfq = pd.DataFrame(data=query.all())
        # Join orders with frequency data
        df_merge = dfo.merge(
            dff, how="left", left_on="frequency", right_on="frequency"
        )
        # Calculate daily doses from order quantities and frequency multipliers
        daily_doses = df_merge.qty * df_merge.daily_multiplier
        df_merge["daily_doses"] = daily_doses.where(
            df_merge.prn == "N", other=0
        )
        df_merge = df_merge.groupby("item_id")["daily_doses"].sum()
        df_merge = dfq.merge(
            df_merge, how="left", left_on="item_id", right_on="item_id"
        )
        # Divide on hand quantity by the greater of orders or average usage
        df_merge["daysonhand"] = (
            df_merge["qty_onhand"] / df_merge["daily_doses"]
        ).where(
            df_merge["daily_doses"] > df_merge["xactqty"],
            df_merge["qty_onhand"] / df_merge["xactqty"],
        )
        # Sort case-insensitively by product name
        df_merge = df_merge.sort_values(
            by=["rx_disp"], key=lambda col: col.str.lower()
        )
        return serialize(df_merge)


class MainResource(Resource):
    def get(self, omni):
        frequencies = frequencies_subquery()
        usage = usage_subquery(7)
        onhand = onhand_subquery(omnis=omni)
        medorders = medorder_subquery()
        expiration = expiration_subquery(omnis=omni)
        xpr = case(
            [
                (
                    onhand.c.qty_parlvl > 0,
                    (onhand.c.qty_onhand / onhand.c.qty_parlvl),
                )
            ],
            else_=0,
        ).label("onhandratio")
        query = (
            db.session.query(
                onhand, expiration.c.expiration, usage.c.xactqty, xpr
            )
            .join(usage, usage.c.xitem_id == onhand.c.item_id, isouter=True)
            .join(
                expiration,
                expiration.c.item_id == onhand.c.item_id,
                isouter=True,
            )
        )
        dfo = pd.DataFrame(data=medorders.all())
        dff = pd.DataFrame(data=frequencies.all())
        dfq = pd.DataFrame(data=query.all())
        # Join orders with frequency data
        df_merge = dfo.merge(
            dff, how="left", left_on="frequency", right_on="frequency"
        )
        # Calculate daily doses from order quantities and frequency multipliers
        daily_doses = df_merge.qty * df_merge.daily_multiplier
        df_merge["daily_doses"] = daily_doses.where(
            df_merge.prn == "N", other=0
        )
        df_merge = df_merge.groupby("item_id")["daily_doses"].sum()
        df_merge = dfq.merge(
            df_merge, how="left", left_on="item_id", right_on="item_id"
        )
        # Divide on hand quantity by the greater of orders or average usage
        df_merge["daysonhand"] = (
            df_merge["qty_onhand"] / df_merge["daily_doses"]
        ).where(
            df_merge["daily_doses"] > df_merge["xactqty"],
            df_merge["qty_onhand"] / df_merge["xactqty"],
        )
        # Sort case-insensitively by product name
        df_merge = df_merge.sort_values(
            by=["rx_disp"], key=lambda col: col.str.lower()
        )
        return serialize(df_merge)


class OmniResource(Resource):
    def get(self, omni):
        usage = usage_subquery(7)
        onhand = onhand_subquery(omnis=omni)
        expiration = expiration_subquery(omnis=omni)
        xpr = case(
            [
                (
                    onhand.c.qty_parlvl > 0,
                    (onhand.c.qty_onhand / onhand.c.qty_parlvl),
                )
            ],
            else_=0,
        ).label("onhandratio")
        xpr2 = case(
            [(usage.c.xactqty > 0, (onhand.c.qty_onhand / usage.c.xactqty))],
            else_=0,
        ).label("daysonhand")
        query = (
            db.session.query(onhand, usage.c.xactqty, xpr, xpr2)
            .join(usage, usage.c.xitem_id == onhand.c.item_id, isouter=True)
            .order_by(onhand.c.rx_disp)
        )
        return serialize(query)


class OmnisResource(Resource):
    def get(self):
        query = db.session.query(
            Omni.omni_stid,
            Omni.omni_name,
            Omni.area,
            Omni.omni_stat,
            Omni.comm_ip,
        )
        return serialize(query)


class CensusResource(Resource):
    bedded_status = ["INP", "OPB", "ERM"]

    def get(self):
        query = (
            db.session.query(
                OmniPatient.pat_misc1.label("area"),
                func.count(OmniPatient.pat_id).label("census"),
            )
            .filter(OmniPatient.pat_stat == "A")
            .filter(OmniPatient.pat_type.in_(self.bedded_status))
            .filter(OmniPatient.room != "")
            .group_by(OmniPatient.pat_misc1)
        )
        return serialize(query)


class ExceptionsResource(Resource):
    def get(self):
        onhand = onhand_subquery(omnis="ETCPM")
        query = (
            db.session.query(
                onhand, OmniItemBin.loc_description, OmniVendorItem.vend_id
            )
            .join(OmniItemBin, OmniItemBin.item_id == onhand.c.item_id)
            .join(
                OmniVendorItem,
                OmniVendorItem.item_id == onhand.c.item_id,
                isouter=True,
            )
            .filter(onhand.c.min_source != "TECHNOLOGY")
            .filter(OmniItemBin.loc_description.contains("CAR1"))
            .filter(OmniVendorItem.item_id == None)
        )
        return serialize(query)


class PopulationsResource(Resource):
    cf = [
        "LUMA100T",
        "LUMA100PKT",
        "LUMA150PKT",
        "LUMA200T",
        "IVAC150TK",
        "IVAC25PKT",
        "IVAC50PKT",
        "IVAC75PKT",
        "DORNA",
    ]
    dka = ["INSU-1111"]
    nas = ["MORP.1L"]
    renal = [
        "PRIS22",
        "PRIS1",
        "PERI1.5LC5",
        "PER2.5LC5",
        "PERI1.55L",
        "PERI2.55L",
        "PERI4.252L",
        "PERI4.255L",
    ]
    tpn = [
        "TPN CHARGE",
        "FAMO2VT",
        "ALBU25T100",
        "ALBU25T120",
        "ALBU25T50",
        "ALBU5T250",
        "ALBU25T50",
        "ALBU25T500",
        "TPN 3IN1",
        "HRTPN",
    ]

    def get(self):
        query = OmniMedOrder.query(
            func.count(
                case(
                    [
                        (
                            (OmniMedOrder.item_id.in_(self.cf)),
                            OmniMedOrder.pat_id,
                        )
                    ],
                    else_=literal_column("NULL"),
                )
            ).label("cf"),
            func.count(
                case(
                    [
                        (
                            (OmniMedOrder.item_id.in_(self.dka)),
                            OmniMedOrder.pat_id,
                        )
                    ],
                    else_=literal_column("NULL"),
                )
            ).label("dka"),
            func.count(
                case(
                    [
                        (
                            (OmniMedOrder.item_id.in_(self.nas)),
                            OmniMedOrder.pat_id,
                        )
                    ],
                    else_=literal_column("NULL"),
                )
            ).label("nas"),
            func.count(
                case(
                    [
                        (
                            (OmniMedOrder.item_id.in_(self.renal)),
                            OmniMedOrder.pat_id,
                        )
                    ],
                    else_=literal_column("NULL"),
                )
            ).label("renal"),
            func.count(
                case(
                    [
                        (
                            (OmniMedOrder.item_id.in_(self.tpn)),
                            OmniMedOrder.pat_id,
                        )
                    ],
                    else_=literal_column("NULL"),
                )
            ).label("tpn"),
        ).filter(OmniMedOrder.is_active)
        return serialize(query)


class WatchlistResource(Resource):
    items = ["BAML700V", "REMD100"]
    omnis = ["ETCPM", "ETCSM"]

    def get(self):
        usage = usage_subquery(7)
        onhand = onhand_subquery(items=self.items, omnis=self.omnis)
        query = db.session.query(
            onhand, usage.c.xactqty, (onhand.c.qty_onhand).label("onhandratio")
        ).join(usage, usage.c.xitem_id == onhand.c.item_id, isouter=True)
        dfq = pd.DataFrame(data=query.all())

        return serialize(dfq)


class IVResource(Resource):
    def get(self):
        frequencies = frequencies_subquery()
        medorders = medorder_subquery()
        query = (
            db.session.query(OmniItem.item_id, OmniItem.rx_disp)
            .filter(OmniItem.omni_stid == "ETMASTER")
            .filter(OmniItem.is_mix)
        )
        dfo = pd.DataFrame(data=medorders.all())
        dff = pd.DataFrame(data=frequencies.all())
        dfq = pd.DataFrame(data=query.all())
        # Join orders with frequency data
        df_merge = dfo.merge(
            dff, how="left", left_on="frequency", right_on="frequency"
        )
        # Calculate daily doses from order quantities and frequency multipliers
        daily_doses = df_merge.qty * df_merge.daily_multiplier
        df_merge["daily_doses"] = daily_doses.where(
            df_merge.prn == "N", other=0
        )
        df_merge = df_merge.groupby("item_id")["daily_doses"].sum()
        df_merge = dfq.merge(
            df_merge, how="left", left_on="item_id", right_on="item_id"
        )
        # Sort case-insensitively by product name
        df_merge = df_merge.sort_values(
            by=["rx_disp"], key=lambda col: col.str.lower()
        )
        return serialize(df_merge)


class StatusResource(Resource):
    omnis = ["ETCPM", "ETCSM"]

    def get(self):
        onhand = onhand_subquery(omnis=self.omnis)
        query = (
            db.session.query(func.count(onhand.c.item_id).label("stockout"))
            .join(OmniVendorItem, onhand.c.item_id == OmniVendorItem.item_id)
            .filter(onhand.c.qty_onhand == 0)
            .filter(onhand.c.qty_parlvl > 0)
            .filter(OmniVendorItem.vend_id == "1")
        )
        return serialize(query)


class ExpirationResource(Resource):
    def get(self):
        expirations = expiration_subquery()
        query = db.session.query(expirations.c.expiration).one()
        return serialize(query)
