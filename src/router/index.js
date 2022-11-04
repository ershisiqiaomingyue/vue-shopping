import Vue from 'vue'
import Router from 'vue-router'
import {routes} from "./routes";
import store from "../store";

Vue.use(Router)

const router = new Router({
    // base: '/dist',
    mode: 'history',
    routes,
    //打开新网页后，直接跳转到最上方
    scrollBehavior() {
        //返回y=0，代表滚动条在最上方
        return {y:0}
    },
})

// 全局拦截器,在进入需要用户权限的页面前校验是否已经登录
router.beforeResolve((to, from, next) => {
    const user = window.localStorage.getItem('user')
    const token = window.localStorage.getItem('token')
    const storeUser = JSON.stringify(store.state.user.user)
    if (storeUser === '{}' && user !== null){
        store.dispatch('setUser',JSON.parse(user))
    }

    const isLogon = token !== null
    // 判断路由是否设置相应校验用户权限
    if (to.meta.requireAuth) {
        if (!isLogon) {
            // 没有登录，显示登录组件
            next(`${from.path}`);
            store.dispatch("setShowLogin", true);
        }else {
            next();
        }
    }else {
        next();
    }
});

/* 由于Vue-router在3.1之后把$router.push()方法改为了Promise。所以假如没有回调函数，错误信息就会交给全局的路由错误处理。
vue-router先报了一个Uncaught(in promise)的错误(因为push没加回调) ，然后再点击路由的时候才会触发NavigationDuplicated的错误(路由出现的错误，全局错误处理打印了出来)。*/
// 禁止全局路由错误处理打印
const originalPush = Router.prototype.push;
Router.prototype.push = function push (location, onResolve, onReject) {
    if (onResolve || onReject)
        return originalPush.call(this, location, onResolve, onReject)
    return originalPush.call(this, location).catch(err => err)
}

export default router
