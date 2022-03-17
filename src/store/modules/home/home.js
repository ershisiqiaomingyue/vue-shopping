// home模块的仓库
import {reqApplianceList, reqBigPhoneImg, reqLiveList, reqPhoneList} from '@/api'

const state = {
    phoneList:[],
    applianceList:[],
    liveList:[]
}
const mutations = {
    GETPHONE(state, phoneList) {
        state.phoneList = phoneList
    },
    GETAPPLIANCELIST(state,applianceList) {
        state.applianceList = applianceList
    },
    GETLIVELIST(state,liveList) {
        state.liveList = liveList
    }
}
const actions = {
    // 获取首页手机列表
    async getPhone ({ commit }) {
        const result = await reqPhoneList()
        if (result.data.code === 200) {
            commit('GETPHONE', result.data.data)
        }
    },
    // 获取首页家电的列表
    async getApplianceList ({ commit }) {
        const result = await reqApplianceList()
        if (result.data.code === 200) {
            commit('GETAPPLIANCELIST', result.data.data)
        }
    },
    // 获取首页家电的列表
    async getLiveList ({ commit }) {
        const result = await reqLiveList()
        if (result.data.code === 200) {
            commit('GETLIVELIST', result.data.data)
        }
    },

}
// 计算属性
const getters = {
    homePhoneBigImg(state) {
        return state.phoneList[4] || []
    },
    homeApplianceBigImg(state) {
        return state.applianceList.slice(0,2)
    },
    homeLiveBigImg(state) {
        return state.liveList.slice(0,2)
    },
    homePhoneList(state){
        return state.phoneList.slice(0,7)
    },
    homeApplianceList(state) {
        return state.applianceList.slice(0,7)
    },
    homeLivelist(state){
        return state.liveList.slice(0,7)
    }
}
export default {
    state,
    mutations,
    actions,
    getters
}
