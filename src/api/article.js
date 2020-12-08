import request from '@/utils/request'
import qs from 'qs'

export function getArticlesInfo(queryData) {
  return request({
    url: '/getArticles',
    method: 'get',
    params: queryData
  })
}

export function getArticleDetailById(id) {
  return request({
    url: '/getArticleDetail',
    method: 'get',
    params:{
      articleId:id,
    }
  })
}

export function getAllCategories() {
  return request({
    url: '/getAllCategories',
    method: 'get',
  })
}

export function getAllTags() {
  return request({
    url: '/getAllTags',
    method: 'get',
  })
}

export function publishArticle(formData, type) {
  formData['articleCreateTime'] = (new Date()).valueOf();
  formData['articleSlug'] = formData['articleSlug'].replace(/\s+/g, "-")
  return request({
    url: '/publishArticle',
    method: 'post',
    data:qs.stringify({
        article:JSON.stringify(formData),
        dynamicTags:JSON.stringify(formData['dynamicTags']),
        publishType:type
       }),
  })
}

// export function editArticle(id) {
//   return request({
//     url: '/editArticle',
//     method: 'post',
//     data:{'articleId' : id},
//   })
// }

export function deleteArticle(id) {
  return request({
    url: '/deleteArticle',
    method: 'post',
    data:qs.stringify({articleId:id}),
  })
}

export function uploadImg(formData) {
  return request({
    url: '/uploadImg',
    method: 'post',
    headers: {
      'Content-Type':'multipart/form-data; charset=utf-8',
  },
    data:formData
  })
}

