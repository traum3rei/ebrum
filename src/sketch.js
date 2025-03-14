function sketch(p) {
    //let text = "Happy Birthday.\n For you I would do anything.\n I'd burn the world if I had to.\n There is no boundary I wouldn't cross.\n I love you.\n I miss you.\n <3";
    let text = "For you I would do anything.\n I'd burn the world if I had to.\n There is no boundary I wouldn't cross.\n I love you.\n";
    let currentCharacter = 0;
    let count = 0;

    p.setup = function () {
        p.createCanvas(p.windowWidth, p.windowHeight);
    };
    p.draw = function () {
        p.background(0);

        // Text properties
        p.fill(255);
        p.stroke(255);
        p.strokeWeight(2);
        p.textAlign(p.CENTER, p.CENTER); // Center horizontally, align to top vertically
        p.textSize(Math.min(p.width, p.height) / 25); // Responsive text size
        p.textFont('Courier');

        // Display text gradually
        let currentString = text.substring(0, currentCharacter);
        
        // Calculate the y position for vertical centering
        let textHeight = p.textAscent() * 6; // Estimate height for 6 lines of text
        let yOffset = (p.height - textHeight) / 2;
        
        // Draw the text centered horizontally and vertically
        p.text(currentString, p.width / 2, p.height/2);

        // Gradually reveal the text
        if (currentCharacter < text.length) {
            currentCharacter += p.random(0.05, 0.15);
        } else {
            count++;
            if (count === 150) {
                count = 0;
                currentCharacter = 0; // Reset after delay
            }
        }
    };

    // Adjust canvas on window resize
    p.windowResized = function () {
        p.resizeCanvas(p.windowWidth, p.windowHeight);
    };
}

export default sketch;