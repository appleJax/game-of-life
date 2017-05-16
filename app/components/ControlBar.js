import React, { PureComponent } from 'react'
import SizePicker from '../containers/SizePicker'
import SpeedPicker from '../containers/SpeedPicker'

class ControlBar extends PureComponent {
  render() {
    return (
      <div className='controls'>
        <SizePicker />
        <SpeedPicker />
      </div>
    )
  }
}

export default ControlBar
