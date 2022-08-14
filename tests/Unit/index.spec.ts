import { Alpine } from '@/alpine'
import directive from '@/directive'

describe('Testing index.ts', () => {
  it('should register the hold directive', async () => {
    window.Alpine = { directive: jest.fn() } as unknown as Alpine

    await import('@/index')

    expect(window.Alpine.directive).toHaveBeenCalledWith('hold', directive)
  })
})
