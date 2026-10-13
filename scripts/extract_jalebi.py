import cv2
import os

# Check jalebi frames
cap_j = cv2.VideoCapture('scripts/jalebi.f137.mp4')
os.makedirs('scripts/jalebi_frames', exist_ok=True)
count = int(cap_j.get(cv2.CAP_PROP_FRAME_COUNT))

# Extract 60 evenly spaced frames from jalebi
indices = [int(i * (count - 1) / 59) for i in range(60)]
for idx, f_num in enumerate(indices):
    cap_j.set(cv2.CAP_PROP_POS_FRAMES, f_num)
    ret, frame = cap_j.read()
    if ret:
        # Resize to 1280x720 or keep 1920x1080 with high quality webp/jpg
        # Save as webp for ultra fast loading and high quality
        cv2.imwrite(f'scripts/jalebi_frames/frame_{idx:02d}.jpg', frame, [cv2.IMWRITE_JPEG_QUALITY, 85])
print(f"Extracted 60 jalebi frames from {count} frames")
cap_j.release()
