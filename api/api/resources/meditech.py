from ..models.meditech import MeditechAdministration, MeditechTransaction
from flask import abort, request
from .. import db
from sqlalchemy.sql import func
from flask_restful import Resource
from ..utils.serialize import serialize


class Transaction(Resource):
    def get(self):
        q = MeditechTransaction.query(
            func.sum(MeditechTransaction.doses).label("total_doses"),
            MeditechTransaction.date,
        ).group_by(MeditechTransaction.date)
        return serialize(q)
