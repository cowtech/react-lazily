import { FunctionComponent, memo, NamedExoticComponent } from 'react'

export function handleIOSMinHeight(offset: number): void {
  const main = document.getElementById('main')

  if (main) {
    document.body.style.minHeight = main.style.minHeight = `${window.innerHeight - offset}px`
  }
}

export function loadScript(url: string, tag: string): Promise<void> {
  return new Promise<void>((resolve: () => void) => {
    if (document.querySelector(`script[data-tag="${tag}"]`)) {
      return resolve()
    }

    const script = document.createElement('script')
    script.src = url
    script.setAttribute('data-tag', tag)
    script.onload = () => {
      setTimeout(resolve, 100)
    }

    document.head.appendChild(script)
  })
}

export function createMemoizedComponent<Props extends object>(
  name: string,
  component: FunctionComponent<Props>
): NamedExoticComponent<Props> {
  const created = memo(component)
  created.displayName = name
  return created
}
