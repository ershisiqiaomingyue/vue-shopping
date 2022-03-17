// home模块的仓库
import {reqAllGoods, reqDetails, reqGetCategory, reqTotal} from '@/api'

const state = {
    goods:{},
    //total:'',
    category:[]
}
const mutations = {
    GETALLGOODS (state, goods) {
        state.goods = goods
    },
    GETCATEGORY(state,category){
        state.category = category
    }
    /*GETTOTAL(state,total) {
        state.total = total
    }*/
}
const actions = {
    // 获取商品详细信息
    async getAllGoods ({ commit },params = {}) {
        const result = await reqAllGoods(params)
        if (result.data.code === 200) {
            commit('GETALLGOODS', result.data.data)
        }
    },
    //获取种类
    async getCategory({commit}) {
        const result = await  reqGetCategory();
        if (result.code === 200) {
            commit('GETCATEGORY', result.data)
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
