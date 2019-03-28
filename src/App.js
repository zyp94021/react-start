import React, { Component } from 'react'
import { hot } from 'react-hot-loader'
import './App.css'
import { get } from './promise'
import {IndexRouter} from './Router'
class App extends Component {
  render() {
    return (
      <div className="App">
        <h1> Hello, W1or3ld! </h1>
        <IndexRouter></IndexRouter>
      </div>
    )
  }
}
get()
export default hot(module)(App)
