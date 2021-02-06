from ..models.inventory import InventoryItem
from flask import abort, request
from .. import db
from flask_restful import Resource
from ..utils.serialize import serialize


class ItemResource(Resource):
    def get(self):
        q = (
            InventoryItem.query(
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
