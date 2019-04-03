import { post } from './request'
export const login = data => post('http://localhost:3001/login', data)
export const register = data => post('http://localhost:3001/register', data)
