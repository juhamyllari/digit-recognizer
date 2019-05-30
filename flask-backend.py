import os
from flask import Flask, request, render_template, jsonify, abort, send_from_directory, url_for
from predict import Predictor
from pymongo import MongoClient
from configparser import ConfigParser

expected_width = 28
expected_height = 28

app = Flask(__name__, template_folder='build', static_folder='build/static')
app.logger_name = "flask.app"

if os.environ.get('ENVIRONMENT') == 'PRODUCTION':
  db_uri = os.environ.get('DB_URI')
else:
  print('Environment is not production, reading db uri from file')
  config = ConfigParser()
  config.read('db.conf')
  db_uri = config['DB']['db_uri']
client = MongoClient(db_uri)
db = client.digit_db
digits = db.digits

predictor = Predictor('augmented2-mnist-cnn.h5')

@app.route('/')
def frontend():
  return render_template('index.html')

@app.route('/api/model', methods=['POST'])
def putimage():
  data = request.get_json()
  image = data['image']
  width = data['width']
  height = data['height']
  if width != expected_width or \
    height != expected_height or \
    len(image) != width * height:
    abort(400)
  probabilities = predictor.predict(image)
  return jsonify(
    {
      'width': width,
      'height': height,
      'probabilities': probabilities
    })

@app.route('/api/db', methods=['POST'])
def saveimage():
  data = request.get_json()
  image = data['image']
  guess = data['guess']
  ground_truth = data['groundTruth']
  if len(image) != expected_height * expected_width:
    abort(400)
  digit_document = {"image": image,
                    "guess": guess,
                    "ground_truth": ground_truth}
  digit_id = digits.insert_one(digit_document).inserted_id
  return f"stored as {digit_id}"

@app.route('/favicon.ico')
def favicon():
  print("this is route favicon")
  return send_from_directory('static', 'favicon.ico')
