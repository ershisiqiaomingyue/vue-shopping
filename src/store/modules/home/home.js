// home模块的仓库


import api from "@/api";

const state = {
    phoneMainImg:[],
    applianceMainImg:[],
    liveMainImg:[],
    phoneList:[],
    applianceList:[],
    liveList:[]
}
const mutations = {
    getPhoneMainImg(state,data){
        state.phoneMainImg = data
    },
    getApplianceMainImg(state,data){
        state.applianceMainImg = data
    },
    getLiveMainImg(state,data){
        state.liveMainImg = data
    },
    getPhoneList(state, phoneList) {
        state.phoneList = phoneList
    },
    getApplianceList(state,applianceList) {
        state.applianceList = applianceList
    },
    getLiveList(state,liveList) {
        state.liveList = liveList
    }
}
const actions = {
    // 获取首页的大图
    async getPhoneMainImg({commit}) {
        const res = await api.reqGetMainImg(1)
        if (res.code === 200) {
            commit('getPhoneMainImg',res.data)
        }
    },
    async getApplianceMainImg({commit}) {
        const res = await api.reqGetMainImg(2)
        if (res.code === 200) {
            commit('getApplianceMainImg',res.data)
        }
    },
    async getLiveMainImg({commit}) {
        const res = await api.reqGetMainImg(3)
        if (res.code === 200) {
            commit('getLiveMainImg',res.data)
        }
    },
    // 获取首页手机列表
    async getPhoneList ({ commit }) {
        const res = await api.reqGetHomeProduct(1)
        if (res.code === 200) {
            commit('getPhoneList', res.data)
        }
    },
    // 获取首页家电的列表
    async getApplianceList ({ commit }) {
        const res = await api.reqGetHomeProduct(2)
        if (res.code === 200) {
            commit('getApplianceList', res.data)
        }
    },
    // 获取首页家电的列表
    async getLiveList ({ commit }) {
        const res = await api.reqGetHomeProduct(3)
        if (res.code === 200) {
            commit('getLiveList', res.data)
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
