export type BoundHandler = (...args: Array<any>) => void | Promise<void>;

export function handleIOSMinHeight(offset: number): void{
  document.body.style.minHeight = document.getElementById('main').style.minHeight = `${window.innerHeight - offset}px`;
}

export function loadScript(url: string, tag: string): Promise<void>{
  return new Promise<void>(resolve => {
    if(document.querySelector(`script[data-tag="${tag}"]`))
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
