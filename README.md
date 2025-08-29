# YOLO Object Detection Web App

A real-time object detection web application using **YOLO**, enhanced with interactive animations powered by **Vanta.js** and **GSAP**. This project captures webcam video, sends frames to a backend for YOLO-based object detection, and displays results with animated bounding boxes and status updates.

## 🚀 Features
- **Real-Time Detection**: Streams webcam video and processes frames for object detection using YOLO.  
- **Interactive UI**: Animated interface with Vanta.js for a dynamic background and GSAP for smooth element transitions.  
- **Responsive Design**: Optimized for various screen sizes with a clean, modern look.  
- **Start/Stop Detection**: Toggle detection with an animated button and real-time status updates.  

## 📦 Prerequisites
- **Node.js**: For managing JavaScript dependencies.  
- **Python (optional)**: For a backend server (e.g., Flask) to handle YOLO detection.  
- **Web Browser**: Modern browser supporting WebRTC (e.g., Chrome, Firefox).  

## ⚙️ Installation
### 1. Clone the Repository
```bash
git clone https://github.com/your-username/yolo-object-detection-webapp.git
cd yolo-object-detection-webapp
Install Frontend Dependencies

npm init -y
npm install three vanta gsap

Install Backend Dependencies (Optional: Python + YOLO)

pip install opencv-python yolov5 flask

Serve the Application

npm install -g http-server
http-server

For a Python backend (Flask):

python server.py


Usage

Open the app in a browser (e.g., http://localhost:8080
 if using http-server).

Allow webcam access when prompted.

Click the Start Detection button to begin real-time object detection.

View detected objects with animated bounding boxes and confidence scores.

Click Stop Detection to pause processing.




