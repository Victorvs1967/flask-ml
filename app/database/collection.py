from flask import current_app
from pymongo import MongoClient


client = MongoClient(current_app.config['DATABASE_URL'])
db = client.image_prediction
image_details = db.imageData

def addNewImage(i_name, prediction, conf, time, url):
    image_details.insert({
        'file_name': i_name,
        'prediction': prediction,
        'confidence': conf,
        'upload_time': time,
        'url': url
    })

def getAllImages():
    data = image_details.find()
    return data
