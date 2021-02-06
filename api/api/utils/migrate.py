# -*- coding: utf-8 -*-
"""Database schema change management functions.

The sqlalchemy and flask_sqlalchemy libraries provide basic database and table
creation methods useful for establishing and changing schema based on the
declarative ORM classes. Functions for more granular changes as well as formal
version control will likely be necessary.

Todo:
    * Table- and database-specific create functions.
    * Exclude immutable tables and databases.
    * Python alembic integration for schema version control.

"""

from .. import create_app, db
from sqlalchemy.sql import text


def create_db():
    """Create all tables mapped by flask_sqlalchemy BaseModel subclasses."""
    app = create_app()
    with app.app_context():
        db.create_all()


# crossreference trigger statement
statement = text(
    "CREATE TRIGGER inspection_criterion_location_crossreference"
    "AFTER INSERT ON location FOR EACH ROW"
    "BEGIN"
    "DECLARE c, n INT;"
    "DECLARE i INT DEFAULT 0;"
    "DECLARE cur1 CURSOR FOR"
    "SELECT id FROM inspection_criterion"
    "WHERE is_active = '1';"
    "SELECT COUNT(*) INTO n FROM inspection_criterion"
    "WHERE is_active = '1';"
    "OPEN cur1;"
    "WHILE i<n DO"
    "FETCH cur1 INTO c;"
    "INSERT INTO inspection_location_criterion("
    "location_id, criterion_id)"
    "VALUES (NEW.id, c);"
    "SET i = i + 1;"
    "END WHILE;"
    "CLOSE cur1;"
    "END"
)
