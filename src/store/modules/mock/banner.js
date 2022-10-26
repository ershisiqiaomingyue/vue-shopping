// home模块的仓库
import api from '@/api'

const state = {
  bannerList: []
}
const mutations = {
  GETBANNERLIST (state, bannerList) {
    state.bannerList = bannerList
  }
}
const actions = {
  // 获取首页轮播图的数据
  async getBannerList ({ commit }) {
    const res = await api.reqBannerList()
    if (res.code === 200) {
      commit('GETBANNERLIST', res.data)
    }
  }
}
// 计算属性
const getters = {
}
export default {
  state,
  mutations,
  actions,
  getters
}
