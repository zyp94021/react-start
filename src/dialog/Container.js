import React, { Component } from 'react'
import './Container.scss'
export default class Container extends Component {
  constructor(props){
    
  }
  mouseDown(event) {
    console.log(event)
    this.dragBox.addEventListener('mousemove', this.mouseMove.bind(this))
  }
  mouseMove(event) {
    console.log(event)
  }
  mouseUp(event) {
    console.log(event)
    this.dragBox.removeEventListener('mousemove', this.mouseMove.bind(this))
  }
  render() {
    return (
      <div
        className="container"
        ref={dragBox => (this.dragBox = dragBox)}
        onMouseDown={this.mouseDown.bind(this)}
        onMouseUp={this.mouseUp.bind(this)}
      />
    )
  }
}
