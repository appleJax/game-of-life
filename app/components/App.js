import React, { PureComponent } from 'react'
import RefLink from './RefLink'
import StatusBar from '../containers/StatusBar'
import Board from '../containers/Board'
import ControlBar from './ControlBar'

import { connect } from 'react-redux'
import {
  setSpeed,
  resetBoard
} from '../actions/sync'
import { fillBoard } from '../utils'
import { store } from '../containers/Root'

import Elm from 'react-elm-components'
import { ElmHint } from '../../dist/elm/elmHint.js'
import { ElmControlBar } from '../../dist/elm/elmControlBar.js'

class App extends PureComponent {
  constructor() {
    super()
  }

  render() {
    return (
      <div className='outer-container'>
        <RefLink />
        <div className='inner-container'>
          <StatusBar />
          <Board />
          <Elm src={ElmControlBar} ports={setupPorts} />
          <Elm src={ElmHint} />
        </div>
      </div>
    )
  }
}


function setupPorts(ports) {
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
