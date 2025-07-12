# Object Detection App

A full-stack web application for object detection using YOLOv5, built with React (frontend) and Express.js (backend).

## 📁 Project Structure

```
/
├── backend/                 # Node.js/Express backend
│   ├── server.js           # Main server file
│   ├── package.json        # Backend dependencies
│   └── start-app.*         # Backend start scripts
├── frontend/               # React frontend
│   ├── src/               # React source code
│   ├── public/            # Static assets
│   └── package.json       # Frontend dependencies
├── detect.py              # YOLOv5 detection script
├── yolov5s.pt             # YOLOv5 model weights
├── package.json           # Root package.json with scripts
└── start-app.*            # Root start scripts
```

## 🚀 Quick Start

### Option 1: Using Root Scripts (Recommended)
```bash
# Install all dependencies
npm run install:all

# Start both frontend and backend
npm start

# Or use the start scripts
./start-app.bat    # Windows
./start-app.ps1    # PowerShell
```

### Option 2: Manual Start
```bash
# Backend development
cd backend
npm run dev

# Frontend development (in new terminal)
cd frontend
npm start
```

## 🚀 Features

- **Modern UI**: Beautiful, responsive React frontend with smooth animations
- **File Upload**: Drag-and-drop or click-to-upload image functionality
- **Real-time Preview**: See your uploaded image before detection
- **YOLOv5 Integration**: Powerful object detection using YOLOv5 model
- **Side-by-side Comparison**: View original and detected images together
- **Error Handling**: Comprehensive error handling and user feedback

## 🔧 Technical Details

- **File Upload**: Uses Multer for handling multipart/form-data
- **CORS**: Enabled for cross-origin requests
- **Static Files**: Serves uploaded and detected images
- **YOLOv5 Integration**: Uses child_process to run Python detection script

### Frontend (React)

- **State Management**: Uses React hooks (useState, useEffect)
- **HTTP Client**: Axios for API communication
- **Styling**: Modern CSS with responsive design
- **File Handling**: FormData for image uploads

### Backend (Express.js)

- **File Upload**: Multer middleware for handling image uploads
- **Static Serving**: Serves uploaded images and detection results
- **YOLOv5 Integration**: Spawns Python process for object detection
- **Error Handling**: Comprehensive error handling and validation

### YOLOv5 Integration

The backend runs YOLOv5 detection using:

```bash
python detect.py --weights yolov5s.pt --source <image_path> --project runs/detect --name exp --exist-ok
```

## 📝 API Endpoints

### POST `/upload`
Upload an image for object detection.

**Request:**
- Content-Type: `multipart/form-data`
- Body: `image` field containing the image file

**Response:**
```json
{
  "success": true,
  "originalImage": "/uploads/image-123456789.jpg",
  "detectedImage": "/detected/exp/detected-image.jpg",
  "message": "Object detection completed successfully"
}
```

## 📝 Results
 
![Screenshot 2025-06-30 103031](https://github.com/user-attachments/assets/78d4292f-5bc4-4bcd-994f-f1e03f17d064)

![Screenshot 2025-06-30 103044](https://github.com/user-attachments/assets/787fecfd-36ea-4479-a8b4-23e2cbb0ba5d)

![Screenshot 2025-07-01 080722](https://github.com/user-attachments/assets/f805ef2e-3727-4f61-8d83-dc6c96433db9)

