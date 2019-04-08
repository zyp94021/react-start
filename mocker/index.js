const Mock = require('mockjs')
const Api = {
  GetGeneralData: '/api/getGeneralData',
}
const GeneralData = require('./generalData')
const proxy = {
  ['GET ' + Api.GetGeneralData]: (req, res) => {
    console.log(req.query)
    return res.json(Mock.mock(GeneralData))
  },
}
module.exports = proxy
