# 🧠 Image Object Detection Using YOLOv5

**A full-stack object detection application integrating a React frontend, Node.js backend, and Python-based YOLOv5 detection pipeline using PyTorch and OpenCV for real-time image processing.**

---

## 🎯 Project Overview

Achieved real-time object detection on images using the state-of-the-art YOLOv5 model with OpenCV for visualization. The backend handles detection logic in Python, while the Node.js server connects it to a modern React-based frontend interface. This project demonstrates seamless integration across the stack for user-friendly interaction and accurate detection results.

---

## 🚀 Features

- **Model Integration**: Utilizes `torch.hub.load` to download and load YOLOv5 models (`yolov5n`, `yolov5s`, etc.) directly in Python.
- **Image Detection**: Reads and resizes input images, runs detection, converts results to pandas DataFrame, and draws bounding boxes with labels and confidence scores.
- **React Frontend**: Allows users to upload images, view results, and interact with the detection system through a clean UI.
- **Node.js Backend**: Manages HTTP requests, serves the React app, and interfaces with the Python detection module.
- **Configurable Confidence Thresholds**: Filter detections based on confidence.
- **Extensible Codebase**: Modular Python scripts and JavaScript components that can be extended for batch processing or application integration.

---

## 🔧 Getting Started

### 1. Clone the Repo
```bash
git clone https://github.com/shkumar156/Image-Object-Detection-Using-Yolov5.git
cd Image-Object-Detection-Using-Yolov5
```

### 2. Install Python Dependencies
```bash
pip install -r requirements.txt
```

### 3. Install Node.js Dependencies (for backend/frontend)
```bash
cd client    # or wherever your React frontend is
npm install
cd ../server # your Node.js backend
npm install
```

### 4. Run Object Detection (Python backend)

**Image Mode:**
```bash
python detect.py --source your_image.jpg
```

### 5. Start Full-Stack App
```bash
# In /client
npm start     # React frontend

# In /server
node index.js # Node.js backend
```

---

## 🧠 How It Works

1. **Load YOLOv5 Model**: Using PyTorch Hub.
2. **Load & Preprocess Input**: Images are uploaded via the React interface and sent to the backend.
3. **Run Detection**: Node.js backend triggers the Python detection script.
4. **Draw Bounding Boxes**: Processed images with detections are sent back and displayed in the frontend.
5. **Output Display**: Users view the results with bounding boxes and labels via the React app.

---

## 🛠️ Customization

- Change model variant (`yolov5s`, `m`, `l`, `x`) for different speed/accuracy trade-offs.
- Adjust confidence thresholds.
- Add saving functionality for processed outputs.
- Integrate batch image.
- Extend the frontend for drag-and-drop uploads or real-time webcam feed support.

---

## 📚 References

- [Ultralytics YOLOv5 GitHub](https://github.com/ultralytics/yolov5)
- [YOLOv5 Docs](https://docs.ultralytics.com/)
- [OpenCV Python](https://docs.opencv.org/master/d6/d00/tutorial_py_root.html)

---

