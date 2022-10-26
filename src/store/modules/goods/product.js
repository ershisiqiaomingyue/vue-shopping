// home模块的仓库
import api from '@/api/index'

const state = {
    productList:{},
    total:null,
    category:[],

}

const mutations = {
    GETALLGOODS (state, productList) {
        state.productList = productList
    },
    GETCATEGORY(state,category){
        state.category = category
    },
    GETTOTAL(state,total) {
        state.total = total
    },


}

const actions = {
    // 获取商品
    async getProduct ({ commit },params = {}) {
        const res = await api.reqGetProduct(params)
        if (res.code === 200) {
            commit('GETALLGOODS', res.data.records)
            commit('GETTOTAL',res.data.total)
        }
    },
    //获取种类
    async getCategory({commit}) {
        const res = await  api.reqGetCategory();

        if (res.code === 200) {
            commit('GETCATEGORY', res.data)
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
