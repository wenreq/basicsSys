import {httpPost} from '../http.js'

export function areaList (params) {
  return httpPost('/login/user/areaList', params)
}

export function getEstateByStreet (params) {
  return httpPost('/product/getEstateByStreet', params)
}
