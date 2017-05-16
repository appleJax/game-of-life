import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

class GenCounter extends PureComponent {

  render() {

    return (
      <div className='gen-counter'>
        Gen: {this.props.gen}
      </div>
    )
  }
}

GenCounter = connect(
  (state) => ({
    gen: state.generations
  })
)(GenCounter)

export default GenCounter
