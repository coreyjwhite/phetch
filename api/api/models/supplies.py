# -*- coding: utf-8 -*-

from sqlalchemy import Column, DateTime, ForeignKey, Integer, String, sql
from sqlalchemy.orm import relationship
from sqlalchemy.dialects.mysql import TEXT, TINYINT
from sqlalchemy.schema import FetchedValue
from .local import LocalModel


class InventoryItem(LocalModel):
    __tablename__ = "inventory_item"

    id = Column(Integer, primary_key=True)
    description = Column(String(128), nullable=False)
    category_id = Column(Integer, ForeignKey("inventory_category.id"))
    manufacturer_id = Column(Integer, ForeignKey("manufacturer.id"))
    manufacturer_item_id = Column(String(64))
    meditech_id = Column(Integer, ForeignKey("meditech_item.id"))
    jit_inventory = Column(TINYINT, nullable=False, server_default="0")
    primary_vendor = Column(Integer, ForeignKey("vendor.id"))
    is_active = Column(TINYINT, nullable=False, server_default="1")
    last_updated = Column(
        DateTime,
        nullable=False,
        server_default=sql.text(
            "CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"
        ),
        server_onupdate=FetchedValue(),
    )
    last_updated_by = Column(Integer, nullable=False)


class InventoryCategory(LocalModel):
    __tablename__ = "inventory_category"

    id = Column(Integer, primary_key=True)
    description = Column(String(128), nullable=False)
    is_active = Column(TINYINT, nullable=False, server_default="1")
    last_updated = Column(
        DateTime,
        nullable=False,
        server_default=sql.text(
            "CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"
        ),
        server_onupdate=FetchedValue(),
    )
    last_updated_by = Column(Integer, nullable=False)


class Manufacturer(LocalModel):
    __tablename__ = "manufacturer"

    id = Column(Integer, primary_key=True)
    description = Column(String(128), nullable=False)
    is_active = Column(TINYINT, nullable=False, server_default="1")
    last_updated = Column(
        DateTime,
        nullable=False,
        server_default=sql.text(
            "CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"
        ),
        server_onupdate=FetchedValue(),
    )
    last_updated_by = Column(Integer, nullable=False)


class Vendor(LocalModel):
    __tablename__ = "vendor"

    id = Column(Integer, primary_key=True)
    description = Column(String(128), nullable=False)
    account_number = Column(String(128), nullable=False)
    phone = Column(String(128))
    website = Column(String(128))
    user_name = Column(String(128))
    password = Column(String(128))
    lead_time = Column(Integer)
    is_active = Column(TINYINT, nullable=False, server_default="1")
    last_updated = Column(
        DateTime,
        nullable=False,
        server_default=sql.text(
            "CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"
        ),
        server_onupdate=FetchedValue(),
    )
    last_updated_by = Column(Integer, nullable=False)


class VendorItem(LocalModel):
    __tablename__ = "vendor_item"

    item_id = Column(Integer, primary_key=True)
    vendor_id = Column(Integer, primary_key=True)
    vendor_item_id = Column(String(64))


class InventoryLocation(LocalModel):
    __tablename__ = "inventory_location"

    id = Column(Integer, primary_key=True)
    sequence = Column(Integer)
    description = Column(String(128), nullable=False)
    is_active = Column(TINYINT, nullable=False, server_default="1")
    last_updated = Column(
        DateTime,
        nullable=False,
        server_default=sql.text(
            "CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"
        ),
        server_onupdate=FetchedValue(),
    )
    last_updated_by = Column(Integer, nullable=False)


class InventoryZone(LocalModel):
    __tablename__ = "inventory_zone"

    id = Column(Integer, primary_key=True)
    location_id = Column(Integer, ForeignKey("inventory_location.id"))
    sequence = Column(Integer)
    description = Column(String(128), nullable=False)
    is_active = Column(TINYINT, nullable=False, server_default="1")
    last_updated = Column(
        DateTime,
        nullable=False,
        server_default=sql.text(
            "CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"
        ),
        server_onupdate=FetchedValue(),
    )
    last_updated_by = Column(Integer, nullable=False)


class InventoryShelf(LocalModel):
    __tablename__ = "inventory_shelf"

    id = Column(Integer, primary_key=True)
    zone_id = Column(Integer, ForeignKey("inventory_zone.id"))
    sequence = Column(Integer)
    is_active = Column(TINYINT, nullable=False, server_default="1")


class InventoryBin(LocalModel):
    __tablename__ = "inventory_bin"

    id = Column(Integer, primary_key=True)
    item_id = Column(Integer, ForeignKey("inventory_item.id"))
    shelf_id = Column(Integer, ForeignKey("inventory_shelf.id"))
    sequence = Column(Integer)
    par_lvl = Column(Integer)
    reorder_lvl = Column(Integer)
    critical_lvl = Column(Integer)
    count_interval = Column(Integer)
    is_active = Column(TINYINT, nullable=False, server_default="1")


class InventoryBinCount(LocalModel):
    __tablename__ = "inventory_bin_count"

    id = Column(Integer, primary_key=True)

    bin_id = Column(Integer, ForeignKey("inventory_bin.id"))
    on_hand = Column(Integer)
    last_updated = Column(
        DateTime,
        nullable=False,
        server_default=sql.text(
            "CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"
        ),
        server_onupdate=FetchedValue(),
    )
    last_updated_by = Column(Integer, nullable=False)
