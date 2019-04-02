import React, { Component } from 'react'
import { hot } from 'react-hot-loader'
import './App.scss'
import { IndexRouter } from './Router'

class App extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div className="App">
        <IndexRouter />
      </div>
    )
  }
}
// get()
export default hot(module)(App)
