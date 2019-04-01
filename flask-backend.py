from flask import Flask, render_template
app = Flask(__name__, static_folder='frontend/build/static', template_folder='frontend/build')

@app.route('/')
def frontend():
  return render_template('index.html')