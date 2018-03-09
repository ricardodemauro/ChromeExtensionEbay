import React from 'react'
import { render } from 'react-dom'
import App from './containers/app'

document.addEventListener('DOMContentLoaded', () => {
  render(<App />, document.getElementById('main'))
});
