import * as React from 'react'
import { HashRouter as Router } from 'react-router-dom'
import { Route, Switch, Redirect } from 'react-router'
import Home from './pages/home/Home'
import Login from './pages/login/login'
import AppData from './AppData'
import eventBus from './EventBus'
import { hot } from 'react-hot-loader'
import './App.less'
interface AppState {
  token: string
}
class App extends React.Component<{}, AppState> {
  constructor(props) {
    super(props)
    this.state = { token: localStorage.getItem('token') }
  }
  componentDidMount() {
    eventBus.addEventListener('login', ({ username, token }) => {
      AppData.token = token
      AppData.username = username
      localStorage.setItem('token', AppData.token)
      this.setState({
        token: AppData.token,
      })
    })
    eventBus.addEventListener('logout', () => {
      AppData.token = ''
      localStorage.removeItem('token')
      this.setState({
        token: AppData.token,
      })
    })
    const token = localStorage.getItem('token')
    if (token) {
      AppData.token = token
      this.setState({ token })
    }
  }
  render() {
    return (
      <Router>
        <Route
          path="/"
          exact
          render={() =>
            this.state.token ? (
              <Redirect to="/home" />
            ) : (
              <Redirect to="/login" />
            )
          }
        />
        <Switch>
          <Route
            path="/home"
            render={() =>
              this.state.token ? <Home /> : <Redirect to="/login" />
            }
          />
          <Route path="/login" component={Login} />
        </Switch>
      </Router>
    )
  }
}
// get()
export default hot(module)(App)
