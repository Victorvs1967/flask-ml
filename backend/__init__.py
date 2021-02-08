from flask import Flask
from flask_cors import CORS
from flask_bootstrap import Bootstrap

from config import Config


bootstrap = Bootstrap()

def creat_app(config_class=Config):
    
    app = Flask(__name__)
    app.config.from_object(config_class)
    app.app_context().push()
    CORS(app)

    bootstrap.init_app(app)

    from backend.main import bp as main_bp
    app.register_blueprint(main_bp)

    from backend.api import bp as api_bp
    app.register_blueprint(api_bp, url_prefix='/api')

    return app
