import {
  NEXT_GEN,
  RESET_GEN
} from '../actions/sync'

const generations = (state = 0, action) => {
  switch (action.type) {
    case NEXT_GEN:
      return state + 1

    case RESET_GEN:
      return 0
      
    default:
      return state
  }
}

export default generations
