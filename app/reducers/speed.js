import { SET_SPEED } from '../actions/sync'

const speed = (state = 0, action) => {
  switch (action.type) {
    case SET_SPEED:
      return action.speed

    default:
      return state
  }
}

export default speed
