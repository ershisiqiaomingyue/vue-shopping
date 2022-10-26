/*
 * @Description: Vuex入口
 * @Author: hai-27
 * @Date: 2020-02-07 16:23:00
 * @LastEditors: hai-27
 * @LastEditTime: 2020-02-25 22:51:50
 */
import Vue from 'vue'
import Vuex from 'vuex'

import user from './modules/user'
import banner from "./modules/mock/banner";
import home from "@/store/modules/home/home";
import details from "@/store/modules/goods/details";
import product from "@/store/modules/goods/product";
import shoppingCart from "@/store/modules/goods/shoppingCart";
import collect from "@/store/modules/collect";
import order from "@/store/modules/goods/order";
import md from "@/store/modules/mock/md";

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  modules: {
    user,
    shoppingCart,
    banner,
    home,
    details,
    product,
    collect,
    order,
    md
  }
})
