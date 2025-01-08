"use strict";
function createPyramid(height, offset) {
    let pyramid = '';
    for (let i = 1; i <= height; i++) {
        pyramid += ' '.repeat(offset) + ' '.repeat(height - i) + '*'.repeat(2 * i - 1) + '\n';
    }
    return pyramid;
}
function animatePyramid(height, delay) {
    let offset = 0;
    let direction = 1; // 1 for right, -1 for left
    const animate = () => {
        console.clear(); // Clear the console
        console.log(createPyramid(height, offset)); // Draw the pyramid
        offset += direction;
        // Reverse direction if the pyramid reaches the edge
        if (offset >= 10 || offset <= 0) {
            direction *= -1;
        }
        // Schedule the next frame
        setTimeout(animate, delay);
    };
    // Start the animation
    animate();
}
// Call the animatePyramid function directly (no need for console.log)
animatePyramid(8, 200);
