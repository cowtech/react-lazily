export function handleIOSMinHeight(offset) {
    document.body.style.minHeight = document.getElementById('main').style.minHeight = `${window.innerHeight - offset}px`;
}
export function loadScript(url, tag) {
    return new Promise((resolve) => {
        if (document.querySelector(`script[data-tag="${tag}"]`))
            return resolve();
        const script = document.createElement('script');
        script.src = url;
        script.setAttribute('data-tag', tag);
        script.onload = () => {
            setTimeout(resolve, 100);
        };
        document.head.appendChild(script);
    });
}
