# Object Detection App

A full-stack web application for object detection using YOLOv5, built with React (frontend) and Express.js (backend).


# Backend development
npm run dev

# Frontend development
cd frontend
npm start


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

 
![Screenshot 2025-06-30 103031](https://github.com/user-attachments/assets/78d4292f-5bc4-4bcd-994f-f1e03f17d064)

![Screenshot 2025-06-30 103044](https://github.com/user-attachments/assets/787fecfd-36ea-4479-a8b4-23e2cbb0ba5d)
