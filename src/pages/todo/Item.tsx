import * as React from 'react'
interface Props {
  remove: Function
  index: number
  data: any
}
export default class Item extends React.Component<Props> {
  remove() {
    this.props.remove(this.props.data.id)
  }
  render() {
    return (
      <li>
        <span>{this.props.data.message}</span>
        <button onClick={this.remove.bind(this)}>删除</button>
      </li>
    )
  }
}
