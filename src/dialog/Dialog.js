import React, { Component } from 'react'
import Container from './Container'
export default class Dialog extends Component {
  render() {
    return (
      <Container>
        <div>
          <span>header</span>
          <button>X</button>
        </div>
        <div>
          <p>content</p>
        </div>
        <div>footer</div>
      </Container>
    )
  }
}
