import React, { Component } from 'react'
import './Container.scss'

export default class Dialog extends Component {
  constructor(props) {
    super(props)
    this.mouseMove = this.mouseMove.bind(this)
  }
  mouseDown(event) {
    console.log(event)
    this.dragBox.addEventListener('mousemove', this.mouseMove)
  }
  mouseMove(event) {
    console.log(event)
    console.log()
  }
  mouseUp(event) {
    console.log(event)
    this.dragBox.removeEventListener('mousemove', this.mouseMove)
  }

  render() {
    return (
      <div
        className='container'
        ref={dragBox => (this.dragBox = dragBox)}
        onMouseDown={this.mouseDown.bind(this, event)}
        onMouseUp={this.mouseUp.bind(this, event)}
      >
        <div>
          <span>header</span>
          <button>X</button>
        </div>
        <div>
          <p>content</p>
        </div>
        <div>footer</div>
      </div>
    )
  }
}
