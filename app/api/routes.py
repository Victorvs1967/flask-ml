from bson.json_util import dumps

from app.database import collection as db
from app.api import bp


@bp.route('/')
def api():
    return dumps(db.getAllImages())
