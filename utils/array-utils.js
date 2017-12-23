"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function range(max, min = 0) {
    return Array.from(Array(max), (_, i) => min + i);
}
exports.range = range;
// Algorithm found here: http://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffle(array) {
    for (let current = array.length - 1; current > 0; current--) {
        const random = Math.floor(Math.random() * (current + 1)); // Find a random index in the remaining part of the array
        [array[current], array[random]] = [array[random], array[current]]; // Swap with the current index
    }
    return array;
}
exports.shuffle = shuffle;
function rotate(array) {
    array.push(array.shift());
    return array;
}
exports.rotate = rotate;
