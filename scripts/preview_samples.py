import cv2
import os

cap = cv2.VideoCapture('scripts/laddu.f137.mp4')
os.makedirs('scripts/preview', exist_ok=True)

# Sample 10 frames across the video
total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
step = total_frames // 10

for i in range(10):
    frame_idx = i * step
    cap.set(cv2.CAP_PROP_POS_FRAMES, frame_idx)
    ret, frame = cap.read()
    if ret:
        cv2.imwrite(f'scripts/preview/sample_{i:02d}_frame_{frame_idx}.jpg', frame)
        print(f"Saved sample {i} at frame {frame_idx}")

cap.release()
