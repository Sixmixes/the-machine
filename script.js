document.addEventListener('DOMContentLoaded', () => {
    
    // --- EFFECT 1: DATA STREAM CANVAS (Square Particles) ---
    const canvas = document.getElementById('bgCanvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let width, height, particles = [];

        const initCanvas = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
            particles = Array.from({ length: 50 }, () => ({
                x: Math.random() * width,
                y: Math.random() * height,
                size: Math.random() * 4 + 1,
                speed: Math.random() * -1 - 0.5,
                color: ['#00f2ff', '#bc13fe', '#ff003c'][Math.floor(Math.random() * 3)]
            }));
        };

        const animateCanvas = () => {
            ctx.clearRect(0, 0, width, height);
            particles.forEach(p => {
                p.y += p.speed;
                if (p.y < 0) p.y = height + p.size;
                ctx.fillStyle = p.color;
                ctx.globalAlpha = 0.4;
                ctx.fillRect(p.x, p.y, p.size, p.size); 
            });
            requestAnimationFrame(animateCanvas);
        };

        window.addEventListener('resize', initCanvas);
        initCanvas();
        animateCanvas();
    }

    // --- EFFECT 2: THE CIPHER (FIXED) ---
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_#@";
    
    // Only target elements that explicitly have a data-value
    const targets = document.querySelectorAll("[data-value]");
    
    targets.forEach(element => {
        element.onmouseover = event => {
            // Stop any running animation on this element to prevent glitch buildup
            if (element.dataset.interval) {
                clearInterval(parseInt(element.dataset.interval));
            }

            let iterations = 0;
            const originalText = element.dataset.value;
            
            const interval = setInterval(() => {
                element.innerText = originalText
                    .split("")
                    .map((letter, index) => {
                        if(index < iterations) {
                            return originalText[index];
                        }
                        return letters[Math.floor(Math.random() * letters.length)];
                    })
                    .join("");
                
                if(iterations >= originalText.length) { 
                    clearInterval(interval);
                }
                
                iterations += 1 / 3; 
            }, 30);

            // Store interval ID so we can clear it on next hover
            element.dataset.interval = interval;
        }
    });
});