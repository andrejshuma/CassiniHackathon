from matplotlib.colors import LinearSegmentedColormap

from satellite_requests.stat_collector import get_request_city_density, get_request_ozone
from PIL import Image
from io import BytesIO
import tifffile as tiff
import numpy as np
import matplotlib.pyplot as plt

def categorize_ozone(ozone_value):
    """
    Categorize ozone based on visualization values from Sentinel-5P data.
    
    These are normalized visualization values, not direct physical measurements.
    
    Categories:
    - Very Low: < 50 (Score: 1) - Severe ozone depletion
    - Low: 50-100 (Score: 2) - Significant ozone thinning
    - Moderate-Low: 100-150 (Score: 3) - Below average levels
    - Moderate: 150-200 (Score: 4) - Near average levels
    - Moderate-High: 200-250 (Score: 5) - Above average levels
    - High: > 250 (Score: 6) - High ozone concentration
    """
    try:
        value = float(ozone_value)
        if value < 50:
            return {"category": "Very Low", "score": 1}
        elif value < 100:
            return {"category": "Low", "score": 2}
        elif value < 150:
            return {"category": "Moderate-Low", "score": 3}
        elif value < 200:
            return {"category": "Moderate", "score": 4}
        elif value < 250:
            return {"category": "Moderate-High", "score": 5}
        else:
            return {"category": "High", "score": 6}
    except (ValueError, TypeError):
        return {"category": "Unknown", "score": None}


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