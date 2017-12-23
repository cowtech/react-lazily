export type BoundHandler = (...args: Array<any>) => void | Promise<void>;

export function handleIOSMinHeight(offset: number): void{
  document.body.style.minHeight = document.getElementById('main').style.minHeight = `${window.innerHeight - offset}px`;
}
