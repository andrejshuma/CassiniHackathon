from .satellite_requests import stat_collector
from io import BytesIO
import matplotlib.pyplot as plt
import tifffile as tiff
import numpy as np

def city_density(latitude, longitude):
    response = stat_collector.get_request_city_density(latitude, longitude).content
    img_array = tiff.imread(BytesIO(response))
    if img_array.ndim == 2:
        intensity = img_array
    else:
        intensity = img_array.mean(axis=2)

    return {"city_density_in_location": float(np.mean(intensity) / 255)}

