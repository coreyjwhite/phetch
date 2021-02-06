from sqlalchemy import Column, DateTime, ForeignKey, Integer, String, sql
from sqlalchemy.orm import relationship
from sqlalchemy.dialects.mysql import TEXT, TINYINT
from sqlalchemy.schema import FetchedValue
from .local import LocalModel


class InspectionCategory(LocalModel):
    __tablename__ = "inspection_category"

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


class InspectionCriterion(LocalModel):
    __tablename__ = "inspection_criterion"

    id = Column(Integer, primary_key=True)
    short_name = Column(String(64), nullable=False)
    description = Column(String(1024), nullable=False)
    category_id = Column(Integer, ForeignKey("inspection_category.id"))
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


class InspectionLocationCriterion(LocalModel):
    __tablename__ = "inspection_location_criterion"

    location_id = Column(Integer, ForeignKey("location.id"), primary_key=True)
    criterion_id = Column(
        Integer, ForeignKey("inspection_criterion.id"), primary_key=True
    )
    is_applicable = Column(TINYINT, nullable=False, server_default="1")


class InspectionRecord(LocalModel):
    __tablename__ = "inspection_record"

    id = Column(Integer, primary_key=True)
    location_id = Column(Integer, ForeignKey("location.id"), nullable=False)
    date_created = Column(
        DateTime,
        nullable=False,
        server_default=sql.text("CURRENT_TIMESTAMP"),
        server_onupdate=FetchedValue(),
    )
    inspector_id = Column(Integer, ForeignKey("user.id"), nullable=False)
    inspector_submitted = Column(DateTime)
    contact_id = Column(Integer, ForeignKey("person.id"), nullable=False)
    contact_reviewed = Column(DateTime)
    pharmacist_id = Column(Integer, ForeignKey("user.id"))
    manager_reviewed = Column(DateTime)
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

    # Relationships
    location = relationship("Location")
    inspector = relationship("User", foreign_keys=[inspector_id])
    contact = relationship("Person")
    pharmacist = relationship("User", foreign_keys=[pharmacist_id])


class InspectionStatus(LocalModel):
    """Validation table"""

    __tablename__ = "inspection_status"
    id = Column(Integer, primary_key=True)
    description = Column(String(128), nullable=False)


class InspectionResult(LocalModel):
    __tablename__ = "inspection_result"

    record_id = Column(
        Integer, ForeignKey("inspection_record.id"), primary_key=True
    )
    criterion_id = Column(
        Integer, ForeignKey("inspection_criterion.id"), primary_key=True
    )
    status = Column(Integer, ForeignKey("inspection_status.id"))
    result_comment = Column(TEXT)
    last_updated = Column(
        DateTime,
        nullable=False,
        server_default=sql.text(
            "CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"
        ),
        server_onupdate=FetchedValue(),
    )
    last_updated_by = Column(Integer, nullable=False)
