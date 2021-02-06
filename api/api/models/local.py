# -*- coding: utf-8 -*-
"""Parent class for all mapper classes used in the api application.

All ORM classes, whether mapped to local or remote databases, inherit from
BaseModel, which in turn inherits from the flask_sqlalchemy declarative_base.

"""

from .. import db
from .base import BaseModel


class LocalModel(BaseModel):
    """Custom ORM base class.

    Attributes:
        __abstract__ (bool): sqlalchemy directive to ignore an ORM class when
            creating tables. The value is not inherited.
        __immutable__ (bool): Flags a table as read-only.

    """

    __abstract__ = True
    __immutable__ = False

    @classmethod
    def query(cls, *args):
        """Construct a scoped-session query.

        This method provides modules which import an ORM class a Query object
        without having to construct a Session object.

        Args:
            *args: Variable length argument list of cls fields.

        Returns:
            query: SQLAlchemy Query object. This can be executed by calling
                one of its methods such as .all().

        """
        return db.session.query(*args)

    def add(self):
        """Insert an model instance into its mapper table.

        This method provides modules which import an ORM class a method for
        adding and committing an instance to its table without having to
        construct a Session object.

        """
        db.session.add(self)
        db.session.commit()

    def inactivate(self):
        """Inactivate a model instance.

        """
        self.is_active = 0
