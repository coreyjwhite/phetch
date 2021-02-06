# -*- coding: utf-
"""SQLAlchemy mapper classes for the application database.

Intended for user data, logs, metadata. Inherits directly from LocalModel
because it probably won't need fields like 'description', 'last_updated', etc.

Todo:
    * Basically everything.
    * Foreign keys.
    * CRUD methods not inherited from LocalModel.

"""

from .local import LocalModel
from sqlalchemy import Column, Integer


class ApplicationModel(LocalModel):
    """Application database ORM base class.

    Attributes:
        __abstract__ (bool): sqlalchemy directive to ignore a class when
            creating tables. The value is not inherited.
        __bind_key__ (str): Key to SQLAlchemy connection string in config.
        id (Column): Integer primary key. MariaDB applies the 'auto-increment'
            property by default.

    """

    __abstract__ = True
    __bind_key__ = "application"

    id = Column(Integer, primary_key=True)


class User(LocalModel):
    """Users table.

    Attributes:
        __tablename__ (str): Database table name.

    """

    __tablename__ = "user"
    id = Column(Integer, primary_key=True)
