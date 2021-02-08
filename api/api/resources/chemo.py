from ..models.chemo import ChemoItem, ChemoOrder, ChemoPriority, ChemoStatus
from ..models.omnicell import OmniItem
from flask import abort, request
from .. import db
from flask_restful import Resource
from ..utils.serialize import serialize


class ItemResource(Resource):
    def get(self):
        q = ChemoItem.query(ChemoItem.item_id)
        return serialize(q)

    def post(self):
        req = request.get_json(force=True)
        new_row = ChemoItem(item_id=req["item_id"])
        new_row.add()

    def delete(self):
        req = request.get_json(force=True)
        item_id = req["item_id"]
        row = (
            ChemoItem.query(ChemoItem)
            .filter(ChemoItem.item_id == item_id)
            .first()
        )
        row.delete()
        db.session.commit()


class AppointmentResource(Resource):
    def get(self):
        q = (
            ChemoOrder.query(
                ChemoOrder.id,
                ChemoOrder.item_id,
                ChemoOrder.start_ts,
                ChemoOrder.stop_ts,
                ChemoOrder.priority_id,
                ChemoOrder.status_id,
                ChemoOrder.comment,
                ChemoOrder.last_updated,
                ChemoPriority.description.label("priority_description"),
                ChemoStatus.description.label("status_description"),
            )
            .filter(ChemoOrder.is_active)
            .join(ChemoPriority, ChemoPriority.id == ChemoOrder.priority_id)
            .join(ChemoStatus, ChemoStatus.id == ChemoOrder.status_id)
        )
        return serialize(q)
