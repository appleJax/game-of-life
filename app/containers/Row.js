import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import Cell from '../components/Cell'
import { toggleCell } from '../actions/sync'

class Row extends PureComponent {
  constructor() {
    super()
  }

  shouldComponentUpdate(nextProps) {
    const currentRow = JSON.stringify(this.props.board[this.props.y]),
          nextRow = JSON.stringify(nextProps.board[nextProps.y])

    return currentRow !== nextRow
  }

  render() {
    const {x, y, board, toggleCell} = this.props
    let cellArr = []

    for (let i = 0; i < x; i++) {
      const alive = board[y][i]

      cellArr.push(
        <Cell
          key={i}
          alive={alive}
          onClick={() => toggleCell(i, y)}
        />)
    }

    return (
      <div className='row'>
        {cellArr}
      </div>
    )
  }
}
Row = connect(
  (state) => ({
    x: state.size.x,
    board: state.board
  }),
  { toggleCell }
)(Row)

export default Row
