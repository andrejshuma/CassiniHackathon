import cdsapi
import json
from datetime import datetime
from zoneinfo import ZoneInfo
import xarray as xr
import os
import pandas as pd
import geocoder
from .consts import KEY


# score = [weight * pref for weight,pref in zip(weights, preferences)]
from .consts import KEY



def get_forecast_curr_time_and_lead_time():
    now = datetime.now(ZoneInfo("Europe/Skopje"))

    # CAMS valid base times
    base_times = [0, 6, 12, 18]

    # Select the latest base time <= now
    base_hour = max(t for t in base_times if t <= now.hour)
    base_time_str = f"{base_hour:02d}:00"

    # leadtime = now.hour
    # If the current hour is less than the base (midnight issue), adjust date
    forecast_date = now.strftime("%Y-%m-%d")

    return forecast_date, base_time_str, now.hour


def get_pollen_data_ncfile(lat, lng):
    date, time, time_now = get_forecast_curr_time_and_lead_time()
    lead_time_arr = [str(t) for t in range(int(time_now) + 1)]

    dataset = "cams-europe-air-quality-forecasts"
    request = {
        "variable": [
            "alder_pollen",
            "birch_pollen",
            "grass_pollen",
            "mugwort_pollen",
            "olive_pollen",
            "ragweed_pollen"
        ],
        "model": ["ensemble"],
        "level": ["0"],
        "date": "2025-05-16",
        "type": ["forecast"],
        "time": ["00:00"],
        "leadtime_hour": lead_time_arr,
        "data_format": "netcdf",
        "area": [42.5, 20.5, 40.8, 23]
    }
    URL = "https://ads.atmosphere.copernicus.eu/api"

    client = cdsapi.Client(url=URL, key=KEY)
    client.retrieve(dataset, request).download("macedonia_pollen_forecast.nc")


def get_pollen_data_json(lat, lon):
    get_pollen_data_ncfile(lat, lon)

    nc_file_name = 'macedonia_pollen_forecast.nc'

    if not os.path.exists(nc_file_name):
        print("Не е пронајден .nc фајл.")
        return

    ds = xr.open_dataset(nc_file_name)

    g = geocoder.ip('me')
    my_lat, my_lon = g.latlng
    print(f"My location: lat={my_lat}, lon={my_lon}")

    # Филтрирај по координати
    ds_mk = ds.sel(
        latitude=lat,
        longitude=lon,
        method='nearest'
    )

    # 4. Филтрирање за Македонија (пример со координати околу Скопје)
    # mk_lat_bounds = (41.0, 41.0009)
    # mk_lon_bounds = (20.0, 20.0012)

    # 5. Конвертирај во pandas DataFrame
    df = ds_mk.to_dataframe().reset_index()
    # df.to_csv("macedonia_pollen.csv", index=False)
    # df.to_json("macedonia_pollen.json", orient="records", date_format="iso")
    data = df.to_dict(orient="records")[-1]
    scaled = dict()
    scaled["apg_conc_scaled"] = data['apg_conc'] / 50 if data['apg_conc'] else 1
    scaled["bpg_conc_scaled"] = data['bpg_conc'] / 100 if data['bpg_conc'] else 1
    scaled["gpg_conc_scaled"] = data['gpg_conc'] / 20 if data['gpg_conc'] else 1
    scaled["mpg_conc_scaled"] = data['mpg_conc'] / 20 if data['mpg_conc'] else 1
    scaled["opg_conc_scaled"] = data['opg_conc'] / 100 if data['opg_conc'] else 1
    scaled["rwpg_conc_scaled"] = data['rwpg_conc'] / 20 if data['rwpg_conc'] else 1
    # with open('macedonia_pollen_scaled.json', 'w') as file:
    #     json.dump(scaled, file)
    ds.close()
    os.remove('macedonia_pollen_forecast.nc')
    return scaled

# print(get_pollen_data_json(lat=41.9965, lon=21.4314))