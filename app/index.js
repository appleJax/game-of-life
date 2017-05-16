import 'normalize-scss/sass/_normalize.scss'
import './index.sass'

import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import Root from './containers/Root'
//import 'react-hot-loader/patch'

render(
  <Root />,
  document.getElementById('root')
)
