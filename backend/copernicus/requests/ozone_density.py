from matplotlib.colors import LinearSegmentedColormap

from satellite_requests.stat_collector import get_request_city_density, get_request_ozone
from PIL import Image
from io import BytesIO
import tifffile as tiff
import numpy as np
import matplotlib.pyplot as plt

def ozone_density(latitude, longitude):
    response = get_request_ozone(latitude, longitude).content
    img_array = tiff.imread(BytesIO(response))
    img_array = np.array(img_array)
    pixel_rgb = np.array(img_array[int(len(img_array[0]) / 2)][int(len(img_array[0]) / 2)][:3]) / 255
    Image.fromarray(img_array).save('in.png')

    if img_array.ndim == 2:
        intensity = img_array
    else:
        intensity = img_array.mean(axis=2)

    vmin = 0
    vmax = 255
    n = 1000

    cmap = LinearSegmentedColormap.from_list("ozone_like", ["cyan", "green", "yellow"])
    values = np.linspace(vmin, vmax, n)
    colors = cmap((values - vmin) / (vmax - vmin))[:, :3]

    distances = np.linalg.norm(colors - pixel_rgb, axis=1)
    idx = np.argmin(distances)

    plt.figure(figsize=(8, 8))
    plt.imshow(img_array, cmap=LinearSegmentedColormap.from_list("ozone_like", ["cyan", "green", "yellow"]))
    plt.colorbar(cmap=cmap)
    plt.title("Ozone Concentration (Yellow = High)", fontsize=14)
    plt.show()
    return values[idx] / 255

print(ozone_density(42.005507, 21.411283))