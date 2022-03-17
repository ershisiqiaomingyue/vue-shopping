// 对于axios进行二次封装
import axios from 'axios'
import router from "../router";
import Vue from "vue";
import store from "../store";
// 引入进度条的样式

// 利用axios对象的方法create，创建一个axios实例
const ajax = axios.create({
    // 配置对象
    //能否跨域
    //withCredentials: true,
    // 基础路径，发送请求的时候，路径当中都会带有/api
    baseURL: '/api',
    // 代码请求超时的时机为5s
    timeout: 5000,
    //请求头
    /*headers: {
      'Cache-Control': 'no-cache',
      //'Content-Type':'application/x-www-form-urlencoded'
      'Content-Type':'application/json'
    }*/
})

//请求拦截器
ajax.interceptors.request.use(
    config => {
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
    res => {
        if (res.data.code === "401") {
            // 401表示没有登录
            // 提示没有登录
            Vue.prototype.notifyError(res.data.msg);
            // 修改vuex的showLogin状态,显示登录组件
            store.dispatch("setShowLogin", true);
        }
        if (res.data.code === "500") {
            // 500表示服务器异常
            // 跳转error页面
            router.push({ path: "/error" });
        }
        return res;
    },
    error => {
        // 跳转error页面
        router.push({ path: "/error" });
        return Promise.reject(error);
    }
);

// 对外暴露
export default ajax
