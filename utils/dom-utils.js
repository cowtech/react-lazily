"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function handleIOSMinHeight(offset) {
    document.body.style.minHeight = document.getElementById('main').style.minHeight = `${window.innerHeight - offset}px`;
}
exports.handleIOSMinHeight = handleIOSMinHeight;
