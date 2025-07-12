---
title: YOLOv5 Fullstack Backend
emoji: 🚀
colorFrom: blue
colorTo: indigo
sdk: docker
pinned: false
---

# Fullstack YOLOv5 Backend for Hugging Face Spaces

This backend combines Node.js (Express) and Python (YOLOv5 FastAPI) for object detection, ready to deploy on Hugging Face Spaces using Docker.

## Files
- `server.js`: Node.js backend
- `detect.py`, `yolov5s.pt`: Python detection logic and model weights
- `requirements.txt`: Python dependencies
- `package.json`: Node.js dependencies
- `Dockerfile`: Multi-runtime deployment

## Deployment
1. Upload all files to your Hugging Face Space (Docker > Blank template).
2. The backend will be available at `https://your-space-name.hf.space`.

## Notes
- The backend listens on port 7860 (required by Hugging Face Spaces).
- Make sure your frontend points to this backend for API calls. 