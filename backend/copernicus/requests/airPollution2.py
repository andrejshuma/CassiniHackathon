import requests
from datetime import datetime, timedelta
import json
import math

from population_getter import get_population_from_location
def haversine(lon1, lat1, lon2, lat2):
    # Calculate the great-circle distance between two points on the Earth
    R = 6371  # Earth radius in kilometers
    lon1, lat1, lon2, lat2 = map(float, [lon1, lat1, lon2, lat2])
    dlon = math.radians(lon2 - lon1)
    dlat = math.radians(lat2 - lat1)
    a = math.sin(dlat/2)**2 + math.cos(math.radians(lat1)) * math.cos(math.radians(lat2)) * math.sin(dlon/2)**2
    c = 2 * math.asin(math.sqrt(a))
    return R * c


def categorize_air_quality(pm10_value):
    """
    Categorize air quality based on PM10 values and return both category and score.
    
    Categories:
    - Good: 0-20 μg/m³ (Score: 1)
    - Moderate: 21-50 μg/m³ (Score: 2)
    - Unhealthy for Sensitive Groups: 51-100 μg/m³ (Score: 3)
    - Unhealthy: 101-150 μg/m³ (Score: 4)
    - Very Unhealthy: 151-200 μg/m³ (Score: 5)
    - Hazardous: >200 μg/m³ (Score: 6)
    """
    try:
        value = float(pm10_value)
        if value <= 20:
            return {"category": "Good", "score": 1}
        elif value <= 50:
            return {"category": "Moderate", "score": 2}
        elif value <= 100:
            return {"category": "Unhealthy for Sensitive Groups", "score": 3}
        elif value <= 150:
            return {"category": "Unhealthy", "score": 4}
        elif value <= 200:
            return {"category": "Very Unhealthy", "score": 5}
        else:
            return {"category": "Hazardous", "score": 6}
    except (ValueError, TypeError):
        return {"category": "Unknown", "score": None}

def get_air_pollution(lat, long, max_distance=30, city='Skopje'):

    # obj= get_population_from_location(lat, long, population_data_= data)
    # city = obj['city']

    sensors = f'https://{city}.pulse.eco/rest/sensor'
    response = requests.get(sensors)
    if response.status_code != 200:
        return json.dumps([])
    
    sensors_data = response.json()
    
    # Create a list to store sensors with their distances
    sensors_with_distances = []
    
    for entry in sensors_data:
        if entry['status'] == 'ACTIVE' and 'position' in entry:
            try:
                parts = entry['position'].split(',')
                if len(parts) != 2:
                    continue
                
                sensor_lat = float(parts[0])
                sensor_long = float(parts[1])
                dist = haversine(long, lat, sensor_long, sensor_lat)
                
                # Only consider sensors within max_distance
                if dist <= max_distance:
                    sensors_with_distances.append((entry, dist))
            except Exception:
                pass
    
    if not sensors_with_distances:
        return json.dumps([])
    
    # Sort sensors by distance (closest first)
    sensors_with_distances.sort(key=lambda x: x[1])
    
    now = datetime.now()
    to_time = now.strftime('%Y-%m-%dT%H:%M:%S%%2b01:00')
    from_time = (now - timedelta(hours=2)).strftime('%Y-%m-%dT%H:%M:%S%%2b01:00')
    
    # Try sensors in order of proximity until we find one with data
    if len(sensors_with_distances)==0: return {}
    
    for sensor_entry, dist in sensors_with_distances:
        sensorID = sensor_entry['sensorId']
        
        link = f'https://{city}.pulse.eco/rest/dataRaw?sensorId={sensorID}&type=pm10&from={from_time}&to={to_time}'
        response = requests.get(link)
        results = []
        
        if response.status_code == 200:
            try:
                data = response.json()
                for entry in data:
                    if 'stamp' in entry and 'value' in entry:
                        # Create simplified object with datetime, value and normalized value
                        try:
                            original_value = float(entry['value'])
                            scaled_value = original_value / 900.0  # Scale by dividing by 900
                            
                            # Get air quality category and score
                            quality_info = categorize_air_quality(original_value)
                            
                            simplified = {
                                "datetime": entry['stamp'],
                                "value": original_value,
                                "scaled_value": scaled_value,
                                "category": quality_info["category"],
                                "score": quality_info["score"]
                            }
                            
                            results.append(simplified)
                        except (ValueError, TypeError):
                            # Skip entries with invalid numeric values
                            pass
                
                if results:
                    # Return the first valid result
                    return json.dumps(results[-1])

            except Exception:
                pass
    
    # If we reach here, we tried all sensors within range and found no data
    return json.dumps([])

print(get_air_pollution(lat=41.9965, long=21.4314, city="Skopje"))
