const Mock = require('mockjs')
const Api = {
  GetGeneralData: '/api/getGeneralData',
  GetServerData:'/api/getServerData'
}
const GeneralData = require('./generalData')
const serverData = require('./serverData')
const proxy = {
  ['GET ' + Api.GetGeneralData]: (req, res) => {
    return res.json(Mock.mock(GeneralData))
  },
  ['GET ' + Api.GetServerData]: (req, res) => {
    return res.json(Mock.mock(serverData))
  },
}
module.exports = proxy
