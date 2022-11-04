//路由配置文件
import Layout from "@/Layout";

export const routes = [


    /**
     * 普通页面
     */
    {
        path: '/',
        name: 'Home',
        component: () => import('@/views/Home')
    },
    {
        path:'/weixin/callback',
        name:'Callback',
        component:() => import('@/views/weixin/Callback.vue')
    },
    {
        path: '/register',
        name: 'Register',
        component: () => import('@/views/Register')
    },
    {
        path: '/error',
        name: 'Error',
        component: () => import('@/components/Error')
    },
    {
        path: '/goods/:keyword?',
        name: 'Goods',
        component: () => import('@/views/Goods'),
        props: (route) => ({
            keyword: route.params.keyword
        })
    },
    {
        path: '/details/productId=:productId?',
        name: 'Details',
        component: () => import('@/views/Details')
    },
    {
        path: '/confirmOrder',
        name: 'ConfirmOrder',
        component: () => import('@/views/ConfirmOrder'),
        meta: {
            requireAuth: true // 需要验证登录状态
        }
    },


    /**
     * 订单中心
     */
    {
        path: '/orderCenter',
        name: 'OrderCenter',
        component:Layout,
        redirect: '/orderCenter/order',
        meta: {
            title: '订单中心',
            requireAuth: true
        },
        children: [
            {
                path: 'order',
                name: 'Order',
                component: () => import('@/views/Order'),
                meta: {
                    title: '我的订单',
                    requireAuth: true // 需要验证登录状态
                }
            },
        ]
    },


    /**
     * 个人中心
     */

    {
        path: '/center',
        component: Layout,
        redirect: '/center/userCenter',
        meta: {
            title: '个人中心',
            requireAuth: true
        },
        children: [
            {
                path: 'userCenter',
                name: 'UserCenter',
                component: () => import('@/views/userCenter'),
                meta: {
                    title: '我的购物中心',
                    requireAuth: true
                }
            },
            {
                path: 'collect',
                name: 'Collect',
                component: () => import('@/views/Collect'),
                meta: {
                    title: '我的收藏',
                    requireAuth: true // 需要验证登录状态
                }
            },
            {
                path: 'shoppingCart',
                name: 'ShoppingCart',
                component: () => import('@/views/ShoppingCart'),
                meta: {
                    title: '我的购物车',
                    requireAuth: true // 需要验证登录状态
                }
            },
            {
                path: 'test',
                name: 'Test',
                component: () => import('@/views/test'),
                meta: {
                    title: '测试页'
                }
            },
        ]
    },


    /**
     * 账号管理
     */
    {
        path: '/account',
        name:'Account',
        redirect: '/account/userInfo',
        component: Layout,
        meta: {
            title:'账号管理',
        },
        children: [
            {
                path: 'userInfo',
                name: 'UserInfo',
                component: () => import('@/views/userCenter/userInfo'),
                meta: {
                    title: '个人信息',
                    requireAuth: true
                }
            },
            {
                path: 'updateInfo',
                name: 'UpdateInfo',
                component: () => import('@/views/userCenter/updateInfo'),
                meta: {
                    title: '修改密码',
                    requireAuth: true
                }
            },
        ]
    },




]
