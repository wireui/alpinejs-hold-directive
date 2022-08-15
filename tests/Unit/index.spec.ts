import Alpine from 'alpinejs'
import { directive } from '@/directive'
import { register } from '@/index'

describe('Testing index.ts', () => {
  it('should register the hold directive', async () => {
    Alpine.directive = jest.fn()

    register(Alpine)

    expect(Alpine.directive).toHaveBeenCalledWith('hold', directive)
  })
})
