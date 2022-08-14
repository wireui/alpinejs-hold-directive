import { DirectiveParameters, DirectiveUtilities } from './alpine'

export const MOUSE_RIGHT_CLICK = 0

export const getModifierDuration = (modifiers: string[], modifier: string, fallback: number): number => {
  if (modifiers.length === 1) return fallback

  const index = modifiers.indexOf(modifier)
  const duration = +modifiers[index + 1]?.replace(/\D/g, '')

  return !duration
    ? fallback
    : Number(duration)
}

export const directive = (
  element: Node,
  { modifiers, expression }: DirectiveParameters,
  { cleanup, evaluate }: DirectiveUtilities
): void => {
  const mouseDown = (event: Event) => {
    const { button } = event as MouseEvent

    if (button && button !== MOUSE_RIGHT_CLICK) return

    let delay = 500
    let repeat = 500

    if (modifiers.includes('click')) {
      evaluate(expression)
    }

    if (modifiers.includes('delay')) {
      delay = getModifierDuration(modifiers, 'delay', delay)
    }

    if (modifiers.length === 1 && /^\d+/.test(modifiers[0])) {
      repeat = Number(modifiers[0].replace(/\D/g, ''))
    }

    if (modifiers.includes('repeat')) {
      repeat = getModifierDuration(modifiers, 'repeat', repeat)
    }

    let interval = 0

    const timeout = window.setTimeout(() => {
      interval = window.setInterval(() => evaluate(expression), repeat)
    }, delay)

    const mouseUp = () => {
      window.clearTimeout(timeout)
      window.clearInterval(interval)
      document.removeEventListener('mouseup', mouseUp)
    }

    document.addEventListener('mouseup', mouseUp)
  }

  element.addEventListener('mousedown', mouseDown)

  cleanup(() => element.removeEventListener('mousedown', mouseDown))
}

export default directive
