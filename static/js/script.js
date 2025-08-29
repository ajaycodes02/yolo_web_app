const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const status = document.getElementById('status');
const startBtn = document.getElementById('startBtn');
let detecting = false;
let intervalId;

// Initialize Vanta.js background
VANTA.NET({
    el: "#vanta-background",
    mouseControls: true,
    touchControls: true,
    gyroControls: false,
    minHeight: 200.00,
    minWidth: 200.00,
    scale: 1.00,
    scaleMobile: 1.00,
    color: 0x3fafff,
    backgroundColor: 0xf0f0f0,
    points: 10.00,
    maxDistance: 20.00,
    spacing: 15.00
});

// GSAP animations on load
gsap.from("h1", { opacity: 0, y: -50, duration: 1, ease: "power2.out" });
gsap.from("#video", { opacity: 0, scale: 0.9, duration: 1, delay: 0.5, ease: "power2.out" });
gsap.from("#status", { opacity: 0, y: 20, duration: 1, delay: 1, ease: "power2.out" });
gsap.from("#startBtn", { opacity: 0, y: 20, duration: 1, delay: 1.2, ease: "power2.out" });

// Access webcam
async function setupWebcam() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        video.srcObject = stream;
    } catch (err) {
        console.error('Error accessing webcam:', err);
        status.textContent = 'Error: Webcam access denied';
        gsap.to(status, { color: "#ff0000", duration: 0.5 });
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
            gsap.to(status, { color: "#ff0000", duration: 0.5 });
            return;
        }

        // Clear previous drawings
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

        // Draw detections with animation
        data.detections.forEach((det, index) => {
            // Use GSAP to animate box appearance
            let boxOpacity = { value: 0 };
            gsap.to(boxOpacity, {
                value: 1,
                duration: 0.5,
                delay: index * 0.1,
                onUpdate: () => {
                    ctx.strokeStyle = `rgba(0, 255, 0, ${boxOpacity.value})`;
                    ctx.lineWidth = 2;
                    ctx.strokeRect(det.x1, det.y1, det.x2 - det.x1, det.y2 - det.y1);
                    ctx.fillStyle = `rgba(255, 0, 0, ${boxOpacity.value})`;
                    ctx.font = '16px Arial';
                    ctx.fillText(`${det.label} (${det.conf.toFixed(2)})`, det.x1, det.y1 - 5);
                }
            });
        });

        // Update status with animation
        status.textContent = data.status;
        gsap.to(status, { color: data.detections.length > 0 ? "#ff9900" : "#007bff", duration: 0.5 });
    } catch (err) {
        console.error('Detection error:', err);
        status.textContent = 'Error: Detection failed';
        gsap.to(status, { color: "#ff0000", duration: 0.5 });
    }
}

// Start/Stop detection with button animation
startBtn.addEventListener('click', () => {
    gsap.to(startBtn, { scale: 0.95, duration: 0.1, onComplete: () => gsap.to(startBtn, { scale: 1, duration: 0.1 }) });
    
    if (!detecting) {
        detecting = true;
        startBtn.textContent = 'Stop Detection';
        intervalId = setInterval(detectObjects, 500); // Adjust interval from config if needed
        gsap.to(status, { color: "#28a745", duration: 0.5 });
    } else {
        detecting = false;
        startBtn.textContent = 'Start Detection';
        clearInterval(intervalId);
        status.textContent = 'Status: Normal';
        gsap.to(status, { color: "#007bff", duration: 0.5 });
    }
});

// Button hover animation
startBtn.addEventListener('mouseenter', () => {
    gsap.to(startBtn, { scale: 1.05, duration: 0.3, ease: "power1.out" });
});
startBtn.addEventListener('mouseleave', () => {
    gsap.to(startBtn, { scale: 1, duration: 0.3, ease: "power1.out" });
});

// Initialize webcam
setupWebcam();