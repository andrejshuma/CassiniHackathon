import requests
import pandas as pd
import matplotlib.pyplot as plt
from datetime import datetime

# Step 1: Define API endpoint and parameters
city = "skopje"  # Replace with your city (e.g., ohrid)

sensors=f'https://{city}.pulse.eco/rest/sensor'
sensorIDs=[]
response = requests.get(sensors)
data = response.json()
for entry in data:
    if entry['status']=='ACTIVE':
        sensorIDs.append(entry['sensorId'])

for sensorID in sensorIDs:
    link=f'https://skopje.pulse.eco/rest/dataRaw?sensorId={sensorID}&type=pm10&from=2025-01-15T02:00:00%2b01:00&to=2025-04-19T12:00:00%2b01:00'
    response = requests.get(link)
    if response.status_code == 200:
        try:
            data = response.json()
            if data:  # Only print if data is not empty
                print(f"Sensor {sensorID} returned data:")
                for entry in data:
                    print(entry)
        except Exception as e:
            print(f"Sensor {sensorID} - Could not decode JSON: {e}")
            print("Response text:", response.text)
    else:
        print(f"Sensor {sensorID} - HTTP error {response.status_code}")