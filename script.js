function toggleText(element) {
    element.classList.toggle("active");
}

const canvas = document.getElementById("stitchCanvas");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight * 1;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

let lastX = null;
let lastY = null;
let lastTime = 0;
const stitchInterval = 10;
const stitchSpacing = 20;
const stitches = [];
const fadeDuration = 5000;

function drawStitch(x, y) {
    if (lastX !== null && lastY !== null) {
        const angle = Math.atan2(y - lastY, x - lastX);
        const endX = lastX + Math.cos(angle) * stitchSpacing;
        const endY = lastY + Math.sin(angle) * stitchSpacing;
        
        stitches.push({ x: lastX, y: lastY, angle, createdAt: Date.now() });
        
        lastX = endX;
        lastY = endY;
    } else {
        lastX = x;
        lastY = y;
    }
}

function drawStitches() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const currentTime = Date.now();
    
    for (let i = stitches.length - 1; i >= 0; i--) {
        const stitch = stitches[i];
        const age = currentTime - stitch.createdAt;
        if (age < fadeDuration) {
            const alpha = 1 - age / fadeDuration;
            ctx.save();
            ctx.translate(stitch.x, stitch.y - window.scrollY);
            ctx.rotate(stitch.angle);
            ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
            ctx.strokeStyle = `rgba(0, 0, 0, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.fillRect(0, -1.5, 10, 3);
            ctx.strokeRect(0, -1.5, 10, 3);
            ctx.restore();
        } else {
            stitches.splice(i, 1);
        }
    }
    requestAnimationFrame(drawStitches);
}

drawStitches();

document.addEventListener("mousemove", (e) => {
    const currentTime = Date.now();
    if (currentTime - lastTime > stitchInterval) {
        drawStitch(e.clientX, e.clientY + window.scrollY);
        lastTime = currentTime;
    }
});