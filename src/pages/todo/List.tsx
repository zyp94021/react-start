import * as React from 'react'
import Item from './Item'
interface Props {
  data: any[]
  remove: Function
}
export default class List extends React.Component<Props> {
  render() {
    return (
      <ul>
        {this.props.data.map((data, index) => (
          <Item
            key={index}
            data={data}
            index={index}
            remove={this.props.remove}
          />
        ))}
      </ul>
    )
  }
}
