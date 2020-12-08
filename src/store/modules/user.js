import { login, getUserInfo, modifyUserInfo, logout } from '@/api/user'
import { getToken, setToken, removeToken ,getUserName, setUserName, removeUserName} from '@/utils/auth'
import { resetRouter } from '@/router'
import md5 from 'js-md5';

const getDefaultState = () => {
  return {
    token: getToken(),
    name: getUserName(),
    avatar: ''
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login(username, md5(password)).then(response => {
        const data = response
        commit('SET_TOKEN', data.token)
        commit('SET_NAME', username)
        setToken(data.token)
        setUserName(username)
        location.reload()
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getUserInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getUserInfo(state.name).then(response => {
        if (!response) {
          reject('验证失败，请重新登录！')
        }
        commit('SET_AVATAR', response.userInfo.userAvatarPath)
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  modifyUserInfo({ commit }, data) {
    return new Promise((resolve, reject) => {
      modifyUserInfo(data).then(response => {
        if(response.code === 50018) {
          removeToken() // must remove  token  first
          removeUserName()
          resetRouter()
        }
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        removeToken() // must remove  token  first
        removeUserName()
        resetRouter()
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

