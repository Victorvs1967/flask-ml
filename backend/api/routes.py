from bson.json_util import dumps
from flask import redirect, url_for
from flask_cors import cross_origin

from backend.database import collection as db
from backend.api import bp


@bp.route('/')
@cross_origin()
def api():
    return dumps(db.getAllImages())
