import numpy as np
from keras.models import load_model

class Predictor:
  def __init__(self, model_filename):
    self.model = load_model(model_filename)
    self.model._make_predict_function()

  def predict(self, img):
    arr = np.array(img).reshape(1, 28, 28, 1).astype('float32') / 255
    prediction = self.model.predict(arr, batch_size=1)
    return int(np.argmax(prediction))