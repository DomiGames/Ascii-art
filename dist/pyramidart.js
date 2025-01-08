"use strict";
function createPyramid(height) {
    let pyramid = '';
    for (let i = 1; i <= height; i++) {
        pyramid += ''.repeat(height - i) + '*'.repeat(2 * i - 1) + '\n';
    }
    return pyramid;
}
console.log(createPyramid(5));
