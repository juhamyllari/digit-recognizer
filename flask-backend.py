from flask import Flask, request, render_template, jsonify, abort
from predict import Predictor

expected_width = 28
expected_height = 28

app = Flask(__name__, template_folder='build', static_folder='build/static')
app.logger_name = "flask.app"
# predictor = Predictor('simple-mnist-cnn.h5')
predictor = Predictor('augmented-mnist-cnn.h5')

@app.route('/')
def frontend():
  return render_template('index.html')

@app.route('/api', methods=['POST'])
def putimage():
  data = request.get_json()
  image = data['image']
  width = data['width']
  height = data['height']
  if width != expected_width or \
    height != expected_height or \
    len(image) != width * height:
    abort(400)
  print('this is route /api')
  probabilities = predictor.predict(image)
  return jsonify(
    {
      'width': width,
      'height': height,
      'probabilities': probabilities
    })

