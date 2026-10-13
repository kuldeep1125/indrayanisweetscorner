import cv2
import os

os.makedirs('public/sequence_laddu', exist_ok=True)
cap = cv2.VideoCapture('scripts/laddu.f137.mp4')
# 1450 to 1650 was the beauty shot of laddu
indices = [int(1450 + i * (200 / 59)) for i in range(60)]

for idx, f_num in enumerate(indices):
    cap.set(cv2.CAP_PROP_POS_FRAMES, f_num)
    ret, frame = cap.read()
    if ret:
        frame_resized = cv2.resize(frame, (1280, 720), interpolation=cv2.INTER_AREA)
        out_path = f'public/sequence_laddu/frame_{idx:02d}.webp'
        cv2.imwrite(out_path, frame_resized, [cv2.IMWRITE_WEBP_QUALITY, 82])

print("Generated 60 WebP sequence frames in public/sequence_laddu")
cap.release()
