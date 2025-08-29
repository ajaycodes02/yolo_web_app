YOLO Object Detection Web App

A real-time object detection web application using YOLO, enhanced with interactive animations powered by Vanta.js and GSAP. This project captures webcam video, sends frames to a backend for YOLO-based object detection, and displays results with animated bounding boxes and status updates.

Features





Real-Time Detection: Streams webcam video and processes frames for object detection using YOLO.



Interactive UI: Animated interface with Vanta.js for a dynamic background and GSAP for smooth element transitions.



Responsive Design: Optimized for various screen sizes with a clean, modern look.



Start/Stop Detection: Toggle detection with an animated button and real-time status updates.

Prerequisites





Node.js: For managing JavaScript dependencies.



Python (optional): For a backend server (e.g., Flask) to handle YOLO detection.



Web Browser: Modern browser supporting WebRTC (e.g., Chrome, Firefox).

Installation





Clone the Repository:

git clone https://github.com/your-username/yolo-object-detection-webapp.git
cd yolo-object-detection-webapp



Install Frontend Dependencies:

npm init -y
npm install three vanta gsap



Install Backend Dependencies (if using a Python backend with YOLO):

pip install opencv-python yolov5 flask



Serve the Application:





For static files, install and run a local server:

npm install -g http-server
http-server



For a Python backend (e.g., Flask), run:

python server.py

Usage





Open the app in a browser (e.g., http://localhost:8080 if using http-server).



Allow webcam access when prompted.



Click the Start Detection button to begin real-time object detection.



View detected objects with animated bounding boxes and confidence scores.



Click Stop Detection to pause processing.

Project Structure

yolo-object-detection-webapp/
├── static/
│   ├── css/
│   │   └── style.css       # Styles with responsive design
│   └── js/
│       └── script.js       # Frontend logic with Vanta.js and GSAP
├── index.html              # Main HTML file
├── server.py               # Backend server (if using Flask)
├── README.md               # This file
└── package.json            # Node.js dependencies

Dependencies





Frontend:





Three.js: For Vanta.js rendering.



Vanta.js: For animated background effects.



GSAP: For smooth UI animations.



Backend (optional):





YOLOv5: For object detection.



OpenCV: For image processing.



Flask: For serving the detection endpoint.

Configuration





Frame Size: Adjust {{ config.frame_width }} and {{ config.frame_height }} in index.html to match your webcam resolution.



Detection Interval: Modify the setInterval delay in script.js (default: 500ms) for faster/slower processing.



Vanta.js Settings: Customize colors, points, and spacing in script.js for different background effects.

Contributing





Fork the repository.



Create a feature branch (git checkout -b feature/your-feature).



Commit changes (git commit -m "Add your feature").



Push to the branch (git push origin feature/your-feature).



Open a pull request.

License

This project is licensed under the MIT License.
