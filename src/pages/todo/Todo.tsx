import * as React from 'react'
import Input from './Input'
import List from './List'
import { postAddTodo, postDeleteTodo, getTodo } from '../../store/action'
import { connect } from 'react-redux'
interface TodoProps {
  list: string[]
  addTodo: (message: string) => {}
  deleteTodo: (index: number) => {}
  getTodo: () => {}
  span: string
}
const mapStateToProps = state => {
  return {
    list: state.todos,
  }
}
const mapDispatchProps = dispatch => {
  return {
    addTodo: message => {
      dispatch(postAddTodo(message))
    },
    deleteTodo: id => {
      dispatch(postDeleteTodo(id))
    },
    getTodo: () => {
      dispatch(getTodo())
    },
  }
}

class Todo extends React.Component<TodoProps> {
  constructor(props) {
    super(props)
  }
  add(input) {
    this.props.addTodo(input)
  }
  remove(id) {
    this.props.deleteTodo(id)
  }
  componentDidMount() {
    console.log(this.props.list)
    this.props.getTodo()
  }
  render() {
    return (
      <div>
        <span>{this.props.span}</span>
        <Input add={this.add.bind(this)} />
        <List data={this.props.list} remove={this.remove.bind(this)} />
      </div>
    )
  }
}
export default connect(
  mapStateToProps,
  mapDispatchProps,
)(Todo)
