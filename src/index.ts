import { Alpine } from '@/alpine'
import directive from '@/directive'

declare global {
  interface Window {
    Alpine: Alpine
  }
}

window.Alpine.directive('hold', directive)

export { directive }
export default { directive }
