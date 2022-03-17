// home模块的仓库
import { reqBannerList } from '@/api'

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
    const result = await reqBannerList()
    if (result.code === 200) {
      commit('GETBANNERLIST', result.data)
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
