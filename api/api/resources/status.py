from datetime import date, datetime, timedelta
from .. import db
from flask_restful import Resource
import pandas as pd
from sqlalchemy import BigInteger, DateTime, distinct, func
from sqlalchemy.sql.expression import case, cast, literal_column
from ..models.inventory import MedOrderFrequencies
from ..models.omnicell import (
    Omni,
    OmniAlias,
    OmniItem,
    OmniItemBin,
    OmniMedOrder,
    OmniPatient,
    OmniXact,
    OmniXitem,
)
from ..utils.serialize import serialize


class StatusBoardResource(Resource):
    def get(self):
        return serialize()
