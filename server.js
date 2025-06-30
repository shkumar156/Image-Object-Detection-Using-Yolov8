const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const { spawn } = require('child_process');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('uploads'));
app.use('/detected', express.static(path.join(__dirname, '../runs/detect')));

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = 'uploads';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  fileFilter: function (req, file, cb) {
    // Accept only image files
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'), false);
    }
  },
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  }
});

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Object Detection API is running!' });
});

// Test endpoint to check if detected images are accessible
app.get('/test-detected', (req, res) => {
  const expDir = path.join(__dirname, '../runs/detect/exp');
  try {
    if (fs.existsSync(expDir)) {
      const files = fs.readdirSync(expDir);
      const imageFiles = files.filter(file => /\.(jpg|jpeg|png)$/i.test(file));
      res.json({
        expDir,
        totalFiles: files.length,
        imageFiles: imageFiles,
        staticPath: '/detected/exp/'
      });
    } else {
      res.json({ error: 'Exp directory does not exist', expDir });
    }
  } catch (error) {
    res.json({ error: error.message, expDir });
  }
});

app.post('/upload', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image file uploaded' });
    }

    const uploadedImagePath = req.file.path;
    console.log('Image uploaded:', uploadedImagePath);

    // Run YOLOv5 detection
    const detectionResult = await runYOLOv5Detection(uploadedImagePath);
    
    if (detectionResult.success) {
      res.json({
        success: true,
        originalImage: `/uploads/${path.basename(uploadedImagePath)}`,
        detectedImage: detectionResult.detectedImagePath,
        message: 'Object detection completed successfully'
      });
    } else {
      res.status(500).json({
        success: false,
        error: detectionResult.error
      });
    }

  } catch (error) {
    console.error('Error processing upload:', error);
    res.status(500).json({
      success: false,
      error: 'Error processing image upload'
    });
  }
});

// Function to run YOLOv5 detection
async function runYOLOv5Detection(imagePath) {
  return new Promise((resolve) => {
    const yolov5Path = path.join(__dirname, '../detect.py');
    const weightsPath = path.join(__dirname, '../yolov5s.pt');
    
    console.log('Running YOLOv5 detection...');
    console.log('Image path:', imagePath);
    console.log('YOLOv5 script path:', yolov5Path);
    console.log('Weights path:', weightsPath);

    const pythonProcess = spawn('python', [
      yolov5Path,
      '--weights', weightsPath,
      '--source', imagePath,
      '--project', path.join(__dirname, '../runs/detect'),
      '--name', 'exp',
      '--exist-ok'
    ]);

    let stdout = '';
    let stderr = '';

    pythonProcess.stdout.on('data', (data) => {
      stdout += data.toString();
      console.log('YOLOv5 output:', data.toString());
    });

    pythonProcess.stderr.on('data', (data) => {
      stderr += data.toString();
      console.error('YOLOv5 error:', data.toString());
    });

    pythonProcess.on('close', (code) => {
      console.log('YOLOv5 process exited with code:', code);
      
      if (code === 0) {
        // Find the detected image in the runs/detect/exp directory
        const expDir = path.join(__dirname, '../runs/detect/exp');
        const detectedImagePath = findDetectedImage(expDir, path.basename(imagePath));
        
        if (detectedImagePath) {
          // Get just the filename for the URL
          const detectedImageFilename = path.basename(detectedImagePath);
          console.log('Detected image filename:', detectedImageFilename);
          
          resolve({
            success: true,
            detectedImagePath: `/detected/exp/${detectedImageFilename}`
          });
        } else {
          resolve({
            success: false,
            error: 'Detection completed but result image not found'
          });
        }
      } else {
        resolve({
          success: false,
          error: `YOLOv5 detection failed with code ${code}: ${stderr}`
        });
      }
    });

    pythonProcess.on('error', (error) => {
      console.error('Failed to start YOLOv5 process:', error);
      resolve({
        success: false,
        error: `Failed to start YOLOv5 process: ${error.message}`
      });
    });
  });
}

// Function to find the detected image
function findDetectedImage(expDir, originalImageName) {
  try {
    if (!fs.existsSync(expDir)) {
      console.log('Exp directory does not exist:', expDir);
      return null;
    }

    const files = fs.readdirSync(expDir);
    console.log('Files in exp directory:', files);

    // Look for image files (jpg, jpeg, png)
    const imageFiles = files.filter(file => /\.(jpg|jpeg|png)$/i.test(file));

    // Try to find the detected image with the same name as the uploaded file
    const detectedFile = imageFiles.find(file => file === originalImageName);
    if (detectedFile) {
      const detectedImagePath = path.join(expDir, detectedFile);
      console.log('Found detected image:', detectedImagePath);
      return detectedImagePath;
    }

    // Fallback: return the first image if not found (optional)
    if (imageFiles.length > 0) {
      const detectedImagePath = path.join(expDir, imageFiles[0]);
      console.log('Fallback detected image:', detectedImagePath);
      return detectedImagePath;
    }

    return null;
  } catch (error) {
    console.error('Error finding detected image:', error);
    return null;
  }
}

// Error handling middleware
app.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ error: 'File too large. Maximum size is 10MB.' });
    }
  }
  console.error('Server error:', error);
  res.status(500).json({ error: 'Internal server error' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Upload directory: ${path.join(__dirname, 'uploads')}`);
  console.log(`Detected images served from: ${path.join(__dirname, '../runs/detect')}`);
  console.log(`Static file serving configured for /detected -> ${path.join(__dirname, '../runs/detect')}`);
}); 