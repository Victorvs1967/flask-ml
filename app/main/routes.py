import os
import io
import ssl
from datetime import datetime
import numpy as np
import tensorflow as tf
from PIL import Image
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image as img
from keras.preprocessing.image import img_to_array
from keras.applications.resnet50 import ResNet50, decode_predictions, preprocess_input
from flask import render_template, request, jsonify, current_app

from app.main import bp
from app.database import collection as db


ssl._create_default_https_context = ssl._create_unverified_context

model = ResNet50(weights='imagenet')
# model._make_predict_function()

@bp.route('/')
def home():
    return render_template('index.html')

@bp.route('/predict', methods=['POST'])
def predict():
    if request.method == 'POST':
        if 'file' not in request.files:
            return 'something went wrong 1'
        user_file = request.files['file']
        if user_file.filename == '':
            return 'filename not found...'
        else:
            path = os.path.join(f'{os.getcwd()}/app/static/{user_file.filename}')
            user_file.save(path)
            classes = idetifyImage(path)
            db.addNewImage(
                user_file.filename,
                classes[0][0][1],
                str(classes[0][0][2]),
                datetime.now(),
                current_app.config['UPLOAD_URL'] + user_file.filename)
            return jsonify({
                'status': 'success',
                'prediction': classes[0][0][1],
                'confidence': str(classes[0][0][2]),
                'upload_time': datetime.now()
            })

def idetifyImage(img_path):
    image = img.load_img(img_path, target_size=(224, 224))
    x = img_to_array(image)
    x = np.expand_dims(x, axis=0)
    x = preprocess_input(x)
    preds = model.predict(x)
    preds = decode_predictions(preds, top=1)
    print(preds)
    return preds
