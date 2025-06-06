import cdsapi
import xarray as xr
import pandas as pd
import os
import tempfile
from .consts import KEY
from .testingUv import categorize_uv_index, get_current_hour_uv, uv_radiation_to_index

URL = "https://ads.atmosphere.copernicus.eu/api"
KEY = "457347ba-9776-4077-992b-c673b0776e6f"

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




def get_uv(long, lat):
    # area = [42.037819, 21.328068, 41.947234, 21.552944]
    area = [lat + 0.02, long - 0.02, lat - 0.02, long - 0.02]
    doc = request_uv(year="2025", month="05", day="08", variable="downward_uv_radiation_at_the_surface", area=area)
    cleaned_data, df = clean_data(doc=doc, variable="uvb")

    os.remove(doc)

    df['valid_time'] = df['valid_time'].astype(str)  

    df['valid_time'] = pd.to_datetime(df['valid_time'])
    df = df.fillna(0)
    json_data = df.to_dict(orient='records')

    # lmao
    a = json_data
    b = get_current_hour_uv(a)
    if b is None:
        return {'category': 'No data', 'score': -1, 'scaled_value': 0, 'value': -1, 'description': 'No data.'}
    c = uv_radiation_to_index(b['uv_radiation_J_per_m2'],3600)
    d = (categorize_uv_index(c))
    return d





