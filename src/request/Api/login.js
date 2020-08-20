import {httpPost} from '../http.js'

export function login (params) {
  return httpPost('/sys/user/login', params)
}
