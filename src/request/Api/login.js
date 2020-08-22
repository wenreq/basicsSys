import {httpPost} from '../http.js'

export function login (params) {
  return httpPost('/login/user/login', params)
}
