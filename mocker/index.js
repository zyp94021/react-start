const Mock = require('mockjs')
const Api = {
  GetGeneralData: '/api/getGeneralData',
  GetResInfoData: '/api/GetResInfoData',
}
const GeneralData = require('./generalData')
const ResInfoData = require('./ResInfoData')
const proxy = {
  ['GET ' + Api.GetGeneralData]: (req, res) => {
    const todayTime = new Date().setHours(0, 0, 0, 0)
    const { startTime, serverId, current, pageSize } = req.query
    if (startTime > todayTime && serverId === '0') {
      return res.json(Mock.mock(GeneralData.todayData))
    } else {
      const result = Mock.mock(GeneralData.moreData)
      result.current = current
      result.total = result.result.length
      result.pageSize = pageSize
      return res.json(result)
    }
  },
  ['GET ' + Api.GetResInfoData]: (req, res) => {
    return res.json(Mock.mock(ResInfoData))
  },
}
module.exports = proxy
