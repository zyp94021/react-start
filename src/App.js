import React, { Component } from 'react'
import { hot } from 'react-hot-loader'
import './App.scss'
import { get } from './promise'
import { IndexRouter } from './Router'
class App extends Component {
  render() {
    return (
      <div className='App'>
        <div className='left'>left</div>
        <div className='right'>right</div>
        {/* <IndexRouter></IndexRouter> */}
      </div>
    )
  }
}
// get()
export default hot(module)(App)
