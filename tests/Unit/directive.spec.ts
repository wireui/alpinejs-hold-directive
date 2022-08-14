import { DirectiveParameters, DirectiveUtilities } from '@/alpine'
import directive, { getModifierDuration, MOUSE_RIGHT_CLICK } from '@/directive'

describe('Testing directive.ts', () => {
  const mockParameters = () => {
    const parameters = { modifiers: [], expression: '' } as unknown as DirectiveParameters
    const utilities = { cleanup: jest.fn(), evaluate: jest.fn() } as unknown as DirectiveUtilities
    const element = document.createElement('div')

    return {
      parameters,
      utilities,
      element
    }
  }

  jest.useFakeTimers()
  jest.spyOn(window, 'setTimeout')
  jest.spyOn(window, 'setInterval')
  jest.spyOn(window, 'clearTimeout')
  jest.spyOn(window, 'clearInterval')

  test.each([
    { modifiers: ['delay'], modifier: 'delay', fallback: 200, expected: 200 },
    { modifiers: ['delay', 'click'], modifier: 'delay', fallback: 200, expected: 200 },
    { modifiers: ['delay', '700ms'], modifier: 'delay', fallback: 200, expected: 700 },
    { modifiers: ['delay', '700'], modifier: 'delay', fallback: 200, expected: 700 },
    { modifiers: ['click', 'delay', '700'], modifier: 'delay', fallback: 200, expected: 700 },
    { modifiers: ['delay', 'repeat', '700'], modifier: 'delay', fallback: 200, expected: 200 },
    { modifiers: ['delay', 'repeat', '700'], modifier: 'repeat', fallback: 200, expected: 700 }
  ])(
    'it should get the modifier duration: { modifiers: $modifiers, modifier: $modifier, fallback: $fallback, expected: $expected } ',
    ({ modifiers, modifier, fallback, expected }) => {
      expect(getModifierDuration(modifiers, modifier, fallback)).toBe(expected)
    })

  it('should call the clearTimeout, clearInterval, and removeEventListener when the mouseup event is fired', () => {
    const { parameters, utilities, element } = mockParameters()

    parameters.modifiers.push('repeat', '133ms')
    parameters.expression = 'action'

    document.removeEventListener = jest.fn()

    directive(element, parameters, utilities)

    element.dispatchEvent(
      new MouseEvent('mousedown', { button: MOUSE_RIGHT_CLICK })
    )

    document.dispatchEvent(new MouseEvent('mouseup'))

    jest.runOnlyPendingTimers()

    expect(window.clearTimeout).toHaveBeenCalled()
    expect(window.clearInterval).toHaveBeenCalled()
    expect(document.removeEventListener).toHaveBeenCalledWith('mouseup', expect.any(Function))
  })

  it('should add the mousedown event listener and add the remove mousedown event listener on cleanup', () => {
    const { parameters, utilities, element } = mockParameters()

    element.addEventListener = jest.fn()

    directive(element, parameters, utilities)

    expect(element.addEventListener).toHaveBeenCalledWith('mousedown', expect.any(Function))
    expect(utilities.cleanup).toHaveBeenCalledWith(expect.any(Function))
  })

  it('should block the execution when not fired by the right click', () => {
    const { parameters, utilities, element } = mockParameters()

    document.addEventListener = jest.fn()

    directive(element, parameters, utilities)

    element.dispatchEvent(
      new MouseEvent('mousedown', { button: 1 })
    )

    expect(utilities.evaluate).not.toHaveBeenCalled()
    expect(document.addEventListener).not.toHaveBeenCalled()
  })

  it('should execute when fired by unknown mouse button', () => {
    const { parameters, utilities, element } = mockParameters()

    document.addEventListener = jest.fn()
    directive(element, parameters, utilities)

    element.dispatchEvent(new Event('mousedown'))

    expect(document.addEventListener).toHaveBeenCalledWith('mouseup', expect.any(Function))
  })

  it('should execute when fired by right mouse button', () => {
    const { parameters, utilities, element } = mockParameters()

    document.addEventListener = jest.fn()

    directive(element, parameters, utilities)

    element.dispatchEvent(
      new MouseEvent('mousedown', { button: MOUSE_RIGHT_CLICK })
    )

    expect(document.addEventListener).toHaveBeenCalledWith('mouseup', expect.any(Function))
  })

  it('should instantly execute the action if the "click" modifier is present', () => {
    const { parameters, utilities, element } = mockParameters()

    parameters.modifiers.push('click')
    parameters.expression = 'action'

    directive(element, parameters, utilities)

    element.dispatchEvent(
      new MouseEvent('mousedown', { button: MOUSE_RIGHT_CLICK })
    )

    expect(utilities.evaluate).toHaveBeenCalledWith('action')
  })

  it('should set the default delay value when the "delay" modifier is present', () => {
    const { parameters, utilities, element } = mockParameters()

    parameters.modifiers.push('delay')
    parameters.expression = 'action'

    directive(element, parameters, utilities)

    element.dispatchEvent(
      new MouseEvent('mousedown', { button: MOUSE_RIGHT_CLICK })
    )

    expect(window.setTimeout).toHaveBeenCalledWith(expect.any(Function), 500)
  })

  it('should set the delay value when the "delay" modifier is present with the duration', () => {
    const { parameters, utilities, element } = mockParameters()

    parameters.modifiers.push('delay', '700ms')
    parameters.expression = 'action'

    directive(element, parameters, utilities)

    element.dispatchEvent(
      new MouseEvent('mousedown', { button: MOUSE_RIGHT_CLICK })
    )

    expect(window.setTimeout).toHaveBeenCalledWith(expect.any(Function), 700)
  })

  it('should set the repeat value when the short repeat modifier is present', () => {
    const { parameters, utilities, element } = mockParameters()

    parameters.modifiers.push('733ms')
    parameters.expression = 'action'

    directive(element, parameters, utilities)

    element.dispatchEvent(
      new MouseEvent('mousedown', { button: MOUSE_RIGHT_CLICK })
    )

    jest.runOnlyPendingTimers()

    expect(window.setInterval).toHaveBeenCalledWith(expect.any(Function), 733)
  })

  it('should set the repeat value when the duration value is present', () => {
    const { parameters, utilities, element } = mockParameters()

    parameters.modifiers.push('repeat', '133ms')
    parameters.expression = 'action'

    directive(element, parameters, utilities)

    element.dispatchEvent(
      new MouseEvent('mousedown', { button: MOUSE_RIGHT_CLICK })
    )

    jest.runOnlyPendingTimers()

    expect(window.setInterval).toHaveBeenCalledWith(expect.any(Function), 133)
  })
})
