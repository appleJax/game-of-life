import React, { PureComponent } from 'react'
import RefLink from './RefLink'
import StatusBar from '../containers/StatusBar'
import Board from '../containers/Board'
import ControlBar from './ControlBar'
import Elm from 'react-elm-components'
import { ElmHint } from '../../dist/elm/elmhint.js'
//import Hint from './Hint'

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
          <ControlBar />
          <Elm src={ElmHint}  />
        </div>
      </div>
    )
  }
}

export default App
