// 当前这个模块：api进行统一管理

import mockRequests from './mockAjax'
import requests from './ajax'

//用户登录
export const login = (data)=>requests({
    url:'/login',
    method:'post',
    data: {
        account:data.account,
        password:data.password
    }
})

//获取轮播图
export const reqBannerList = () => mockRequests.get('/banner')

//引入md
export  const reqGetMd = () => mockRequests.get('/info')


//1、获取主页手机列表
export const reqPhoneList = () => requests({
    url:'/product/phone',
    method:'get'
})


//2、获取主页电视列表
export const reqApplianceList = () => requests({
    url:'/product/applianceList',
    method:'get'
})


//3、获取主页托扫的列表
export const reqLiveList = () => requests({
    url:'/product/liveList',
    method:'get'
})

//获取分类
export const reqGetCategory = () => mockRequests.get('/category')

//获取点击的商品的详细信息
export const reqDetails = (productID) => requests({
    url:`/product/details/${productID}`,
    method:'get'
})

//获取所有的商品,分页！
export const reqAllGoods = (params) => requests({
    url:'/product/allGoods',
    method:'post',
    data:params
})

//添加购物车
export const reqAddShoppingCart = (params) => requests({
    url:'/shoppingCart/add',
    method:'post',
    data:params
})

//添加喜欢
export const reqAddLike = (params) => requests({
    url:'/collect/add',
    method:'post',
    data:params
})

//获取购物车的信息
export const reqGetShoppingCart = (params) => requests({
    url:'/shoppingCart/info',
    method:'post',
    data:params
})

//更新购物车的商品数量
export const reqUpdateShoppingCart = (params) => requests({
    url:'/shoppingCart/update',
    method:'post',
    data:params
})

//删除商品
export const reqDeleteShoppingCart = (params) => requests({
    url:'/shoppingCart/delete',
    method:'post',
    data:params
})

//更新选项
export  const  reqUpdateChecked = (params) => requests({
    url:'/shoppingCart/updateCheck',
    method:'post',
    data:params
})

//获取喜欢的商品
export const reqGetLike = (user_id) => requests({
    url:'/collect/get',
    method:'post',
    data:user_id
})

//发送订单请求
export const reqPay = (data) => requests({
    url:'/add',
    method:'post',
    data
})

//获取订单
export const reqGet = (data) => requests({
    url:'/get',
    method:'post',
    data
})

//查找用户名是否已经
export const reqCheckAccount = (data) => requests({
    url:'/user/account/exists',
    method:'post',
    data
})

//申请账号
export const reqRegister = (data) => requests({
    url:'/user/account/register',
    method:'post',
    data
})


