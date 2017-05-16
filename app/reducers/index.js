import { combineReducers } from 'redux'
import board from './board'
import size from './size'
import speed from './speed'
import generations from './generations'
import running from './running'

const rootReducer = combineReducers({
  board,
  size,
  speed,
  generations,
  running
})

export default rootReducer
