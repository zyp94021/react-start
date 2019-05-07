import * as React from 'react'
import * as ReactDOM from 'react-dom'
import App from './App'
import zhCN from 'antd/lib/locale-provider/zh_CN'
import { LocaleProvider } from 'antd'
import { store } from './store/store'
import { Provider } from 'react-redux'
ReactDOM.render(
  <Provider store={store}>
    <LocaleProvider locale={zhCN}>
      <App />
    </LocaleProvider>
  </Provider>,
  document.getElementById('root'),
)
