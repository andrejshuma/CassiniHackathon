from scipy.ndimage import gaussian_filter
from satellite_requests.stat_collector import get_request_city_density
from PIL import Image
import numpy as np
import matplotlib.pyplot as plt
import tifffile as tiff

response = get_request_city_density().content
with open('urban.tiff', 'wb') as file:
    file.write(response)

def plot_urban_density(image_path):
    # Load the TIFF image
    img_array = tiff.imread(image_path)

    # If grayscale
    if img_array.ndim == 2:
        intensity = img_array
    else:
        # Calculate average intensity for RGB image
        intensity = img_array.mean(axis=2)

    # Plot raw intensity map
    plt.figure(figsize=(10, 10))
    plt.imshow(intensity, cmap='hot', interpolation='nearest')
    plt.title("Urban Density Map of Skopje (Raw)")
    plt.axis('off')
    plt.colorbar(label='Density Intensity')
    plt.show()

def plot_urban_density_smooth(image_path, sigma=2):
    # Load the TIFF image
    img_array = tiff.imread(image_path)

    # If grayscale
    if img_array.ndim == 2:
        intensity = img_array
    else:
        # Calculate average intensity for RGB image
        intensity = img_array.mean(axis=2)

    # Apply Gaussian blur to smooth out seams
    smoothed_intensity = gaussian_filter(intensity, sigma=sigma)
    # Plot smoothed intensity map
    plt.figure(figsize=(10, 10))
    # [21.411921, 41.936182, 21.441921, 41.986182]
    plt.imshow(smoothed_intensity, cmap='hot', interpolation='bilinear')
    plt.title("Smoothed Urban Density Map of Skopje")
    plt.axis('off')
    plt.colorbar(label='Density Intensity')
    plt.show()

if __name__ == "__main__":
    image_path = "urban.tiff"

    # Plot both versions
    plot_urban_density(image_path)
    plot_urban_density_smooth(image_path, sigma=2)