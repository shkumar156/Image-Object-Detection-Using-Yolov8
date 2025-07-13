import React, { useState, useRef } from 'react';
import axios from 'axios';
import './App.css';

// Use environment variable for API base URL, fallback to correct Hugging Face Space URL (no port)
const API_BASE_URL = process.env.REACT_APP_BACKEND_URL || 'https://shkumar156-backend-object-detection.hf.space';

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [detectionResult, setDetectionResult] = useState(null);
  const [error, setError] = useState(null);
  const [fullscreenImg, setFullscreenImg] = useState(null);
  const fileInputRef = useRef();

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setDetectionResult(null);
      setError(null);
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setDetectionResult(null);
      setError(null);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDetect = async () => {
    if (!selectedFile) {
      setError('Please select an image first');
      return;
    }

    setIsLoading(true);
    setError(null);
    setDetectionResult(null);

    const formData = new FormData();
    formData.append('image', selectedFile);

    try {
      const response = await axios.post(`${API_BASE_URL}/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.success) {
        setDetectionResult({
          originalImage: `${API_BASE_URL}${response.data.originalImage}`,
          detectedImage: `${API_BASE_URL}${response.data.detectedImage}`,
          message: response.data.message
        });
      } else {
        setError(response.data.error || 'Detection failed');
      }
    } catch (error) {
      setError(error.response?.data?.error || 'Failed to connect to server');
    } finally {
      setIsLoading(false);
    }
  };

  const resetApp = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setDetectionResult(null);
    setError(null);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
  };

  // Fullscreen modal handlers
  const openFullscreen = (imgUrl) => setFullscreenImg(imgUrl);
  const closeFullscreen = () => setFullscreenImg(null);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Object Detection</h1>
      </header>
      <main className="App-main">
        <div className="card-container">
          {/* Upload/Preview Card */}
          <div className="card">
            <div className="card-title">source_img</div>
            <div
              className="drop-area"
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onClick={() => fileInputRef.current.click()}
            >
              {previewUrl ? (
                <img src={previewUrl} alt="Preview" className="preview-image" />
              ) : (
                <>
                  <div className="upload-icon">📁</div>
                  <div className="upload-text">Drop Image Here</div>
                  <div className="upload-subtext">or click to browse files</div>
                </>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                ref={fileInputRef}
                style={{display:'none'}}
              />
            </div>
            <div className="button-row">
              <button
                onClick={resetApp}
                className="reset-button"
                disabled={!selectedFile && !previewUrl}
              >
                Clear
              </button>
              <button
                onClick={handleDetect}
                className="detect-button"
                disabled={!selectedFile || isLoading}
              >
                {isLoading ? 'Submitting...' : 'Submit'}
              </button>
            </div>
            {error && <div className="error-message">{error}</div>}
          </div>

          {/* Detection Result Card */}
          <div className="card">
            <div className="card-title">Image with detected objects</div>
            {isLoading ? (
              <div className="centered-content loading-container">
                <div className="loading-spinner"></div>
                <div>Detecting objects...</div>
              </div>
            ) : detectionResult && detectionResult.detectedImage ? (
              <div className="centered-content">
                <img
                  src={detectionResult.detectedImage}
                  alt="Detected"
                  className="result-image"
                  onClick={() => openFullscreen(detectionResult.detectedImage)}
                />
              </div>
            ) : (
              <div className="centered-content empty-state">
                <div className="empty-icon">🔍</div>
                <div className="empty-text">No result yet</div>
              </div>
            )}
            {detectionResult && detectionResult.message && (
              <div className="success-message">{detectionResult.message}</div>
            )}
          </div>
        </div>

        {/* Fullscreen Modal */}
        {fullscreenImg && (
          <div className="fullscreen-modal" onClick={closeFullscreen}>
            <span className="fullscreen-close" onClick={closeFullscreen}>&times;</span>
            <img src={fullscreenImg} alt="Full Result" className="fullscreen-img" onClick={e => e.stopPropagation()} />
          </div>
        )}
      </main>
      <footer className="App-footer">
        All rights reserved to @Muhammad Umar | 
        <a href="https://github.com/shkumar156" target="_blank" rel="noopener noreferrer">github.com/shkumar156</a>
      </footer>
    </div>
  );
}

export default App;
