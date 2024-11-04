import request from '@/utils/request'

// 获取文章分类
export const artGetChannelsService = () => {
  return request.get('/my/cate/list')
}

// 提交文章分类
export const artEditChannelsService = (data) => {
  return request.put('/my/cate/info', data)
}

// 增加文章分类
export const artAddChannelsService = (data) => {
  return request.post('/my/cate/add', data)
}

// 删除文章分类
export const artDelChannelsService = (id) => {
  return request.delete('/my/cate/del', {
    params: { id }
  })
}
