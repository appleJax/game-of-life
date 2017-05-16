import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { setSpeed } from '../actions/sync'

class SpeedPicker extends PureComponent {
  render() {
    const {
      speed,
      setSpeed
    } = this.props

    return (
      <div className='bar'>
        <span className='picker-label'>
          SIM Speed:
        </span>
        <button
          className={speed == 350 ? 'btn--active' : ''}
          onClick={() => setSpeed(350)}
          disabled={speed == 350 ? true : false}
        >
          Slow
        </button>
        <button
          className={speed == 130 ? 'btn--active' : ''}
          onClick={() => setSpeed(130)}
          disabled={speed == 130 ? true : false}
        >
          Medium
        </button>
        <button
          className={speed == 50 ? 'btn--active' : ''}
          onClick={() => setSpeed(50)}
          disabled={speed == 50 ? true : false}
        >
          Fast
        </button>
      </div>
    )
  }
}

SpeedPicker = connect(
  (state) => ({
    speed: state.speed
  }),
  { setSpeed }
)(SpeedPicker)

export default SpeedPicker
