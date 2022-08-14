import Alpine from 'alpinejs'
import { directive } from '@/directive'

describe('Testing index.ts', () => {
  it('should register the hold directive', async () => {
    Alpine.directive = jest.fn()

    await import('@/index')

    expect(Alpine.directive).toHaveBeenCalledWith('hold', directive)
  })
})
