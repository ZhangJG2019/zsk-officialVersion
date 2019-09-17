import http from './public'
// 任务大厅数据列表展示
export const taskHall = (params) => {
  return http.fetchPost('/apis/taskApi/visitorTask', params)
}
// 任务大厅顶部查询option展示
export const searchOptions = (params) => {
  return http.fetchGet('/apis/taskApi/taskMenuInfoSelect?taskId=' + params)
}

// 任务大厅弹窗中基因名称数据获取
export const getGene = (params) => {
  return http.fetchGet('/apis/taskApi/genes', params)
}
// 任务大厅弹窗中search请求
export const getSearch = (params) => {
  return http.fetchPost('/apis/taskApi/search', params)
}
// 任务大厅顶部筛选条件
export const reLoad = (params) => {
  return http.fetchGet('/apis/taskApi/reload', params)
}
// 任务大厅点击领取按钮修改状态
export const receiveTask = (params) => {
  return http.fetchPost('/apis/task/updateFlag', params)
}
// 任务大厅弹窗中通过按钮
export const Save = (params) => {
  return http.fetchPost('/apis/taskApi/submitTask', params)
}
// 任务大厅--放弃任务
export const giveUpTask = (params) => {
  return http.fetchPost('/apis/task/giveUpTask', params)
}
// 任务大厅-不通过按钮（和提交按钮共用一个方法）
