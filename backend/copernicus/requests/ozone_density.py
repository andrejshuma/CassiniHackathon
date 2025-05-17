from satellite_requests.stat_collector import get_request_city_density, get_request_ozone
from io import BytesIO
import tifffile as tiff

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
    if img_array.ndim == 2:
        intensity = img_array
    else:
        intensity = img_array.mean(axis=2)

    ozone_value= intensity[int(len(intensity) / 2)][int(len(intensity[0]) / 2)]
    category_info = categorize_ozone(ozone_value)
    
    result = {
        "ozone_value": float(ozone_value),
        "category": category_info["category"],
        "score": category_info["score"]
    }
    return 0 


