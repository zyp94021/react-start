import {
  GetResInfoData,
  GetGeneralData,
  GetAuctionData,
  SendMails,
  GetUserBaseInfo,
  MailsHistroy,
} from './api'
import { get, post } from './request'

export const getGeneralData = data => get(GetGeneralData, data)
export const getResInfoData = data => get(GetResInfoData, data)
export const getAuctionData = data => get(GetAuctionData, data)
export const getUserBaseInfo = data => get(GetUserBaseInfo, data)
export const sendMails = data => post(SendMails, data)
export const mailsHistroy = data => get(MailsHistroy, data)
