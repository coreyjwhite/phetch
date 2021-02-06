from flask_restful import Resource
import requests
from ..external.statstock import ss_get
from ..utils.serialize import serialize


class KitsResource(Resource):
    def get(self):
        query_string = "kits?sort=template_name%7Casc&page=3&per_page=25"
        response = ss_get(query_string)
        return serialize(response)


class PendingResource(Resource):
    def get(self):
        query_string = "pending-tags?per_page=1"
        response = ss_get(query_string)
        return response.json()["total"]


class TagsResource(Resource):
    def get(self):
        query_string = "tags?per_page=99999"
        response = ss_get(query_string)
        return serialize(response)


class TagResource(Resource):
    def get(self, tag):
        query_string = f"tags?q={tag}"
        response = ss_get(query_string)
        return response.json()
