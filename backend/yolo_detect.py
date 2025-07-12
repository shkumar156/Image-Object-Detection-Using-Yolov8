import sys
from ultralytics import YOLO
from pathlib import Path

if len(sys.argv) < 3:
    print("Usage: python yolo_detect.py <weights_path> <image_path>")
    sys.exit(1)

weights_path = sys.argv[1]
image_path = sys.argv[2]

print("Using weights file:", weights_path)

model = YOLO(weights_path)
# Use /data/runs/detect as the project directory (writable in Hugging Face Spaces)
results = model(image_path, save=True, project='/data/runs/detect', exist_ok=True)

# Print the path to the saved image
for r in results:
    for path in Path(r.save_dir).glob("*"):
        if path.is_file():
            print(str(path)) 