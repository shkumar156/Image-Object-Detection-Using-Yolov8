# 🧠 Image Object Detection Using YOLOv8

**A full-stack object detection system integrating a React frontend, Node.js backend, and Python-based YOLOv8 detection pipeline using PyTorch and OpenCV for real-time image analysis.**

---

## 🎯 Project Overview

Achieved real-time object detection on images using the advanced YOLOv8 model with OpenCV for visualization. The detection logic is handled in Python, the backend is powered by Node.js, and the frontend is built with React for seamless user interaction. This project showcases an end-to-end pipeline for intelligent visual understanding.

---

## 🔗 Live Demo

- 🌐 Frontend: [[https://your-frontend-site.com](https://image-object-detection-using-yolov8.vercel.app/)]([https://your-frontend-site.com](https://image-object-detection-using-yolov8.vercel.app/))  
- 🔧 Backend API: [[https://your-backend-api.com](https://huggingface.co/spaces/shkumar156/Backend-Object-Detection)]([https://your-backend-api.com](https://huggingface.co/spaces/shkumar156/Backend-Object-Detection))

---

## 🚀 Features

- **YOLOv8 Integration**: Uses the Ultralytics `yolov8` Python package to load pretrained models (`yolov8n`, `yolov8s`, etc.).
- **Image Detection**: Supports uploading and processing of images with bounding boxes, labels, and confidence scores.
- **React Frontend**: Allows users to upload images and view results in a clean, responsive UI.
- **Node.js Backend**: Bridges the frontend and the Python detection script, handling requests and responses.
- **Confidence Threshold Control**: Easily configure detection confidence to reduce false positives.
- **Modular & Extensible Codebase**: Easily integrate batch detection, webcam feeds, or video stream analysis.

---

## 🔧 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/shkumar156/Image-Object-Detection-Using-Yolov8.git
cd Image-Object-Detection-Using-Yolov8
```

---

### 2. Install Python Dependencies (YOLOv8)

Make sure Python 3.8+ is installed.

```bash
pip install -r requirements.txt
```

> Ensure `ultralytics`, `opencv-python`, and other necessary packages are included in `requirements.txt`.

---

### 3. Install Node.js Dependencies (Frontend & Backend)

#### Frontend (React)

```bash
cd client
npm install
```

#### Backend (Node.js)

```bash
cd ../server
npm install
```

---

### 4. Run the Detection Script (Python)

You can test detection independently using:

```bash
python detect.py --source your_image.jpg
```

---

### 5. Run the Full-Stack Application

```bash
# Terminal 1: React frontend
cd client
npm start

# Terminal 2: Node.js backend
cd server
node index.js
```

---

## 🧠 How It Works

1. **Frontend**: User uploads an image via the React app.
2. **Backend**: Node.js receives the image and passes it to the Python script.
3. **Detection**: YOLOv8 processes the image, detects objects, and returns the results.
4. **Display**: The frontend renders the image with bounding boxes and labels.

---

## 🛠️ Customization

- Switch between YOLOv8 variants (`n`, `s`, `m`, `l`, `x`) based on accuracy/speed trade-offs.
- Tune confidence and IoU thresholds in `detect.py`.
- Add support for webcam or video stream input.
- Extend UI for drag-and-drop support or live preview.

---

## 📚 References

- [Ultralytics YOLOv8 GitHub](https://github.com/ultralytics/ultralytics)
- [YOLOv8 Docs](https://docs.ultralytics.com/)
- [OpenCV Python Docs](https://docs.opencv.org/master/d6/d00/tutorial_py_root.html)
- [React Documentation](https://reactjs.org/)
- [Node.js Documentation](https://nodejs.org/en/docs/)

---

## 📩 Contact

For feedback or collaboration, reach out via [LinkedIn](https://www.linkedin.com/in/muhammadumar126) or visit my [portfolio](https://umarsoftwaredev.vercel.app).
