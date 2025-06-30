# Object Detection App

A full-stack web application for object detection using YOLOv5, built with React (frontend) and Express.js (backend).

## 🚀 Features

- **Modern UI**: Beautiful, responsive React frontend with smooth animations
- **File Upload**: Drag-and-drop or click-to-upload image functionality
- **Real-time Preview**: See your uploaded image before detection
- **YOLOv5 Integration**: Powerful object detection using YOLOv5 model
- **Side-by-side Comparison**: View original and detected images together
- **Error Handling**: Comprehensive error handling and user feedback

## 🚀 Quick Start for GitHub & Vercel

### 1. Initialize Git and Push to GitHub

```bash
cd object-detection-app
# Initialize git if not already
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git push -u origin main
```

### 2. Deploy Frontend to Vercel
- Go to [vercel.com](https://vercel.com/)
- Import your GitHub repo
- Set the project root to `object-detection-app/frontend`
- Set build command: `npm run build`
- Set output directory: `build`
- Deploy!

### 3. Backend Deployment
- Vercel is for frontend only. For backend (Express + YOLOv5), use [Render](https://render.com/), [Railway](https://railway.app/), or your own VPS.
- Make sure to update the frontend API URL to point to your backend deployment (use `.env` in frontend).

## 📁 Project Structure

```
object-detection-app/
├── frontend/                 # React frontend application
│   ├── src/
│   │   ├── App.js           # Main React component
│   │   ├── App.css          # Styling for the app
│   │   └── index.js         # React entry point
│   ├── package.json         # Frontend dependencies
│   └── public/              # Static files
├── server.js                # Express.js backend server
├── package.json             # Backend dependencies
├── uploads/                 # Temporary uploaded images (auto-created)
└── README.md               # This file
```

## 🛠️ Prerequisites

Before running this application, make sure you have:

1. **Node.js** (v14 or higher)
2. **Python** (v3.7 or higher)
3. **YOLOv5** already set up in the parent directory
4. **YOLOv5 weights** (`yolov5s.pt`) in the parent directory

## 📦 Installation

### 1. Clone and Setup

The application is already set up in the `object-detection-app` directory. Make sure you're in the correct directory:

```bash
cd object-detection-app
```

### 2. Install Backend Dependencies

```bash
npm install
```

### 3. Install Frontend Dependencies

```bash
cd frontend
npm install
cd ..
```

## 🚀 Running the Application

### 1. Start the Backend Server

In the `object-detection-app` directory:

```bash
npm start
```

The backend will start on `http://localhost:5000`

### 2. Start the Frontend Development Server

In a new terminal, navigate to the frontend directory:

```bash
cd frontend
npm start
```

The frontend will start on `http://localhost:3000`

### 3. Access the Application

Open your browser and go to `http://localhost:3000`

## 🎯 How to Use

1. **Upload Image**: Click "Choose an image file" or drag and drop an image
2. **Preview**: See your uploaded image in the preview section
3. **Detect**: Click the "Detect Objects" button to run YOLOv5 detection
4. **View Results**: Compare the original and detected images side by side
5. **Reset**: Use the "Reset" button to start over with a new image

## 🔧 Technical Details

### Backend (Express.js)

- **Port**: 5000
- **File Upload**: Uses Multer for handling multipart/form-data
- **CORS**: Enabled for cross-origin requests
- **Static Files**: Serves uploaded and detected images
- **YOLOv5 Integration**: Uses child_process to run Python detection script

### Frontend (React)

- **Port**: 3000
- **State Management**: Uses React hooks (useState, useEffect)
- **HTTP Client**: Axios for API communication
- **Styling**: Modern CSS with responsive design
- **File Handling**: FormData for image uploads

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

## 🎨 Features

### UI/UX Features
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Loading States**: Visual feedback during detection
- **Error Handling**: Clear error messages for users
- **Smooth Animations**: Hover effects and transitions
- **Modern Design**: Glassmorphism and gradient backgrounds

### Technical Features
- **File Validation**: Only accepts image files
- **File Size Limit**: 10MB maximum file size
- **Automatic Cleanup**: Temporary files are managed properly
- **Cross-Origin Support**: CORS enabled for development
- **Error Recovery**: Graceful handling of detection failures

## 🔍 Troubleshooting

### Common Issues

1. **"Failed to start YOLOv5 process"**
   - Ensure Python is installed and accessible
   - Check that YOLOv5 is properly set up in the parent directory
   - Verify that `yolov5s.pt` weights file exists

2. **"Detection completed but result image not found"**
   - Check that the `runs/detect/exp` directory exists
   - Ensure YOLOv5 has write permissions to the runs directory

3. **"Failed to connect to server"**
   - Make sure the backend is running on port 5000
   - Check that CORS is properly configured
   - Verify the API_BASE_URL in the frontend

4. **"File too large"**
   - Reduce image size (maximum 10MB)
   - Compress the image before uploading

### Development Commands

```bash
# Backend development with auto-restart
npm run dev

# Frontend development
cd frontend
npm start

# Build frontend for production
cd frontend
npm run build
```

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

## 📞 Support

If you encounter any issues, please check the troubleshooting section above or create an issue in the repository. 