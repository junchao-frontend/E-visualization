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

// 地图散点数据
export function getmapData (payload) {
  return request({
    url: '/api/map',
    method: 'get',
    data: payload
  })
}

// 销售排行数据
export function getrankData (payload) {
  return request({
    url: '/api/rank',
    method: 'get',
    data: payload
  })
}

// 热销商品占比数据
export function gethotData (payload) {
  return request({
    url: '/api/hotproduct',
    method: 'get',
    data: payload
  })
}

// 库存销量数据
export function getstockData (payload) {
  return request({
    url: '/api/stock',
    method: 'get',
    data: payload
  })
}
