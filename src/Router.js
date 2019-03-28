import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import Chat from './chat/Chat'
import Todo from './todo/Todo'
import Login from './login/Login'
import Dialog from './dialog/Dialog'
const Index = () => <h2>Home</h2>
export class IndexRouter extends Component {
  render() {
    return (
        <Router>
          <div>
            <nav>
              <ul>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/chat/">Chat</Link>
                </li>
                <li>
                  <Link to="/todo/">Todo</Link>
                </li>
                <li>
                  <Link to="/login/">Login</Link>
                </li>
                <li>
                  <Link to="/dialog/">Dialog</Link>
                </li>
              </ul>
            </nav>

            <Route path="/" exact component={Index} />
            <Route path="/chat/" component={Chat} />
            <Route path="/todo/" component={Todo} />
            <Route path="/login/" component={Login} />
            <Route path="/dialog/" component={Dialog} />
          </div>
        </Router>
    )
  }
}
