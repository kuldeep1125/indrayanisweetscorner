import urllib.request
import cv2
import os

os.makedirs('public/images/real', exist_ok=True)

headers = {'User-Agent': 'IndrayaniSweetCornerApp/1.0'}

downloads = {
    'kaju_katli.webp': 'https://upload.wikimedia.org/wikipedia/commons/d/d5/Homemade_Kaju_Katli.jpg',
    'motichoor_ladoo.webp': 'https://upload.wikimedia.org/wikipedia/commons/9/98/Laddu%2C_Buniya_Ko.jpg',
    'gulab_jamun.webp': 'https://upload.wikimedia.org/wikipedia/commons/6/61/Gulab_Jamun_as_a_Diwali_Sweet.jpg',
    'poha.webp': 'https://upload.wikimedia.org/wikipedia/commons/8/80/Poha.jpg',
    'misal_pav.webp': 'https://upload.wikimedia.org/wikipedia/commons/d/d9/Misal_Pav%2C_a_Maharashtrian_snack.JPG',
    'modak.webp': 'https://upload.wikimedia.org/wikipedia/commons/8/8d/Sweet_Modak_2.jpg',
    'samosa.webp': 'https://upload.wikimedia.org/wikipedia/commons/9/95/Samosa_with_sweet_chutney.jpg',
    'bhakarwadi.webp': 'https://upload.wikimedia.org/wikipedia/commons/7/7f/Bhakarwadi_Up-Close.jpg',
    'rasgulla.webp': 'https://upload.wikimedia.org/wikipedia/commons/c/ce/Rasgulla_With_Rabdi.jpg',
    'peda.webp': 'https://upload.wikimedia.org/wikipedia/commons/9/91/Indian_Sweet_Dessert_Peda_in_a_white_bone_china_plate.jpg',
}

for name, url in downloads.items():
    try:
        temp_path = f'scripts/{name}.tmp'
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req) as resp, open(temp_path, 'wb') as f:
            f.write(resp.read())
        
        # Read and resize cleanly
        img = cv2.imread(temp_path)
        if img is not None:
            # Crop to square or 4:3 if needed, or save at high quality
            h, w = img.shape[:2]
            # resize if too huge
            if max(h, w) > 1200:
                scale = 1200 / max(h, w)
                img = cv2.resize(img, (int(w * scale), int(h * scale)), interpolation=cv2.INTER_AREA)
            
            out_dest = f'public/images/real/{name}'
            cv2.imwrite(out_dest, img, [cv2.IMWRITE_WEBP_QUALITY, 88])
            print(f"Successfully processed {name} ({img.shape[1]}x{img.shape[0]})")
            if os.path.exists(temp_path):
                os.remove(temp_path)
        else:
            print(f"Failed to decode {name}")
    except Exception as e:
        print(f"Error for {name}: {e}")

print("All real images downloaded and converted to webp!")
