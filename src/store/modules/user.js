import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'

export default {
  namespaced: true,
  state: {
    roles: [],
    test: 1
  },
  mutations: {
    ROLES: (state, arr) => {
      state.roles = [...arr]
    },
    CHANGE_TEST:  (state, num) => {
      state.test += num
    }
  },
  actions: {
    getInfo ({ commit }) {
      return new Promise((resolve, reject) => {
        // getInfo(state.token).then(response => {
        let arrRoles = ['admin']
        commit('ROLES', arrRoles)
        resolve({ roles: arrRoles })
        // }).catch(error => {
        // reject(error)
        // })
      })
    },
    changeTest ({ commit }, num) {
      commit('CHANGE_TEST', num)
    }
  }
}
