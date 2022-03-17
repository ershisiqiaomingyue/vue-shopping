import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

// 引入MockServer.js
import '@/mock/mockServer'

// 全局函数及变量
import global from './plugins/global';
Vue.use(global);


import * as api from './api'

//这里可以封装api，直接调用，免去在组件中重复调用！
import Axios from 'axios';
Vue.prototype.$axios = Axios;

//引入时间戳
import './plugins/dateFormat'

//引入全局组件
import './plugins/globalComponent.js'

Vue.config.productionTip = false;

new Vue({
    router,
    store, beforeCreate() {
        //引入全局时间总线
        Vue.prototype.$bus = this
        //引入axios插件，以便全局使用！
        Vue.prototype.$api = api
    },
    render: h => h(App)
}).$mount('#app')
