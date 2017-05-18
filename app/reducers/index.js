import { combineReducers } from 'redux'
import board from './board'
import speed from './speed'
import generations from './generations'
import running from './running'

const rootReducer = combineReducers({
  board,
  speed,
  generations,
  running
})

export default rootReducer
