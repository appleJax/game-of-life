import { store } from '../containers/Root'
import { createBoard, fillBoard } from '../utils'

export const TOGGLE_RUNNING = 'TOGGLE_RUNNING'
export const TOGGLE_CELL = 'TOGGLE_CELL'
export const CLEAR_BOARD = 'CLEAR_BOARD'
export const SET_SIZE = 'SET_SIZE'
export const SET_SPEED = 'SET_SPEED'
export const RESET_GEN = 'RESET_GEN'
export const UPDATE = 'UPDATE'
export const NEXT_GEN = 'NEXT_GEN'
export const NEW_BOARD = 'NEW_BOARD'

export const toggleRun = () => ({
  type: TOGGLE_RUNNING
})

export const toggleCell = (x, y) => ({
  type: TOGGLE_CELL,
  x,
  y
})

export const clearBoard = () => {
  store.dispatch(resetGen())
  return { type: CLEAR_BOARD }
}

export const setSize = (x, y) => {
  const board = fillBoard(x, y)
  store.dispatch(resetBoard(board))

  return {
    type: SET_SIZE,
    x,
    y
  }
}

export const setSpeed = (speed) => ({
  type: SET_SPEED,
  speed
})

export const newGame = (y, x) => {
  const board = createBoard(y, x)

  store.dispatch(resetBoard(board))
  return { type: RESET_GEN }
}

export const nextBoard = () => ({
  type: UPDATE
})

export const update = () => {
  store.dispatch(nextGen())
  store.dispatch(nextBoard())
}

export const nextGen = () => ({
  type: NEXT_GEN
})

export const resetBoard = (board) => ({
  type: NEW_BOARD,
  board
})

export const resetGen = () => ({
  type: RESET_GEN
})
