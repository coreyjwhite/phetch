from flask import make_response
import pandas as pd


def serialize(data, orient="records"):
    df = pd.DataFrame(data=data)
    result = df.to_json(orient=orient, date_format="iso")
    return make_response(result)
