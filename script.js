/**
 * SpaceJamz Warp Drive Animation
 * Captivates the viewer with a looping starfield effect
 */
const canvas = document.getElementById('warpCanvas');
const ctx = canvas.getContext('2d');

let width, height, stars = [];
const STAR_COUNT = 400;
const SPEED = 2;

// Resize handler
function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
}

window.addEventListener('resize', resize);
resize();

// Star Object
class Star {
    constructor() {
        this.reset();
    }

    reset() {
        this.x = (Math.random() - 0.5) * width;
        this.y = (Math.random() - 0.5) * height;
        this.z = Math.random() * width;
        this.prevZ = this.z;
    }

    update() {
        this.prevZ = this.z;
        this.z -= SPEED;
        if (this.z <= 0) this.reset();
    }

    draw() {
        const x = (this.x / this.z) * (width / 2) + width / 2;
        const y = (this.y / this.z) * (height / 2) + height / 2;
        
        const px = (this.x / this.prevZ) * (width / 2) + width / 2;
        const py = (this.y / this.prevZ) * (height / 2) + height / 2;

        ctx.beginPath();
        ctx.strokeStyle = `rgba(0, 242, 255, ${1 - this.z / width})`;
        ctx.lineWidth = 2;
        ctx.moveTo(px, py);
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}

// Initialize
for (let i = 0; i < STAR_COUNT; i++) stars.push(new Star());

function animate() {
    ctx.fillStyle = '#050505'; // Match body background
    ctx.fillRect(0, 0, width, height);
    
    stars.forEach(star => {
        star.update();
        star.draw();
    });
    
    requestAnimationFrame(animate);
}

animate();
