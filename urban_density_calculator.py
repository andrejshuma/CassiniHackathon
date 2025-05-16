from PIL import Image
import numpy as np

img_path = "img.png"
image = Image.open(img_path).convert("RGB")
image_np = np.array(image)

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

output_pil = Image.fromarray(output_image)
output_pil.save("processed_img.png")
