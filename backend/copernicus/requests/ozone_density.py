from satellite_requests.stat_collector import get_request_city_density, get_request_ozone
from io import BytesIO
import tifffile as tiff

def ozone_density(latitude, longitude):
    response = get_request_ozone(latitude, longitude).content
    img_array = tiff.imread(BytesIO(response))
    if img_array.ndim == 2:
        intensity = img_array
    else:
        intensity = img_array.mean(axis=2)

    return intensity[int(len(intensity) / 2)][int(len(intensity[0]) / 2)]

print(ozone_density(42.005507, 21.411283))