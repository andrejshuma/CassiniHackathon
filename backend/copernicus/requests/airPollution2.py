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

def get_air_pollution(lat, long, max_distance=30):

    obj= get_population_from_location(lat, long)
    city = obj['city']
    print(city)

    sensors=f'https://{city}.pulse.eco/rest/sensor'
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

                # print(sensor_long, sensor_lat)
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
                    filtered = {k: entry[k] for k in ('stamp', 'position', 'value') if k in entry}
                    if filtered:
                        results.append(filtered)
                
                if results:
                    return json.dumps(results, indent=4)
            except Exception:
                pass
    
    # If we reach here, we tried all sensors within range and found no data
    return json.dumps([])

# Example usage
# print(get_air_pollution(lat=41.934, long=21.3))

