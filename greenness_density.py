from satellite_requests.stat_collector import get_request_green
from PIL import Image
from convert_bytes_to_image import *
import numpy as np
import matplotlib.pyplot as plt

def greenness_density(latitude, longitude):
    response = get_request_green(latitude, longitude).content
    image_np = convert_bytes_to_image(response)

    red = image_np[:, :, 0].astype(float)
    green = image_np[:, :, 1].astype(float)
    blue = image_np[:, :, 2].astype(float)

    ndgi = (green - red) / (green + red + 1e-5)
    plt.figure(figsize=(8, 8))
    plt.imshow(ndgi, cmap='Greens')
    plt.colorbar(label='Greenness Index (NDGI)')
    plt.title('Greenness Map')
    plt.axis('off')
    plt.show()
    # Image.fromarray(image_np).save('first.png')
    #
    # green_threshold = 0
    # green_dominance = 0
    #
    # city_threshold = 100
    #
    # green_mask = ((image_np[:, :, 1] > green_threshold) &
    #               (image_np[:, :, 1] > image_np[:, :, 0] + green_dominance) &
    #               (image_np[:, :, 1] > image_np[:, :, 2] + green_dominance))
    #
    # building_mask = (image_np[:, :, 0] > city_threshold) & (image_np[:, :, 1] > city_threshold) & (image_np[:, :, 2] > city_threshold) & ~green_mask
    #
    # output_image = np.zeros_like(image_np)
    # output_image[green_mask] = [255, 255, 255]
    # output_image[building_mask] = [128, 128, 128]
    #
    # Image.fromarray(output_image).save('out.png')
    #
    # green_density = np.sum(green_mask) / (image_np.shape[0] * image_np.shape[1])
    print(np.max())
    return green_density

print(greenness_density(42.005507, 21.411283))