import request from '../utils/request'
// 销售图表数据
export function getsalesData (payload) {
  return request({
    url: '/api/seller',
    method: 'get',
    data: payload
  })
}
