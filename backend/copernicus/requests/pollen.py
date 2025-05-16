import cdsapi
from datetime import datetime
from zoneinfo import ZoneInfo
import zipfile
import xarray as xr
import os
import pandas as pd
import geocoder


def get_forecast_time_and_lead():
    now = datetime.now(ZoneInfo("Europe/Skopje"))

    # CAMS valid base times
    base_times = [0, 6, 12, 18]

    # Select the latest base time <= now
    base_hour = max(t for t in base_times if t <= now.hour)
    base_time_str = f"{base_hour:02d}:00"

    # Lead time: 6 hours after base
    # leadtime = (now.hour - base_hour) + 6
    leadtime = now.hour

    # If the current hour is less than the base (midnight issue), adjust date
    forecast_date = now.strftime("%Y-%m-%d")

    return forecast_date, base_time_str, str(leadtime)

def get_pollen_data_ncfile():
    date,time,time_now = get_forecast_time_and_lead()
    lead_time_arr = [str(t) for t in  range(int(time_now)+1)]

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
        "date": date,
        "type": ["forecast"],
        "time": ["00:00"],
        "leadtime_hour": lead_time_arr,
        "data_format": "netcdf_zip",
        "area": [42.5, 20.5, 40.8, 23]
    }

    client = cdsapi.Client()
    client.retrieve(dataset, request).download("macedonia_pollen_forecast.zip")


def get_pollen_data_json():
    get_pollen_data_ncfile()

    # 1. Отпакување
    zip_path = 'macedonia_pollen_forecast.zip'  # или точниот zip фајл ако има друго име
    output_dir = 'unzipped_data'

    with zipfile.ZipFile(zip_path, 'r') as zip_ref:
        zip_ref.extractall(output_dir)

    # 2. Наоѓање на .nc фајл
    nc_file = None
    for file in os.listdir(output_dir):
        if file.endswith('.nc'):
            nc_file = os.path.join(output_dir, file)
            break

    # 3. Читање и печатење
    if nc_file:
        ds = xr.open_dataset(nc_file)
        print(ds)
    else:
        print("Не е пронајден .nc фајл во папката.")

    g = geocoder.ip('me')
    my_lat, my_lon = g.latlng
    print(f"My location: lat={my_lat}, lon={my_lon}")

    # Филтрирај по координати
    ds_mk = ds.sel(
        latitude=my_lat,
        longitude=my_lon,
        method='nearest'
    )
    # 4. Филтрирање за Македонија (пример со координати околу Скопје)
    # mk_lat_bounds = (41.0, 41.0009)
    # mk_lon_bounds = (20.0, 20.0012)



    # 5. Конвертирај во pandas DataFrame
    df = ds_mk.to_dataframe().reset_index()

    # 6. Прикажи дел од табелата
    print(df.head())

    df.to_csv("macedonia_pollen_new.csv", index=False)
    print("Табелата е зачувана како macedonia_pollen.csv")

    #7. Зачувување како JSON фајл
    df.to_json("macedonia_pollen.json", orient="records", date_format="iso")
    print("JSON фајлот е зачуван како macedonia_pollen.json")

    return df.to_dict(orient="records")
