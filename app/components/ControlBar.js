import React, { PureComponent } from 'react'
import SizePicker from '../containers/SizePicker'
import SpeedPicker from '../containers/SpeedPicker'
import { store } from '../containers/Root'
import { setSpeed } from '../actions/sync'
import Elm from 'react-elm-components'
import { ElmSpeedPicker } from '../../dist/elm/elmSpeedPicker.js'

class ControlBar extends PureComponent {
  render() {
    return (
      <div className='controls'>
        <SizePicker />
        <Elm src={ElmSpeedPicker} ports={setupPorts} />
      </div>
    )
  }
}

function setupPorts(ports) {
	ports.speedToPort.subscribe( speed =>
    store.dispatch(setSpeed(speed))
	)
}

export default ControlBar
