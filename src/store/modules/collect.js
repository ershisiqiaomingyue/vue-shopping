// home模块的仓库
import api from '@/api/index.js'

const state = {
    list:{},
    collectNum:null
}

const mutations = {
    getLike (state, data) {
        state.list = data.productList
        state.collectNum = data.total
    }
}

const actions = {
    // 获取喜欢的商品
    async getLike ({ commit },data) {
        if (data === undefined){
            data = {
                pageSize:5,
                currentPage:1
            }
        }
        const res = await api.reqGetLikeProduct(data)
        if (res.code === 200) {
            commit('getLike', res.data)
            return res
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
