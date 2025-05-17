# from satellite_requests.stat_collector import get_request_green
from .satellite_requests import stat_collector
from PIL import Image
from io import BytesIO
import numpy as np
import matplotlib.pyplot as plt
import json

def greenness_density(latitude, longitude):
    response = stat_collector.get_request_green(latitude, longitude).content
    image = Image.open(BytesIO(response)).convert('RGB')
    image_np = np.array(image)
    red = image_np[:, :, 0].astype(float)
    green = image_np[:, :, 1].astype(float)
    blue = image_np[:, :, 2].astype(float)

    ndgi = (green - red) / (green + red + 1e-5)
    return float(np.mean(ndgi))

# result = greenness_density(41.9965, 21.4314)
# with open('greenness_density.json', 'w') as file:
#     json.dump(result, file)