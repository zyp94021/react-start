import Api from './api'
import { get } from './request'
export const getGeneralData = data => get(Api.GetGeneralData, data)
export const getResInfoData = data => get(Api.GetResInfoData, data)
