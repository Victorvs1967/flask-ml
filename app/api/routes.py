from bson.json_util import dumps
from flask import redirect, url_for
from flask_cors import cross_origin

from app.database import collection as db
from app.api import bp


@bp.route('/')
@cross_origin()
def api():
    return dumps(db.getAllImages())

@bp.route('/index')
@cross_origin()
def index():
    return redirect(url_for('main.index'))