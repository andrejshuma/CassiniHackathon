import rasterio
import numpy as np
from satellite_requests.stat_collector import get_request_city_density, get_request_ozone

# Save your response content to a file
response = get_request_ozone(42.005299,21.417165)

with open("ozone.tiff", "wb") as f:
    f.write(response.content)

# Read the GeoTIFF
with rasterio.open("ozone.tiff") as dataset:
    band = dataset.read(1)  # First band (raw O₃ data)
    mask = band != dataset.nodata  # Remove nodata pixels
    values = band[mask]

    # Calculate average (mol/m²)
    average_mol_per_m2 = np.mean(values)
    print(f"Average ozone: {average_mol_per_m2:.6f} mol/m²")

    # Convert to Dobson Units (DU)
    average_DU = average_mol_per_m2 * 2240.5
    print(f"Average ozone: {average_DU:.2f} DU")

    # Convert to ppb (optional, assuming 44,000 mol air/m²)
    average_ppb = (average_mol_per_m2 / 44000) * 1e9
    print(f"Average ozone: {average_ppb:.2f} ppb")

    result={
        "average_mol_per_m2": average_mol_per_m2,
        "average_DU": average_DU,
        "average_ppb": average_ppb,

    }
