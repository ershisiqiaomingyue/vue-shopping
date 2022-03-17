//路由配置文件
export const routes = [

    {
        path: '/',
        name: 'Home',
        component: () => import('@/views/Home')
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
        props:(route)=>({
            keyword:route.params.keyword
        })
    },
    {
        path: '/details/:productid',
        name: 'Details',
        component: () => import('@/views/Details')
    },
    {
        path: '/shoppingCart',
        name: 'ShoppingCart',
        component: () => import('@/views/ShoppingCart'),
        meta: {
            requireAuth: true // 需要验证登录状态
        }
    },
    {
        path: '/collect',
        name: 'Collect',
        component: () => import('@/views/Collect'),
        meta: {
            requireAuth: true // 需要验证登录状态
        }
    },
    {
        path: '/order',
        name: 'Order',
        component: () => import('@/views/Order'),
        meta: {
            requireAuth: true // 需要验证登录状态
        }
    },
    {
        path: '/confirmOrder',
        name: 'ConfirmOrder',
        component: () => import('@/views/ConfirmOrder'),
        meta: {
            requireAuth: true // 需要验证登录状态
        }
    }
]
