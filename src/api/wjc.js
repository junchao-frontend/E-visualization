import request from '@/utils/request'
export function Ceshi (payload) {
  return request({
    url: '/api/map',
    method: 'get',
    data: payload
  })
}
