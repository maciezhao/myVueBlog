import request from '@/utils/request'
import qs from 'qs'

export function login(user, pwd) {
  return request({
    url: '/login',
    method: 'post',
    data:qs.stringify({userName:user,password:pwd})
  })
}

export function getUserInfo(userName) {
  return request({
    url: '/getUserInfo',
    method: 'get',
    params:{userName:userName},
  })
}

export function logout() {
  return request({
    url: '/logout',
    method: 'post'
  })
}

export function modifyUserInfo(formData) {
  return request({
    url: '/modifyUserInfo',
    method: 'post',
    headers: {
      'Content-Type':'multipart/form-data; charset=utf-8',
  },
  data:formData
  })
}