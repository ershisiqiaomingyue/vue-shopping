import {reqDeleteShoppingCart, reqGetShoppingCart, reqUpdateChecked, reqUpdateShoppingCart} from '@/api'

const state = {
    shoppingCartList:{}
}
const mutations = {
    // 设置购物车状态
    SETSHOPPINGCART (state, data) {
        state.shoppingCartList = data;
    },
    UNSHIFTSHOPPINGCART(state, data) {
        // 添加购物车
        // 用于在商品详情页点击添加购物车,后台添加成功后，更新vuex状态
        state.shoppingCartList.unshift(data);
    },
    GETSHOPPINGCARTLIST(state,shoppingCartList){
        state.shoppingCartList = shoppingCartList
    },
    ALLCHECKED (state, data) {
        // 点击全选按钮，更改每个商品的勾选状态
        for (let i = 0; i < state.shoppingCartList.length; i++) {
            state.shoppingCartList[i].isChecked = data
        }
    },
    UPDATE(state,params){
        state.shoppingCartList[params.index].isChecked = params.value;
    },
    DELETESHOPPINGCARTBYID (state, id) {
        // 根据购物车id删除购物车商品
        for (let i = 0; i < state.shoppingCartList.length; i++) {
            const temp = state.shoppingCartList[i];
            if (temp.id == id) {
                state.shoppingCartList.splice(i, 1);
            }
        }
    },
}
const actions = {
    //设置购物车状态
    setShoppingCart ({ commit }, data) {
        commit('SETSHOPPINGCART', data);
    },
    unshiftShoppingCart ({ commit }, data) {
        commit('UNSHIFTSHOPPINGCART', data);
    },
    //获取购物车的信息
    async getShoppingCartList ({ commit },params={}) {
        const result = await reqGetShoppingCart(params)
        if (result.data.code == 200){
            commit('GETSHOPPINGCARTLIST',result.data.data)
        }
    },
    //更新购物车的数量
    async updateShoppingCart ({ commit }, params={}) {
        const result = await reqUpdateShoppingCart(params);
    },
    //删除
    async deleteShoppingCart ({ commit }, params={}) {
        const result = await reqDeleteShoppingCart(params);
        if (result.data.code === 200) {
            this.notifySucceed(result.data.msg);
        } else {
            this.notifyError(result.data.msg)
        }
    },

    //更新选择
    async updateCheckedById({commit}, params={}) {
        const result = await reqUpdateChecked({
            product_id:params.product_id,
            is_checked:params.is_checked,
            user_id: params.user_id,
        });
        commit("UPDATE",{index:params.index,value:params.event})
    },
    //更新全选
    allChecked ({ commit }, data) {
        commit('ALLCHECKED', data);
    },
    deleteShoppingCartById ({ commit }, id) {
        commit('DELETESHOPPINGCARTBYID', id);
    },

}
// 计算属性
const getters = {
    getNum (state) {
        // 购物车商品总数量
        let totalNum = 0;
        for (let i = 0; i < state.shoppingCartList.length; i++) {
            const temp = state.shoppingCartList[i];
            totalNum += temp.totalNum;
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
            if (temp.isChecked == 1) {
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
            if (temp.isChecked == 1) {
                totalNum += temp.totalNum;
            }
        }
        return totalNum;
    },
    totalPrice (state) {
        // 购物车勾选的商品总价格
        let totalPrice = 0;
        for (let i = 0; i < state.shoppingCartList.length; i++) {
            const temp = state.shoppingCartList[i];
            if (temp.isChecked == 1) {
                totalPrice += temp.productPrice * temp.totalNum;
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
