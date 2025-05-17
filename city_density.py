from satellite_requests.stat_collector import get_request_city_density
import matplotlib.pyplot as plt
import tifffile as tiff
import numpy as np

def city_density(latitude, longitude):
    response = get_request_city_density(latitude, longitude).content
    with open('urban.tiff', 'wb') as file:
        file.write(response)

    img_array = tiff.imread('urban.tiff')
    if img_array.ndim == 2:
        intensity = img_array
    else:
        intensity = img_array.mean(axis=2)

    # plt.figure(figsize=(10, 10))
    # plt.imshow(intensity, cmap='hot', interpolation='nearest')
    # plt.title("Urban Density Map of Skopje (Raw)")
    # plt.axis('off')
    # plt.colorbar(label='Density Intensity')
    # plt.show()

    return np.mean(intensity) / 255

print(city_density(42.005507, 21.411283))