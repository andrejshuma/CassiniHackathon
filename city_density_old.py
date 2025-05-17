from PIL import Image
from io import BytesIO
from satellite_requests.stat_collector import get_request_city_density
from convert_bytes_to_image import *
from scipy.ndimage import distance_transform_edt
import numpy as np

def city_density(latitude, longitude):
    response = get_request_city_density().content
    image_np = convert_bytes_to_image(response)

    # image.save("urban.tiff")

    red_threshold = 70
    green_threshold = 100
    distance_threshold = 7

    red = image_np[:, :, 0]
    green = image_np[:, :, 1]
    blue = image_np[:, :, 2]

    red_mask = (red > red_threshold) & (red > green) & (red > blue)
    green_mask = (green > green_threshold) & (green > red) & (green > blue)

    non_red_mask = ~red_mask
    distance_from_red = distance_transform_edt(non_red_mask)
    proximity_mask = (distance_from_red <= distance_threshold)
    extra_white_mask = proximity_mask & non_red_mask & ~green_mask

    output_image = np.zeros_like(image_np)
    output_image[red_mask] = [255,255,255]
    output_image[extra_white_mask] = [255,255,255]

    Image.fromarray(output_image).save('processed_image.png')

    density = np.sum(red_mask | extra_white_mask) / (image_np.shape[0] * image_np.shape[1])
    print(f"City density: {density * 100:.2f}%")
    return density

city_density(0,0)