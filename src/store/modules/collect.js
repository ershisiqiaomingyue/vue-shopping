// home模块的仓库
import { reqGetLike} from '@/api'

const state = {
    list:{}
}
const mutations = {
    GETLIKE (state, list) {
        state.list = list
    }
}
const actions = {
    // 获取喜欢的商品
    async getLike ({ commit },params={}) {
        const result = await reqGetLike(params)
        if (result.data.code === 200) {
            commit('GETLIKE', result.data.data)
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
