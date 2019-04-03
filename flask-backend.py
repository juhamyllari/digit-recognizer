from flask import Flask, request, render_template, jsonify
from predict import Predictor

app = Flask(__name__, static_folder='frontend/build/static', template_folder='frontend/build')
app.logger_name = "flask.app"
predictor = Predictor('simple-mnist-cnn.h5')

@app.route('/')
def frontend():
  return render_template('index.html')

@app.route('/api', methods=['POST'])
def putimage():
  data = request.get_json()
  image = data['image']
  width = data['width']
  height = data['height']
  print('this is route /api')
  return jsonify(
    {
      'width': width,
      'height': height,
      'prediction': predictor.predict(image)
    })

