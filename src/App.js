import React, { Component } from 'react'
import { hot } from 'react-hot-loader'
import './App.css'
import { get } from './promise'
class App extends Component {
  render() {
    return (
      <div className="App">
        <h1> Hello, W1or3ld! </h1>
      </div>
    )
  }
}
get()
export default hot(module)(App)
