function sketchTwo(p) {
    let particles = [];
    let numParticles = 30;
    let maxTextSize = 200;
    let depthLayers = 5; // Number of layers for 3D effect
    let centerX, centerY; // Variables for the center position
    let radiusX, radiusY; // Variables for orbit radii
    let textSize;
    let maxSizeTrail = 10;
    let sizeTrail;
    let maxBallSize = 12;
    let minBallSize = 8;
    let ballSize;

    p.setup = function () {
        p.createCanvas(p.windowWidth, p.windowHeight);
        // Set initial center of particles (always the center of the canvas)
        textSize = Math.round(maxTextSize/1549 * p.windowWidth);
        console.log(textSize)
        sizeTrail = Math.round(maxSizeTrail/1549 * p.windowWidth)
        centerX = p.width / 2;
        centerY = p.height / 2;
        radiusX = textSize * 2.2 + p.random(-20, 20); // Horizontal radius with random offset
        radiusY = textSize * 0.3 + p.random(-5, 5); // Vertical radius with random offset
        
        p.textAlign(p.CENTER, p.CENTER);
        p.textFont('Courier');
        
        // Initialize particles in a tilted, elliptical orbit with unique offsets
        particles = [];
        for (let i = 0; i < numParticles; i++) {
            let angle = p.random(p.TWO_PI);
            let z = p.random(-1, 1); // Depth offset for 3D effect
            particles.push(new Particle(centerX, centerY, radiusX, radiusY, angle, z));
        }
    };

    p.draw = function () {
        p.background(255, 50); // Semi-transparent background for trails

        textSize = Math.round(maxTextSize/1549 * p.width);
        // Update center position if window is resized
        centerX = p.width / 2;
        centerY = p.height / 2;
        radiusX = textSize * 2.2 + p.random(-20, 20); // Update horizontal radius based on window size
        radiusY = textSize * 0.3 + p.random(-5, 5); // Update vertical radius based on window size

        // Update and display particles
        for (let particle of particles) {
            particle.update();
            particle.show();
        }

        // Draw "EBRU" in a cyberpunk neon style
        drawCyberpunkText("EBRU", centerX, centerY, textSize, depthLayers);
    };

    p.windowResized = function () {
        p.resizeCanvas(p.windowWidth, p.windowHeight);
        centerX = p.width / 2; // Update centerX on resize
        centerY = p.height / 2; // Update centerY on resize
        radiusX = textSize * 2.2 + p.random(-20, 20); // Update radiusX when resized
        radiusY = textSize * 0.3 + p.random(-5, 5); // Update radiusY when resized

        // Reinitialize particles after resize
        particles = [];
        for (let i = 0; i < numParticles; i++) {
            let angle = p.random(p.TWO_PI);
            let z = p.random(-1, 1); // Depth offset for 3D effect
            particles.push(new Particle(centerX, centerY, radiusX, radiusY, angle, z));
        }
    };

    function drawCyberpunkText(text, x, y, size, layers) {
        for (let i = layers; i > 0; i--) {
            // Calculate color gradient between baby blue and pink
            let lerpedColor = p.lerpColor(p.color(173, 216, 230), p.color(255, 105, 180), i / layers);
            p.fill(lerpedColor);
            
            // Slightly adjust each layer's offset for depth effect
            let offset = i * 1.5;
            p.textSize(size);
            p.text(text, x - offset, y - offset);
        }

        // Draw the top layer with a strong neon effect
        p.fill(255, 105, 180); // Pink neon color
        p.text(text, x, y);
    }

    class Particle {
        constructor(centerX, centerY, radiusX, radiusY, angle, z) {
            this.centerX = centerX;
            this.centerY = centerY;
            this.radiusX = radiusX;
            this.radiusY = radiusY;
            this.angle = angle;
            this.z = z;
            this.speed = p.random(0.015, 0.025); // Slightly varied speed
            this.trail = []; // Store positions for the light trail effect
            this.color = p.random() < 0.5 ? p.color(173, 216, 230) : p.color(255, 105, 180); // Randomize particle color (baby blue or pink)
        }

        update() {
            this.angle += this.speed;

            // Calculate position along an ellipse for a tilted orbit
            this.x = this.centerX + this.radiusX * p.cos(this.angle);
            this.y = this.centerY + this.radiusY * p.sin(this.angle);

            // Save position to the trail
            this.trail.push({ x: this.x, y: this.y, alpha: 255 });
            if (this.trail.length > 20) { // Increase trail length
                this.trail.shift(); // Remove oldest position to keep trail length
            }

            // Update z-axis for a 3D-like effect
            this.z = p.sin(this.angle); // z changes as particles move in orbit
        }

   

        show() {
            // Sort particles by depth so those behind are drawn first
            particles.sort((a, b) => a.z - b.z);

            // Draw the particle trail
            for (let i = 0; i < this.trail.length; i++) {
                let pos = this.trail[i];
                p.noStroke();
                p.fill(this.color.levels[0], this.color.levels[1], this.color.levels[2], pos.alpha / (i + 1)); // Fading effect in trail
                p.ellipse(pos.x, pos.y, sizeTrail, sizeTrail); // Increase trail size for visibility
                pos.alpha -= 20; // Gradually fade out
            }

            // Draw particle based on depth, with larger size
            let brightness = p.map(this.z, -1, 1, 150, 255);
            let tempSize = p.map(this.z, -1, 1, 8, 12); // Increase size range
            let size = p.map(p.windowWidth, 500, 1549, 3, 12)
            p.fill(this.color.levels[0], this.color.levels[1], this.color.levels[2], brightness);
            p.ellipse(this.x, this.y, ballSize, ballSize);
        }
    }
}

export default sketchTwo;
