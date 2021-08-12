import request from '../utils/request'
// 商家销售数据
export function getsalesData (payload) {
  return request({
    url: '/api/seller',
    method: 'get',
    data: payload
  })
}

// 地区销量趋势数据
export function gettrendData (payload) {
  return request({
    url: '/api/trend',
    method: 'get',
    data: payload
  })
}
