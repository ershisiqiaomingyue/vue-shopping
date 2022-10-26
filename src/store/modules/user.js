const state = {
    user: {}, // 登录的用户
    showLogin: false // 用于控制是否显示登录组件
}
const mutations = {
    setUser (state, data) {
      state.user = data;
    },
    setShowLogin (state, data) {
      state.showLogin = data;
    },
    deleteUser(state) {
        state.user = {}
    },
}
const actions = {
    setUser ({ commit }, data) {
      commit('setUser', data);
    },
    setShowLogin ({ commit }, data) {
      commit('setShowLogin', data);
    },
    deleteUser({commit}) {
        commit('deleteUser')
    },
}
const getters = {
    getUser (state) {
      return state.user
    },
    getShowLogin (state) {
      return state.showLogin
    }
}
export default {
  state,
  mutations,
  actions,
  getters
}
