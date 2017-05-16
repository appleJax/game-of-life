import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import Row from './Row'
import { update } from '../actions/sync'

let runTimer

class Board extends PureComponent {

  componentWillMount(props) {
    runTimer = setInterval(update, this.props.speed)
  }

  componentWillUpdate(nextProps, nextState) {
    clearInterval(runTimer)

    if (nextProps.running)
      runTimer = setInterval(update, nextProps.speed)
  }

  render() {
    const { rows } = this.props
    let rowArr = []

    for (let i = 0; i < rows; i++)
      rowArr.push(<Row key={i} y={i} />)

    return (
      <div className='board'>
        {rowArr}
      </div>
    )
  }
}

Board = connect(
  (state) => ({
   rows: state.size.y,
   speed: state.speed,
   running: state.running
  })
)(Board)

export default Board
