import http from './public'

// 单点test
// export function getAction(url, parameter) {
//   return axios({
//     url: url,
//     method: 'get',
//     params: parameter
//   })
// }
// 单点登录
// export const getAction = (params) => {
//   return http.fetchPost('/front/login', params)
// }

// 登陆
export const userLogin = (params) => {
  return http.fetchPost('/front/login', params)
}
// 退出登陆
export const loginOut = (params) => {
  return http.fetchGet('/front/logout/' + params)
}
// 用户信息
export const userInfo = () => {
  return http.fetchGet('/front/getUserInfo')
}

// 注册账号
export const regist = (params) => {
  return http.fetchPost('/front/regist', params)
}
// 重置密码
export const resetpwd = (params) => {
  return http.fetchPost('/front/resetPW', params)
}
// 发送留言
export const sendmsg = (params) => {
  return http.fetchPost('/front/send/email', params)
}
// 上传图片
export const upload = (params) => {
  return http.fetchPost('/front/imgaeUpload', params)
}
// 修改头像
export const updateheadimage = (params) => {
  return http.fetchPost('/front/updateheadimage', params)
}
// 推荐板块
export const recommend = (params) => {
  return http.fetchGet('/front/recommend', params)
}
// 任务大厅数据获取
// export const taskHall = (params) => {
//   return http.fetchPost('http://192.168.1.40:8099/apis/taskApi/visitorTask', params)
// }

// 获取token
// export const getToken = (params) => {
//   return http.fetchPost('/apis/', params)
// }
// 首页--下载
// export const Download = (params) => {
//   // return http.fetchGet('/apis/document/download?id=', params)
//   return http.fetchGet('/apis/taskApi/download?id=' + params)
// }
// header搜索框
export const getSearch = (params) => {
  return http.fetchGet('/apis/taskApi/queryAllResult', params)
}
// 快速搜索
export const getQuickSearch = (params) => {
  return http.fetchGet('/front/quickSearch', params)
}
