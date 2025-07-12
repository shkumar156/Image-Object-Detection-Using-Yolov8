# Use official Python image as base
FROM python:3.11-slim

# Set working directory
WORKDIR /app

# Install system dependencies (including libgl1 for OpenCV and Node.js)
RUN apt-get update && apt-get install -y \
    git \
    curl \
    libgl1 \
    && curl -fsSL https://deb.nodesource.com/setup_18.x | bash - \
    && apt-get install -y nodejs \
    && rm -rf /var/lib/apt/lists/*

# Install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Install Node.js dependencies
COPY package*.json ./
RUN npm install --omit=dev

# Copy the rest of your backend code
COPY . .

# Expose the port your Node.js server runs on (Hugging Face expects 7860)
EXPOSE 7860

# Start the Node.js backend
CMD ["node", "server.js"] 