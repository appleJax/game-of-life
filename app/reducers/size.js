import { SET_SIZE } from '../actions/sync'

const size = (state = {}, action) => {
  switch (action.type) {
    case SET_SIZE:
      return {
        x: action.x,
        y: action.y
      }
      
    default:
      return state
  }
}

export default size
