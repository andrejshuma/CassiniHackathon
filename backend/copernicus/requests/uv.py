import cdsapi
import xarray as xr
import pandas as pd

import os
import tempfile

URL = "https://ads.atmosphere.copernicus.eu/api"
KEY = str(os.getenv("key"))

def request_uv(year, month, day, variable, area):
    dataset = "reanalysis-era5-single-levels"
    client = cdsapi.Client(url=URL, key=KEY)
    request = {
        "product_type": ["reanalysis"],
        "year": [year],
        "month": [month],
        "day": [day],
        "time": [
            "04:00", "05:00",
            "06:00", "07:00", "08:00",
            "09:00", "10:00", "11:00",
            "12:00", "13:00", "14:00",
            "15:00", "16:00", "17:00",
            "18:00", "19:00", "20:00",
            "21:00"
        ],
        "data_format": "grib",
        "download_format": "unarchived",
        "variable": [variable],
        "area": area
    }
    client = cdsapi.Client()
    with tempfile.NamedTemporaryFile(suffix=".grib", delete=False) as tmp_file:
        path = tmp_file.name
    client.retrieve(dataset, request).download(path)
    return path


def clean_data(doc, variable):
    ds = xr.open_dataset(doc, engine='cfgrib')

    # print(ds.variables)

    uvb = ds[variable] 

    steps = uvb.coords['step'].values
    times = uvb.coords['time'].values
    valid_times = uvb.coords['valid_time'].values.reshape(-1)

    
    values = uvb.values.flatten()

    df = pd.DataFrame({
        'valid_time': valid_times,
        'uv_radiation_J_per_m2': values
    })

    data = df.dropna()
    return data, df

# def plot(data, dataframe):

#     plt.figure(figsize=(12, 6))

#     plt.plot(data['valid_time'], data['uv_radiation_J_per_m2'], marker='o', linestyle='-')

#     plt.title("Surface Downward UV Radiation Over Time", fontsize=14)
#     plt.xlabel("Time", fontsize=12)
#     plt.ylabel("UV Radiation (J/m²)", fontsize=12)

#     plt.grid(True)
#     plt.xticks(rotation=45)
#     plt.tight_layout()

#     plt.show()

    # print(dataframe)

def get_uv(long, lat):

    # area = [42.037819, 21.328068, 41.947234, 21.552944]
    area = [lat + 0.02, long - 0.02, lat - 0.02, long - 0.02]
    doc = request_uv(year="2025", month="01", day="10", variable="downward_uv_radiation_at_the_surface", area=area)
    cleaned_data, df = clean_data(doc=doc, variable="uvb")

    # print(dataframe)

    os.remove(doc)

    df['valid_time'] = df['valid_time'].astype(str)  

    df['valid_time'] = pd.to_datetime(df['valid_time'])
    df = df[df['valid_time'].dt.day == int("10")]  
    df['valid_time'] = df['valid_time'].astype(str)
    df = df.fillna(0)
    json_data = df.to_dict(orient='records')

    return json_data
