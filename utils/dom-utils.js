export function handleIOSMinHeight(offset) {
    document.body.style.minHeight = document.getElementById('main').style.minHeight = `${window.innerHeight - offset}px`;
}
