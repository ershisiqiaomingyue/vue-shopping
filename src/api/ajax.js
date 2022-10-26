// 对于axios进行二次封装
import axios from 'axios'
import router from "../router";
import Vue from "vue";
import store from "../store";
import message from "element-ui/packages/message";
// 引入进度条的样式

// 利用axios对象的方法create，创建一个axios实例
const ajax = axios.create({
    //能否跨域
    //withCredentials: true,
    // 基础路径，发送请求的时候，路径当中都会带有/api
    baseURL: '/api',
    // 代码请求超时的时机为5s
    timeout: 5000,
    //请求头
    /*headers: {
      'Cache-Control': 'no-cache',
      'Content-Type':'application/x-www-form-urlencoded'
      //'Content-Type':'application/json'
      //'Content-Type':'text/plain'
    }*/
})

//请求拦截器
ajax.interceptors.request.use(
    config => {
        let token = localStorage.getItem('token')
        if (!config.headers.hasOwnProperty('token') && token) {
            config.headers.token = token
        }
        return config;
    },
    error => {
        // 跳转error页面
        router.push({ path: "/error" });
        return Promise.reject(error);
    }
);



// 全局响应拦截器
ajax.interceptors.response.use(
    response => {
        let res = response.data
        //未登录
        if (res.code === 222) {
            store.dispatch("setShowLogin", true);
        }
        return res;
    },
    error => {
        //登录超时
        console.dir(error)
        if (error.response.status === 401) {
            router.replace("/")
            // 401表示没有登录或是token过期，判断本地是否有token，如果有删除它
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            // 提示没有登录
            //Vue.prototype.notifyError(error.response.data.msg);
            //同时删除vuex的user
            store.dispatch("deleteUser");
            store.dispatch('clearShoppingCart')

        }
        return Promise.reject(new Error(error.response.data.msg));
    }
);

// 对外暴露
export default ajax
