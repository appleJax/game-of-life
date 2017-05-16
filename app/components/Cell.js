import React, { PureComponent } from 'react'

class Cell extends PureComponent {

  render() {
    const {alive, onClick} = this.props
    let stateClass = 'cell'

    if (alive == 1) stateClass += ' alive--new'
    if (alive == 2) stateClass += ' alive--old'

    return (
      <div
        className={stateClass}
        onClick={onClick}
      >
      </div>
    )
  }
}

export default Cell
