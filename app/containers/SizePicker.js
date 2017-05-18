import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { setSize } from '../actions/sync'

class SizePicker extends PureComponent {

  render() {
    const {
      size,
      setSize
    } = this.props

    return (
      <div className='bar'>
        <span className='picker-label'>
          Board Size:
        </span>
        <button
          className={size == 30 ? 'btn--active' : ''}
          onClick={() => setSize(30, 20)}
          disabled={size == 30 ? true : false}
        >
          Small
        </button>
        <button
          className={size == 40 ? 'btn--active' : ''}
          onClick={() => setSize(40, 30)}
          disabled={size == 40 ? true : false}
        >
          Medium
        </button>
        <button
          className={size == 50 ? 'btn--active' : ''}
          onClick={() => setSize(50, 40)}
          disabled={size == 50 ? true : false}
        >
          Large
        </button>
       </div>
    )
  }
}

SizePicker = connect(
  (state) => ({
    size: Object.keys(state.board[0]).length
  }),
  { setSize }
)(SizePicker)

export default SizePicker
