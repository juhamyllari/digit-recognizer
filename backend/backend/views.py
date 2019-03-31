""" Cornice services.
"""
from cornice import Service

images = Service(name='images', path='/images/{image}', description="images")

@images.post()
def handle_image(request):
  image = request.json_body['image']
  width = request.json_body['width']
  height = request.json_body['height']
  print(request.json_body)
  return {
    'backend_says': 'hello_frontend',
    'width': width,
    'height': height
    }