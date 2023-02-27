//引入登录|退出登录|获取用户信息的接口函数
import { login, logout, getInfo } from '@/api/user'
//获取token|设置token|删除token的函数
import { getToken, setToken, removeToken } from '@/utils/auth'
//路由模块当中重置路由的方法
import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    //获取token
    token: getToken(),
    //存储用户名
    name: '',
    //存储用户头像
    avatar: '',
  }
}

const state = getDefaultState()

const mutations = {
  //重置state
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  //存储token
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  // //存储用户名
  // SET_NAME: (state, name) => {
  //   state.name = name
  // },
  // //存储用户头像
  // SET_AVATAR: (state, avatar) => {
  //   state.avatar = avatar
  // }
  //存储用户信息
  SET_USERINFO: (state, userInfo) => {
    //用户名
    state.name = userInfo.name
    //用户头像
    state.avatar = userInfo.avatar
  },
}

const actions = {
  // 登录业务
  async login({ commit }, userInfo) {
    //解构出用户名和密码
    const { username, password } = userInfo
    let result = await login({ username: username.trim(), password: password })
    if (result.code === 20000) {
      //存储token
      commit('SET_TOKEN', result.data.token)
      setToken(result.data.token)
      return 'ok'
    } else {
      return Promise.reject(new Error("faile"))
    }

    // return new Promise((resolve, reject) => {
    //   login({ username: username.trim(), password: password }).then(response => {
    //     const { data } = response
    //     commit('SET_TOKEN', data.token)
    //     setToken(data.token)
    //     resolve()
    //   }).catch(error => {
    //     reject(error)
    //   })
    // })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        //获取用户信息：返回数据包含：用户名、用户头像、routes【返回的标志：不同的用户一个展示哪些菜单的数据】、roles(用户角色信息)、buttons【按钮信息，按钮权限使用的标志】
        const { data } = response
        if (!data) {
          return reject('Verification failed, please Login again.')
        }
        //vuex存储用户全部的信息
        commit("SET_USERINFO", data)
        resolve(data)
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

