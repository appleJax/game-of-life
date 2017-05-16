import React, { PureComponent } from 'react'

class RefLink extends PureComponent {
  render() {
    return (
      <div className='ref-link'>
        <a
          href='https://www.math.cornell.edu/~lipa/mec/lesson6.html'
          target='_blank'
        >
          React+Redux Game of Life (Click for Info on Game of Life)
        </a>
      </div>
    )
  }
}

export default RefLink
