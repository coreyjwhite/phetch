# -*- coding: utf-8 -*-

from sqlalchemy import Column, DateTime, ForeignKey, Integer, String, sql
from sqlalchemy.orm import relationship
from sqlalchemy.dialects.mysql import TEXT, TINYINT
from sqlalchemy.schema import FetchedValue
from .local import LocalModel


class ChemoItem(LocalModel):
    __tablename__ = "chemo_item"

    item_id = Column(String(16), primary_key=True)


class ChemoAppointment(LocalModel):
    __tablename__ = "chemo_order"

    id = Column(Integer, primary_key=True)
    start_ts = Column(DateTime)
    stop_ts = Column(DateTime)
    priority_id = Column(Integer, ForeignKey("chemo_priority.id"))
    status_id = Column(Integer, ForeignKey("chemo_status.id"))
    comment = Column(TEXT)
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


class ChemoPriority(LocalModel):
    __tablename__ = "chemo_status"

    id = Column(Integer, primary_key=True)
    description = Column(String(128), nullable=False)


class ChemoStatus(LocalModel):
    __tablename__ = "chemo_priority"

    id = Column(Integer, primary_key=True)
    description = Column(String(128), nullable=False)
