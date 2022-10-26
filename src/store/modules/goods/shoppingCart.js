import api from '@/api'

const state = {
    shoppingCartList:[]
}
const mutations = {
    // 设置购物车状态
    setShoppingCart (state, data) {
        state.shoppingCartList = data;
    },
    unshiftShoppingCart(state, data) {
        // 添加购物车
        // 用于在商品详情页点击添加购物车,后台添加成功后，更新vuex状态
        state.shoppingCartList.unshift(data);
    },
    getShoppingCartList(state,shoppingCartList){
        state.shoppingCartList = shoppingCartList
    },
    allChecked (state, data) {
        // 点击全选按钮，更改每个商品的勾选状态
        for (let i = 0; i < state.shoppingCartList.length; i++) {
            state.shoppingCartList[i].isChecked = data
        }
    },
    updateCheck(state,data){
        state.shoppingCartList[data.index].isChecked = data.isChecked;
    },
    deleteProductById (state, id) {
        // 根据购物车id删除购物车商品
        for (let i = 0; i < state.shoppingCartList.length; i++) {
            const temp = state.shoppingCartList[i];
            if (temp.id === id) {
                state.shoppingCartList.splice(i, 1);
            }
        }
    },
    clearShoppingCart(state) {
        state.shoppingCartList = []
    },
}
const actions = {
    //清空购物车
    clearShoppingCart({commit}) {
        commit('clearShoppingCart');
    },
    //设置购物车状态
    setShoppingCart ({ commit }, data) {
        commit('setShoppingCart', data);
    },
    //在详情页面向后端发起请求后，再向购物车添加数据
    unshiftShoppingCart ({ commit }, data) {
        commit('unshiftShoppingCart', data);
    },
    //获取购物车的信息
    async getShoppingCartList ({ commit },data) {
        if (data === undefined) {
            data = {
                currentPage:1,
                pageSize:6
            }
        }
        const res = await api.reqGetShoppingCart(data);
        if (res.code === 200){
            commit('getShoppingCartList',res.data.productList)
            return res
        }
        if (res.code === 401){
            await this.$store.dispatch('setShowLogin', true)
        }
    },
    //更新购物车的数量
    async updateNum ({ commit }, params={}) {
        const result = await api.reqUpdateNum(params);
    },
    //删除
    async deleteShoppingCart ({ commit }, productId) {
        const res = await api.reqDeleteShoppingCart(productId);
        if (res.code === 200) {
            //this.notifySucceed(result.data.msg);
            //修改vuex的数据
            commit('deleteProductById',productId)
        }
        return res;
    },

    //更新选择
    async updateCheckedById({commit},data = {}) {
        const res = await api.reqUpdateChecked(data);
        if (res.code === 200) {
            commit("updateCheck",{
                index:data.index,
                isChecked:data.isChecked
            });
            return res;
        }
    },
    //更新全选
    allChecked ({ commit }, data) {
        commit('allChecked', data);
    },
    deleteShoppingCartById ({ commit }, id) {
        commit('deleteProductById', id);
    },

}
// 计算属性
const getters = {
    getNum (state) {
        // 购物车商品总数量
        let totalNum = 0;
        for (let i = 0; i < state.shoppingCartList.length; i++) {
            const temp = state.shoppingCartList[i];
            totalNum += temp.productNum;
        }
        return totalNum;
    },
    getIsAllCheck (state) {
        // 判断是否全选
        let isAllCheck = true;
        for (let i = 0; i < state.shoppingCartList.length; i++) {
            const temp = state.shoppingCartList[i];
            // 只要有一个商品没有勾选立即return false;
            if (!temp.isChecked) {
                isAllCheck = false;
                return isAllCheck;
            }
        }
        return isAllCheck;
    },
    getCheckGoods (state) {
        // 获取勾选的商品信息
        // 用于确认订单页面
        let checkGoods = [];
        for (let i = 0; i < state.shoppingCartList.length; i++) {
            const temp = state.shoppingCartList[i];
            if (temp.isChecked === true) {
                checkGoods.push(temp);
            }
        }
        return checkGoods;
    },
    getCheckNum (state) {
        // 获取购物车勾选的商品数量
        let totalNum = 0;
        for (let i = 0; i < state.shoppingCartList.length; i++) {
            const temp = state.shoppingCartList[i];
            if (temp.isChecked === true) {
                totalNum += temp.productNum;
            }
        }
        return totalNum;
    },
    totalPrice (state) {
        // 购物车勾选的商品总价格
        let totalPrice = 0;
        for (let i = 0; i < state.shoppingCartList.length; i++) {
            const temp = state.shoppingCartList[i];
            if (temp.isChecked === true) {
                totalPrice += temp.sellingPrice * temp.productNum;
            }
        }
        return totalPrice;
    }
}
export default {
    state,
    mutations,
    actions,
    getters
}
