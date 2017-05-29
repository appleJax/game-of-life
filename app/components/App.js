import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { store } from '../containers/Root'

// React Components
import RefLink from './RefLink'
import StatusBar from '../containers/StatusBar'
import Board from '../containers/Board'
import ControlBar from './ControlBar'

// Functions / Actions
import {
  toggleRun,
  clearBoard,
  newGame,
  nextGen,
  nextBoard,
  setSpeed,
  resetBoard
} from '../actions/sync'
import { fillBoard } from '../utils'

// Elm Components
import Elm from 'react-elm-components'
import { ElmHint } from '../../dist/elm/elmHint.js'
import { ElmControlBar } from '../../dist/elm/elmControlBar.js'
import { ElmStatusBar } from '../../dist/elm/elmStatusBar.js'

class App extends PureComponent {
  constructor() {
    super()
  }

  render() {
    return (
      <div className='outer-container'>
        <RefLink />
        <div className='inner-container'>
          <Elm src={ElmStatusBar} ports={statusPorts} />
          <Board />
          <Elm src={ElmControlBar} ports={controlPorts} />
          <Elm src={ElmHint} />
        </div>
      </div>
    )
  }
}

function statusPorts(ports) {
  ports.actionCreator.subscribe( action => {
    switch (action) {
      case "toggleRun":
        return store.dispatch( toggleRun() )

      case "nextGen":
        store.dispatch( nextGen() )
        store.dispatch( nextBoard() )
        return

      case "newGame":
        const board = store.getState().board
        const x = Object.keys(board[0]).length
        const y = Object.keys(board).length

        return store.dispatch( newGame(y, x) )

      case "clearBoard":
        return store.dispatch( clearBoard() )
    }
  })

  let currentGen = 0

  function handleChange() {
    let previousGen = currentGen
    currentGen = store.getState().generations

    if (previousGen !== currentGen) {
      ports.getGen.send(currentGen)
    }
  }

  store.subscribe(handleChange)
}

function controlPorts(ports) {
	ports.speedToPort.subscribe( speed =>
    store.dispatch(setSpeed(speed))
	)

	ports.sizeToPort.subscribe( size => {
    const { x, y } = size,
          board = fillBoard(x, y)

    store.dispatch(resetBoard(board))
	})
}

export default App
