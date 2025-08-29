from flask import Flask, request, jsonify, render_template
from ultralytics import YOLO
import cv2
import numpy as np
import base64
import io
from PIL import Image
import json

import os
config_path = os.path.join(os.path.dirname(__file__), '..', 'config.json')

with open('config.json', 'r') as f:
    config = json.load(f)

app = Flask(__name__)

# Load configuration
with open('config.json', 'r') as f:
    config = json.load(f)

# Load YOLOv8 model
model = YOLO("yolov8n.pt")

@app.route('/')
def index():
    return render_template('index.html', config=config)

@app.route('/detect', methods=['POST'])
def detect():
    data = request.json
    if not data or 'image' not in data:
        return jsonify({'error': 'No image provided'}), 400

    try:
        # Decode base64 image
        img_data = base64.b64decode(data['image'])
        img = Image.open(io.BytesIO(img_data))
        img = cv2.cvtColor(np.array(img), cv2.COLOR_RGB2BGR)

        # Run YOLO detection
        results = model(img, verbose=False)
        detections = []
        detected = False
        for result in results:
            boxes = result.boxes
            for box in boxes:
                x1, y1, x2, y2 = map(int, box.xyxy[0])
                conf = float(box.conf[0])
                cls = int(box.cls[0])
                label = model.names[cls]
                detections.append({
                    'x1': x1, 'y1': y1, 'x2': x2, 'y2': y2,
                    'conf': conf, 'label': label
                })
                detected = True

        status = "Objects Detected" if detected else "Normal"
        return jsonify({'detections': detections, 'status': status})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)