# -*- coding: utf-8 -*-
"""Factory module to instantiate and configure the Flask app."""

from flask import Flask
from flask_cors import CORS
from flask_restful import Api
from flask_sqlalchemy import SQLAlchemy

# SQLAlchemy object is available globally for ORM models
db = SQLAlchemy()


def create_app():
    """Instantiate the Flask app.

    Return
        Flask: the Flask application object.

    """
    app = Flask(__name__)
    app.config.from_object("config.Config")

    # Initialize plugins
    db.init_app(app)
    api = Api(app)
    CORS(app)

    # Add REST endpoints
    with app.app_context():
        from .resources import add_resources

        add_resources(api)

    return app
