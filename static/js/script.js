const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const status = document.getElementById('status');
const startBtn = document.getElementById('startBtn');
let detecting = false;
let intervalId;

// Access webcam
async function setupWebcam() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        video.srcObject = stream;
    } catch (err) {
        console.error('Error accessing webcam:', err);
        status.textContent = 'Error: Webcam access denied';
    }
}

// Capture frame and send to server
async function detectObjects() {
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const imageData = canvas.toDataURL('image/jpeg').split(',')[1];

    try {
        const response = await fetch('/detect', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ image: imageData })
        });
        const data = await response.json();

        if (data.error) {
            status.textContent = `Error: ${data.error}`;
            return;
        }

        // Clear previous drawings
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

        // Draw detections
        data.detections.forEach(det => {
            ctx.strokeStyle = 'green';
            ctx.lineWidth = 2;
            ctx.strokeRect(det.x1, det.y1, det.x2 - det.x1, det.y2 - det.y1);
            ctx.fillStyle = 'red';
            ctx.font = '16px Arial';
            ctx.fillText(`${det.label} (${det.conf.toFixed(2)})`, det.x1, det.y1 - 5);
        });

        // Update status
        status.textContent = data.status;
    } catch (err) {
        console.error('Detection error:', err);
        status.textContent = 'Error: Detection failed';
    }
}

// Start/Stop detection
startBtn.addEventListener('click', () => {
    if (!detecting) {
        detecting = true;
        startBtn.textContent = 'Stop Detection';
        intervalId = setInterval(detectObjects, 500); // Adjust interval from config if needed
    } else {
        detecting = false;
        startBtn.textContent = 'Start Detection';
        clearInterval(intervalId);
        status.textContent = 'Status: Normal';
    }
});

// Initialize webcam
setupWebcam();