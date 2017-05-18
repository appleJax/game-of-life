import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import GenCounter from './GenCounter'
import {
  toggleRun,
  clearBoard,
  newGame,
  nextGen,
  nextBoard
} from '../actions/sync'

class StatusBar extends PureComponent {
  render() {
    const {
      running,
      x, y,
      toggleRun,
      clearBoard,
      newGame,
      nextGen,
      nextBoard
    } = this.props

  return (
    <div className='bar bar--status'>
      <button
        className='start btn--status'
        onClick={() => toggleRun()}
      >
        {running ? 'Pause' : 'Start'}
      </button>
      <button
        className={running ? 'btn--status btn--disabled' : 'btn--status'}
        onClick={() => clearBoard()}
        disabled={running ? true : false}
      >
        Clear
      </button>
      <button
        className='btn--status'
        onClick={() => newGame(y, x)}
      >
        New Game
      </button>
      <div className='spacer'></div>
      <button
        className={running ? 'btn--disabled' : ''}
        onClick={() => {
          nextGen()
          nextBoard()
        }}
        disabled={running ? true : false}
      >
        Next Gen
      </button>
      <GenCounter />
    </div>
  )}
}

StatusBar = connect(
  (state) => ({
    running: state.running,
    x: Object.keys(state.board[0]).length,
    y: Object.keys(state.board).length
  }),
  {
    toggleRun,
    clearBoard,
    newGame,
    nextGen,
    nextBoard
  }
)(StatusBar)


export default StatusBar
