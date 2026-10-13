import cv2
import os

# Create public/sequence directory
os.makedirs('public/sequence', exist_ok=True)

# Let's inspect both jalebi and laddu frames and pick the best or create the 60 frames sequence
# Let's see: Jalebi has golden saffron syrup swirling and rotating in cinematic light
cap = cv2.VideoCapture('scripts/jalebi.f137.mp4')
total = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
indices = [int(i * (total - 1) / 59) for i in range(60)]

for idx, f_num in enumerate(indices):
    cap.set(cv2.CAP_PROP_POS_FRAMES, f_num)
    ret, frame = cap.read()
    if ret:
        # Resize to 1280x720 for optimal performance and crisp retina sharpness
        frame_resized = cv2.resize(frame, (1280, 720), interpolation=cv2.INTER_AREA)
        out_path = f'public/sequence/frame_{idx:02d}.webp'
        cv2.imwrite(out_path, frame_resized, [cv2.IMWRITE_WEBP_QUALITY, 82])

print(f"Generated 60 WebP sequence frames in public/sequence")
cap.release()
