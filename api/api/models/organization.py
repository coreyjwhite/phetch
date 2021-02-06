# -*- coding: utf-8 -*-
"""SQLAlchemy mapper classes for the organization database.

Todo:
    * Basically everything.
    * Integrity of adc_id and emr_id fields across servers.

"""

from .local import LocalModel
from sqlalchemy import DateTime, Column, ForeignKey, Integer, String
from sqlalchemy.dialects.mysql import TINYINT
from sqlalchemy.orm import relationship
from sqlalchemy import sql
from sqlalchemy.schema import FetchedValue


class Department(LocalModel):
    __tablename__ = "department"

    id = Column(Integer, primary_key=True)
    description = Column(String(128), nullable=False, unique=True)
    adc_id = Column(String(16))
    emr_id = Column(String(16))
    is_inpatient = Column(TINYINT, nullable=False, server_default="1")
    is_offsite = Column(TINYINT, nullable=False, server_default="0")
    contact_id = Column(Integer, ForeignKey("person.id"))
    contact = relationship("Person")
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


class Location(LocalModel):
    __tablename__ = "location"

    id = Column(Integer, primary_key=True)
    description = Column(String(128), nullable=False, unique=True)
    adc_id = Column(String(16))
    emr_id = Column(String(16))
    has_crashcart = Column(TINYINT, nullable=False, server_default="1")
    is_inpatient = Column(TINYINT, nullable=False, server_default="1")
    is_offsite = Column(TINYINT, nullable=False, server_default="0")
    contact_id = Column(Integer, ForeignKey("person.id"))
    contact = relationship("Person")
    department_id = Column(Integer, ForeignKey("department.id"))
    department = relationship("Department")
    is_inspected = Column(TINYINT, nullable=False, server_default="1")
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


class Person(LocalModel):
    __tablename__ = "person"

    id = Column(Integer, primary_key=True)
    email = Column(String(64))
