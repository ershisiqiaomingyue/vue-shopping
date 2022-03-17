// home模块的仓库
import { reqGetMd} from '@/api'

const state = {
    info:""
}
const mutations = {
    GETMD (state, info) {
        state.info = info
    }
}
const actions = {
    // 获取首页轮播图的数据
    async getMd ({ commit }) {
        const result = await reqGetMd()
        if (result.code === 200) {
            commit('GETMD', result.data)
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
