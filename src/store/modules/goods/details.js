// home模块的仓库
import {reqAddLike, reqDetails} from '@/api'

const state = {
    goodsInfo:{}
}
const mutations = {
    GETDETAILS (state, goodsInfo) {
        state.goodsInfo = goodsInfo
    }
}
const actions = {
    // 获取商品详细信息
    async getDetails ({ commit },productID) {
        const result = await reqDetails(productID)
        if (result.data.code === 200) {
            commit('GETDETAILS', result.data.data)
        }
    },
    //添加喜欢
    async addLike ({ commit },params={}) {
        const result = await reqAddLike(params)
        if (result.data.code === 200) {
            this.notifySucceed(result.data.msg);
        }else{
            this.notifyError(result.data.msg)
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
