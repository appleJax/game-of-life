import React, { PureComponent } from 'react'

class Hint extends PureComponent {
  render() {
    return (
      <div className='hint'>
        "Feel free to spawn cells, kill cells, change the size, or change the speed while it's running. Lighter blue cells are older. Enjoy!"
      </div>
    )
  }
}

export default Hint
