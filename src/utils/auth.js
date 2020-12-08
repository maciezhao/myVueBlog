import Cookies from 'js-cookie'

const TokenKey = 'blogToken'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function setUserName(userName) {
  return localStorage.userName = userName
}

export function getUserName() {
  return localStorage.userName
}

export function removeUserName() {
  return localStorage.removeItem('userName')
}
