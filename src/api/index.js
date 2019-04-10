import { GetResInfoData, GetGeneralData, GetAuctionData } from './api'
import { get } from './request'
export const getGeneralData = data => get(GetGeneralData, data)
export const getResInfoData = data => get(GetResInfoData, data)
export const getAuctionData = data => get(GetAuctionData, data)
