from ..models.organization import Department, Location, Person
from flask import abort, request
from .. import db
from flask_restful import Resource
from ..utils.serialize import serialize


class DepartmentResource(Resource):
    def get(self):
        q = (
            Department.query(
                Department.id,
                Department.description,
                Department.adc_id,
                Department.emr_id,
                Department.is_inpatient,
                Department.is_offsite,
                Department.contact_id,
                Person.email.label("contact_email"),
            )
            .filter(Department.is_active)
            .join(Person, Person.id == Department.contact_id, isouter=True)
        )
        return serialize(q)

    def post(self):
        req = request.get_json(force=True)
        new_row = Department(
            description=req["description"],
            adc_id=req["adc_id"],
            emr_id=req["emr_id"],
            is_inpatient=req["is_inpatient"],
            is_offsite=req["is_offsite"],
            contact_id=req["contact_id"],
            last_updated_by=5,
        )
        new_row.add()

    def delete(self):
        req = request.get_json(force=True)
        id = req["id"]
        row = Department.query(Department).filter(Department.id == id).first()
        row.is_active = 0
        db.session.commit()

    def put(self):
        req = request.get_json(force=True)
        id = req["id"]
        row = Department.query(Department).filter(Department.id == id).first()
        row.description = (req["description"],)
        row.adc_id = (req["adc_id"],)
        row.emr_id = (req["emr_id"],)
        row.is_inpatient = (req["is_inpatient"],)
        row.is_offsite = (req["is_offsite"],)
        row.contact_id = (req["contact_id"],)
        db.session.commit()


class LocationResource(Resource):
    def get(self):
        q = (
            Location.query(
                Location.id,
                Location.description,
                Location.adc_id,
                Location.emr_id,
                Location.is_inpatient,
                Location.is_offsite,
                Location.contact_id,
                Location.department_id,
                Department.description.label("department_description"),
                Person.email.label("contact_email"),
            )
            .filter(Location.is_active)
            .join(
                Department,
                Department.id == Location.department_id,
                isouter=True,
            )
            .join(Person, Person.id == Location.contact_id, isouter=True)
        )
        return serialize(q)

    def post(self):
        req = request.get_json(force=True)
        new_loc = Location(
            description=req["description"],
            adc_id=req["adc_id"],
            emr_id=req["emr_id"],
            is_inpatient=req["is_inpatient"],
            is_offsite=req["is_offsite"],
            department_id=req["department_id"],
            contact_id=req["contact_id"],
            last_updated_by=5,
        )
        new_loc.add()

    def delete(self):
        req = request.get_json(force=True)
        id = req["id"]
        row = Location.query(Location).filter(Location.id == id).first()
        row.is_active = 0
        db.session.commit()

    def put(self):
        req = request.get_json(force=True)
        id = req["id"]
        row = Location.query(Location).filter(Location.id == id).first()
        row.description = (req["description"],)
        row.adc_id = (req["adc_id"],)
        row.emr_id = (req["emr_id"],)
        row.is_inpatient = (req["is_inpatient"],)
        row.is_offsite = (req["is_offsite"],)
        row.department_id = (req["department_id"],)
        row.contact_id = (req["contact_id"],)
        db.session.commit()
