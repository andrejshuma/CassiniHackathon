from PIL import Image
from io import BytesIO
import numpy as np
def convert_bytes_to_image(bytes):
    image = Image.open(BytesIO(bytes)).convert('RGB')
    image_array = np.array(image)
    return image_array