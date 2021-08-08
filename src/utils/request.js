import axios from 'axios'

const request = axios.create({
  baseURL: 'http://127.0.0.1:8888/'
})

// get 一遍用于查询 post 一般用于添加 put一般用于修改，完整替换 delete patch修改 局部修改

// 导出请求方法
export default request

// 谁要使用谁就加载reques模块
// 请求参数 请求头Headers 查询参数 Query 请求体Body 路径参数
