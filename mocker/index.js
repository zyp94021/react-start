const Mock = require('mockjs')
const Api = {
  GetGeneralData: '/api/getGeneralData',
  GetServerData: '/api/getServerData',
}
const GeneralData = require('./generalData')
const ServerData = require('./serverData')
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
  ['GET ' + Api.GetServerData]: (req, res) => {
    return res.json(Mock.mock(ServerData))
  },
}
module.exports = proxy
