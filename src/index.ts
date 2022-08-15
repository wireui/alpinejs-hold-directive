import { Alpine } from './alpine'
import directive from './directive'

const register = (Alpine: Alpine) => {
  Alpine.directive('hold', directive)
}

export { directive, register }
export default { directive, register }
