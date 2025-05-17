from satellite_requests.stat_collector import get_request_green
from convert_bytes_to_image import *
import numpy as np

def greenness_density(latitude, longitude):
    response = get_request_green().content
    image_np = convert_bytes_to_image(response)

    green_threshold = 0
    green_dominance = 0

    city_threshold = 100

    green_mask = ((image_np[:, :, 1] > green_threshold) &
                  (image_np[:, :, 1] > image_np[:, :, 0] + green_dominance) &
                  (image_np[:, :, 1] > image_np[:, :, 2] + green_dominance))

    building_mask = (image_np[:, :, 0] > city_threshold) & (image_np[:, :, 1] > city_threshold) & (image_np[:, :, 2] > city_threshold) & ~green_mask

    output_image = np.zeros_like(image_np)
    output_image[green_mask] = [255, 255, 255]
    output_image[building_mask] = [128, 128, 128]

    green_density = np.sum(green_mask) / (image_np.shape[0] * image_np.shape[1])
    print(f"Green area density: {green_density * 100:.2f}%")
    return green_density

greenness_density(0,0)