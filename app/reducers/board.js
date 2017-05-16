import { store } from '../containers/Root'

import {
  updateBoard,
  newBoard
} from '../utils'

import {
  UPDATE,
  NEW_BOARD,
  CLEAR_BOARD,
  TOGGLE_CELL
} from '../actions/sync'

const board = (state = {}, action) => {
  switch (action.type) {
    case UPDATE:
      return updateBoard(state)

    case NEW_BOARD:
      return action.board

    case CLEAR_BOARD:
      const boardSize = store.getState().size
      return newBoard(
        boardSize.x,
        boardSize.y
      )

    case TOGGLE_CELL:
      const newState = JSON.parse(JSON.stringify(state)),
            {x, y} = action

      newState[y][x] = !state[y][x]
      return newState

    default:
      return state
  }
}

export default board
