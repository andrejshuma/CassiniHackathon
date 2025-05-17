from satellite_requests.stat_collector import get_request_city_density, get_request_ozone
import matplotlib.pyplot as plt
import tifffile as tiff
import numpy as np

def ozone(latitude, longitude):
    response = get_request_ozone(latitude, longitude).content
    with open('ozone.tiff', 'wb') as file:
        file.write(response)

    img_array = tiff.imread('ozone.tiff')
    if img_array.ndim == 2:
        intensity = img_array
    else:
        intensity = img_array.mean(axis=2)

    # plt.figure(figsize=(10, 10))
    # plt.imshow(intensity, cmap='hot', interpolation='nearest')
    # plt.title("Ozone Map of Skopje (Raw)")
    # plt.axis('off')
    # plt.colorbar(label='Ozone')
    # plt.show()

    return intensity[int(len(intensity) / 2)][int(len(intensity[0]) / 2)]

print(ozone(42.005507, 21.411283))