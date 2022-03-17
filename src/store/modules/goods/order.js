// home模块的仓库
import {reqDeleteShoppingCart, reqGet, reqGetShoppingCart, reqPay} from '@/api'

const state = {
    orderList:[]
}
const mutations = {
    GET(state,orderList) {
        state.orderList = orderList
    }
}
const actions = {
    // 发送订单请求
    async pay ({ commit },params) {
        const result = await reqPay(params)
        if (result.data.code === 200) {
            let arr = []
            for (let i = 0; i < params.length; i++) {
                arr[i] = params[i]
                let user_id = arr[i].userId
                let product_id = arr[i].productId
                reqDeleteShoppingCart({
                    user_id,
                    product_id
                })
            }
        }
    },
    //获取订单
    async getOrder({commit },params={}) {
        const result = await reqGet(params)
        if (result.data.code === 200) {
            commit('GET', result.data.data)
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
