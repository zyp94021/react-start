import { post } from './request'
export const login = data => post('http://10.1.100.97:3001/login', data)
