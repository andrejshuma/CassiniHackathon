import cdsapi
import zipfile
import pandas as pd
import matplotlib.pyplot as plt
import os
import json
import tempfile

URL = "https://ads.atmosphere.copernicus.eu/api"
KEY = str(os.getenv("key"))

def request_air_pollution(year, month, day, variable, country):
    client = cdsapi.Client(url=URL, key=KEY)
    dataset = "cams-europe-air-quality-forecasts-optimised-at-observation-sites"
    request = {
        "variable": [variable],
        "country": [country],
        "type": ["raw"],
        "leadtime_hour": ["0-23"],
        "year": [year],
        "month": [month],
        "day": day,
        "include_station_metadata": "no"
    }

    client=cdsapi.Client()
    with tempfile.TemporaryDirectory() as unzip_dir:
        download_path = client.retrieve(dataset, request).download(os.path.join(unzip_dir, "data.zip"))
        with zipfile.ZipFile(download_path, "r") as zip_ref:
            zip_ref.extractall(unzip_dir)

        all_dfs = []
        csv_files = [f for f in os.listdir(unzip_dir) if f.endswith('.csv')]
        for csv_file in csv_files:
            file_path = os.path.join(unzip_dir, csv_file)
            try:
                df = pd.read_csv(file_path, delimiter=';')
                if 'datetime' in df.columns and 'conc_raw_micrograms_per_m3' in df.columns:
                    filtered = df[['datetime', 'conc_raw_micrograms_per_m3']]
                    all_dfs.append(filtered)
            except Exception as e:
                print(f"Error reading {csv_file}: {e}")

        if all_dfs:
            combined_df = pd.concat(all_dfs)
            result_df = combined_df.groupby('datetime', as_index=False)['conc_raw_micrograms_per_m3'].mean()
            all_data = result_df.to_dict(orient='records')
        else:
            all_data = []

        # Print the result to the console
        
        return all_data


output_json_file = request_air_pollution("2025", "04", ["20"], "particulate_matter_10um", "north_macedonia")
