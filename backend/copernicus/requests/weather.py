import json
import requests
from datetime import datetime

def get_weather_forecast_rain(lat, lon, api_key):
    url = "https://pro.openweathermap.org/data/2.5/forecast"
    params = {
        "lat": lat,
        "lon": lon,
        "appid": api_key,
        "units": "metric"
    }
    today_str = datetime.today().strftime('%Y-%m-%d')

    response = requests.get(url, params=params)

    if response.status_code == 200:
        data = response.json()
    else:
        print(f"Error {response.status_code}: {response.text}")
        return None

    data_rain = []

    for d in data["list"]:
        print(d)
        if d["weather"][0]["main"] == "Rain" and d["dt_txt"].split(" ")[0] == today_str:
            data_rain.append(d)

    return data_rain

# Example usage
# lat = 44.34
# lon = 10.99
# api_key = "2f68080fdab65f50de3f2883879913cd"
#
# forecast_data = get_weather_forecast(lat, lon, api_key)
#
# print(forecast_data)

#Download json file
# with open("weather.json", "w", encoding="utf-8") as f:
#     json.dump(forecast_data, f, ensure_ascii=False, indent=4)
#
# if forecast_data:
#     print(forecast_data)
