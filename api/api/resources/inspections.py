from ..models.application import User
from ..models.inspections import (
    InspectionCategory,
    InspectionCriterion,
    InspectionLocationCriterion,
    InspectionRecord,
    InspectionResult,
)
from ..models.organization import Department, Location, Person
from flask import abort, request
from .. import db
from flask_restful import Resource
from ..utils.serialize import serialize


class CriteriaResource(Resource):
    def get(self):
        q = (
            InspectionCriterion.query(
                InspectionCriterion.id,
                InspectionCriterion.short_name,
                InspectionCriterion.description,
                InspectionCriterion.last_updated,
                InspectionCriterion.category_id,
                InspectionCategory.description.label("category_description"),
            )
            .filter(InspectionCriterion.is_active)
            .join(
                InspectionCategory,
                InspectionCategory.id == InspectionCriterion.category_id,
                isouter=True,
            )
        )
        return serialize(q)

    def post(self):
        req = request.get_json(force=True)
        new_row = InspectionCriterion(
            short_name=req["short_name"],
            description=req["description"],
            category_id=req["category_id"],
            last_updated_by=5,
        )
        new_row.add()

    def delete(self):
        req = request.get_json(force=True)
        id = req["id"]
        row = (
            InspectionCriterion.query(InspectionCriterion)
            .filter(InspectionCriterion.id == id)
            .first()
        )
        row.is_active = 0
        db.session.commit()

    def put(self):
        req = request.get_json(force=True)
        id = req["id"]
        row = (
            InspectionCriterion.query(InspectionCriterion)
            .filter(InspectionCriterion.id == id)
            .first()
        )
        row.short_name = req["short_name"]
        row.description = req["description"]
        row.category_id = req["category_id"]
        db.session.commit()


class CategoriesResource(Resource):
    def get(self):
        q = InspectionCategory.query(
            InspectionCategory.id, InspectionCategory.description
        ).filter(InspectionCategory.is_active)
        return serialize(q)

    def post(self):
        req = request.get_json(force=True)
        description = req["description"]
        new_row = InspectionCategory(description=description, last_updated_by=5)
        new_row.add()

    def delete(self):
        req = request.get_json(force=True)
        id = req["id"]
        row = (
            InspectionCategory.query(InspectionCategory)
            .filter(InspectionCategory.id == id)
            .first()
        )
        row.is_active = 0
        db.session.commit()

    def put(self):
        req = request.get_json(force=True)
        id = req["id"]
        description = req["description"]
        row = (
            InspectionCategory.query(InspectionCategory)
            .filter(InspectionCategory.id == id)
            .first()
        )
        row.description = description
        db.session.commit()


class LocationCriteriaResource(Resource):
    def get(self, location):
        q = (
            InspectionLocationCriterion.query(
                InspectionLocationCriterion.criterion_id,
                InspectionLocationCriterion.is_applicable,
                InspectionCriterion.description.label("criterion_description"),
            )
            .filter(InspectionLocationCriterion.location_id == location)
            .join(
                InspectionCriterion,
                InspectionCriterion.id
                == InspectionLocationCriterion.criterion_id,
            )
        )
        return serialize(q)


class LocationsResource(Resource):
    def get(self):
        q = (
            Location.query(
                Location.id,
                Location.contact_id,
                Location.is_inspected,
                Location.description,
                Location.department_id,
                Location.is_inpatient,
                Location.is_offsite,
                Location.has_crashcart,
                Location.adc_id,
                Department.description.label("department_description"),
                Person.email.label("contact_email"),
            )
            .join(
                Department,
                Department.id == Location.department_id,
                isouter=True,
            )
            .join(Person, Person.id == Location.contact_id, isouter=True)
        )
        return serialize(q)


class NewRecordResource(Resource):
    def get(self, location):
        q = (
            InspectionLocationCriterion.query(
                InspectionLocationCriterion.location_id,
                InspectionLocationCriterion.criterion_id,
                InspectionCriterion.id,
                InspectionCriterion.description,
            )
            .filter(InspectionLocationCriterion.location_id == location)
            .join(
                InspectionCriterion,
                InspectionCriterion.id
                == InspectionLocationCriterion.criterion_id,
            )
        )
        return serialize(q)

    def post(self, location):
        req = request.get_json(force=True)
        record = req["record"]
        results = req["results"]
        new_rec = InspectionRecord(
            location_id=location,
            inspector_id=record["inspector_id"],
            contact_id=record["contact_id"],
            last_updated_by=record["last_updated_by"],
        )
        new_rec.add()
        record_id = new_rec.id
        for criterion in results:
            new_row = InspectionResult(
                record_id=record_id,
                criterion_id=criterion["criterion_id"],
                status=criterion["status"],
                result_comment=criterion["result_comment"],
                last_updated_by=criterion["last_updated_by"],
            )
            new_row.add()


class RecordResource(Resource):
    def get(self, record):
        q = (
            InspectionRecord.query(
                InspectionRecord.id,
                InspectionRecord.location_id,
                InspectionRecord.inspector_id,
                InspectionRecord.inspector_submitted,
                InspectionRecord.contact_id,
                InspectionRecord.contact_reviewed,
                InspectionRecord.pharmacist_id,
                InspectionRecord.manager_reviewed,
                InspectionRecord.record_comment,
                Location.description.label("location_description"),
                Location.department_id.label("location_department_id"),
                Department.description.label("department_description"),
            )
            .filter(InspectionRecord.id == record)
            .join(
                Location,
                Location.id == InspectionRecord.location_id,
                isouter=True,
            )
            .join(
                Department,
                Department.id == Location.department_id,
                isouter=True,
            )
        )
        return serialize(q)


class RecordsResource(Resource):
    def get(self):
        q = (
            InspectionRecord.query(
                InspectionRecord.id,
                InspectionRecord.location_id,
                InspectionRecord.inspector_id,
                InspectionRecord.inspector_submitted,
                InspectionRecord.contact_id,
                InspectionRecord.contact_reviewed,
                InspectionRecord.pharmacist_id,
                InspectionRecord.manager_reviewed,
                InspectionRecord.record_comment,
                InspectionRecord.last_updated,
                Location.description.label("location_description"),
                Location.department_id.label("location_department_id"),
                Department.description.label("department_description"),
            )
            .join(
                Location,
                Location.id == InspectionRecord.location_id,
                isouter=True,
            )
            .join(
                Department,
                Department.id == Location.department_id,
                isouter=True,
            )
        )
        return serialize(q)


class ResultsResource(Resource):
    def get(self, record):
        q = (
            InspectionResult.query(
                InspectionResult.record_id,
                InspectionResult.criterion_id,
                InspectionResult.status,
                InspectionResult.result_comment,
                InspectionCriterion.description.label(
                    "inspection_criterion_description"
                ),
                InspectionCriterion.category_id.label(
                    "inspection_criterion_category_id"
                ),
                InspectionCategory.description.label(
                    "inspection_category_description"
                ),
            )
            .filter(InspectionResult.record_id == record)
            .join(
                InspectionCriterion,
                InspectionCriterion.id == InspectionResult.criterion_id,
            )
            .join(
                InspectionCategory,
                InspectionCategory.id == InspectionCriterion.category_id,
            )
        )
        return serialize(q)
