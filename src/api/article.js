import request from '@/utils/request'

// 分类：获取文章分类
export const artGetChannelsService = () => {
  return request.get('/my/cate/list')
}

// 分类：提交文章分类
export const artEditChannelsService = (data) => {
  return request.put('/my/cate/info', data)
}

// 分类：增加文章分类
export const artAddChannelsService = (data) => {
  return request.post('/my/cate/add', data)
}

// 分类：删除文章分类
export const artDelChannelsService = (id) => {
  return request.delete('/my/cate/del', {
    params: { id }
  })
}

// 管理：获取文章列表
export const artGetListService = (params) => {
  return request.get('/my/article/list', {
    params
  })
}

// 文章：添加文章
export const artPublishService = (data) => {
  return request.post('/my/article/add', data)
}

// 文章：获取文章
export const artGetDetailService = (id) => {
  return request.get('/my/article/info', { params: { id } })
}

// 文章：编辑文章
export const artEditService = (data) => {
  return request.put('/my/article/info', data)
}

// 文章：删除文章
export const artDeleteService = (id) => {
  return request.delete('/my/article/info', { params: { id } })
}
