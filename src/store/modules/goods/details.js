// home模块的仓库
import api  from '@/api'

const state = {
    goodsInfo:{}
}
const mutations = {
    getProductDetails(state, product) {
        state.goodsInfo = product
    },
}
const actions = {

    async getProductDetails({commit}, params) {
        const res = await api.reqGetProductDetails(params);
        if (res.code === 200) {
            commit('getProductDetails',res.data)
        }
    },

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
