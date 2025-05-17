import cdsapi
from datetime import datetime
from zoneinfo import ZoneInfo
import xarray as xr
import os
import pandas as pd
import geocoder
from consts import KEY


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


def get_pollen_data_ncfile():
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
    get_pollen_data_ncfile()

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
    df.to_csv("macedonia_pollen.csv", index=False)
    df.to_json("macedonia_pollen.json", orient="records", date_format="iso")

    return df.to_dict(orient="records")

get_pollen_data_json(42.005299, 21.417165)