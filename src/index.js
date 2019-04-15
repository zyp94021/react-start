import React from 'react'
import ReactDOM from 'react-dom'
import App from './App.js'
import zhCN from 'antd/lib/locale-provider/zh_CN'
import { LocaleProvider } from 'antd'
const eosplayer = window.eosplayer
eosplayer.setNetConf('eosnode', {
  blockchain: 'eos',
  host: 'proxy.eosnode.tools',
  port: 443,
  chainId: 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906',
  protocol: 'https',
  httpEndpoint: 'https://proxy.eosnode.tools:443',
})
if (process.env.NODE_ENV === 'production') {
  eosplayer.switchNetwork('eosnode')
} else {
  eosplayer.switchNetwork('dev')
}
ReactDOM.render(
  <LocaleProvider locale={zhCN}>
    <App />
  </LocaleProvider>,
  document.getElementById('root'),
)
