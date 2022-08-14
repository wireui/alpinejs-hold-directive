// eslint-disable-next-line import/named
import { Alpine } from 'alpinejs'

export interface DirectiveUtilities {
  Alpine: Alpine
  effect: () => void
  cleanup: (callback: CallableFunction) => void
  evaluate: (expression: string) => unknown
  evaluateLater: (expression: string) => (result: unknown) => void
}

export interface DirectiveParameters {
  value: string
  modifiers: string[]
  expression: string
  original: string
  type: string
}
