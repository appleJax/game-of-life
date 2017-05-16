import React, { PureComponent } from 'react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import rootReducer from '../reducers'
import App from '../components/App'
import { createBoard } from '../utils'

const rows    = 30,
      columns = 40,
      initialState = createBoard(rows, columns)

const preloadedState = {
        board: initialState,
        size: {
          x: columns,
          y: rows
        },
        speed: 130,
        generations: 0,
        running: true,
      }

export const store = createStore(rootReducer, preloadedState)

class Root extends PureComponent {
  render() {
    return (
      <Provider store={store} >
        <App />
      </Provider>
    )
  }
}

export default Root
