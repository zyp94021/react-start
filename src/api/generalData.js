import Api from './api'
import { get,post } from './request'

export const getGeneralData = data => get(Api.GetGeneralData, data)
export const getResInfoData = data => get(Api.GetResInfoData, data)
export const getUserAddress = () => get(Api.GetUserAddress)
export const getUserBaseInfo = data => get(Api.GetUserBaseInfo,data)
export const sendMails = data => post(Api.SendMails,data)
export const mailsHistroy = data => get(Api.MailsHistroy,data)
