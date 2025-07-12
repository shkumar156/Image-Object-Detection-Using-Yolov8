# Use official Python image as base
FROM python:3.11-slim

# Set working directory
WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    python3-opencv \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Install Node.js (for backend server)
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash - && \
    apt-get install -y nodejs

# Copy Python requirements and install
COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the backend code
COPY . .

# Install Node.js dependencies
RUN npm install

# Expose the backend port
EXPOSE 5000

# Start the backend server
CMD ["node", "server.js"] 