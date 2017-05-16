import { TOGGLE_RUNNING } from '../actions/sync'

const running = (state = true, action) => {
  switch (action.type) {
    case TOGGLE_RUNNING:
      return !state

    default:
      return state
  }
}

export default running
