import { FunctionComponent, memo, NamedExoticComponent } from 'react'

export function updateBodySize(offset: number): void {
  if (window.visualViewport) {
    document.body.style.setProperty('--rl-ios-height', `${window.visualViewport.height - offset}px`)
  }
}

export function handleIOSMinHeight(offset: number = 0): void {
  if (window.visualViewport) {
    window.visualViewport.addEventListener('resize', updateBodySize.bind(undefined, offset))
    window.addEventListener('resize', updateBodySize.bind(undefined, offset))
  }

  document.body.style.setProperty('--rl-ios-height', `${window.innerHeight - offset}px`)
}

export function loadScript(url: string, tag: string): Promise<void> {
  return new Promise<void>(resolve => {
    if (document.querySelector(`script[data-tag="${tag}"]`)) {
      return resolve()
    }

    const script = document.createElement('script')
    script.src = url
    script.dataset.tag = tag
    script.addEventListener('load', () => {
      setTimeout(resolve, 100)
    })

    document.head.append(script)
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
