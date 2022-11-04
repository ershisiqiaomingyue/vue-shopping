// 当前这个模块：api进行统一管理

import request from './ajax'
import mockreq from './mockAjax'


//需要鉴权的api
let like = '/userCenter/auth/collect'
let shoppingCart = '/userCenter/auth/shoppingCart'
let order = '/order/auth'


export default {

    /**
     * 微信登录后，使用token获取用户信息
     */
    reqGetUserInfo(){
        return request({
            url:'/user/login/getUserInfo',
            method:'get'
        })
    },

    /**
     * 获取二维码
     */
    reqGetWxLoginQRCode() {
        return request({
            url:'api/ucenter/wx/getWxLoginQRCode',
            method:'get'
        })
    },


    //上传图片
    reqUploadImgList(data){
        return request({
            url:'/oss/file/uploadFiles',
            method:'post',
            data,
            headers:{
                'Content-Type':false
            }
        })
    },

    /*
        获取支付后的订单列表
     */
    reqGetOrder(data) {
        return request({
            url:`${order}/get`,
            method:'post',
            data
        })
    },



    /*
        支付
     */
    reqPay(data) {
        return request({
            url: `${order}/add`,
            method:'post',
            data
        })
    },


    /*
        修改所有商品的勾选状态
     */
    reqUpdateAllCheck(data) {
        return request({
            url:`${shoppingCart}/updateAllCheck`,
            method:'post',
            data,
        })
    },


    /*
        修改商品的勾选状态
     */
    reqUpdateChecked(data) {
        return request({
            url:`${shoppingCart}/updateCheck`,
            method:'post',
            data
        })
    },

    /*
        删除购物车的商品
     */
    reqDeleteShoppingCart(productId) {
        return request({
            url:`${shoppingCart}/deleteShoppingCart/${productId}`,
            method:'get'
        })
    },


    /*
        更新商品的数量
     */
    reqUpdateNum(data) {
        return request({
            url:`${shoppingCart}/updateNum`,
            data,
            method:'post'
        })
    },

    /*
        获取购物车信息
     */
    reqGetShoppingCart(data) {
        return request({
            url:`${shoppingCart}/getShoppingCartInfo`,
            method:'post',
            data
        })
    },


    /*
        添加购物车
     */
    reqAddShoppingCart(data) {
        return request({
            url:`${shoppingCart}/addShoppingCart`,
            data,
            method:'post',
            headers: {
                'Content-Type': 'application/json'
            }
        })
    },


    /**
     * 删除收藏中的商品
     * @param productId
     */
    reqDeleteCollect(productId) {
        return request({
            url:`${like}/deleteProduct/${productId}`,
            method:'get'
        })
    },

    /*
        获取收藏里的商品
     */
    reqGetLikeProduct(data) {
        return request({
            url:`${like}/getProduct`,
            method:'post',
            data
        })
    },


    /*
        将商品 添加为喜欢
     */
    reqAddLike(productId) {
        return request({
            url: `${like}/addLike`,
            method: 'post',
            data: productId,
            headers: {
                'Content-Type': 'application/json'
            }
        })
    },


    /*
        获取商品的详细信息
     */
    reqGetProductDetails(data) {
        return request({
            url: `product/getProductDetails/productId=${data}`,
            method: 'get'
        })
    },

    /*
        获取种类
     */
    reqGetCategory() {
        return request({
            url: 'product/getCategoryId',
            method: 'get',
        })
    },

    /*
        获取商品
     */
    reqGetProduct(data) {
        return request({
            url: 'product/getProduct',
            method: 'post',
            data
        })
    },


    /*
        校验注册时的各种字段
     */
    reqValidateNickname(data) {
        return request({
            url: 'user/register/validateNickname',
            method: 'post',
            data,
            headers: {
                'Content-Type': 'text/plain'
            }
        })
    },
    reqValidateUsername(data) {
        return request({
            url: 'user/register/validateUsername',
            method: 'post',
            data,
            headers: {
                'Content-Type': 'text/plain'
            }
        })
    },
    reqValidateEmail(data) {
        return request({
            url: 'user/register/validateEmail',
            method: 'post',
            data,
            headers: {
                'Content-Type': 'text/plain'
            }
        })
    },
    reqValidatePhone(data) {
        return request({
            url: 'user/register/validatePhone',
            method: 'post',
            data,
            headers: {
                'Content-Type': 'text/plain'
            }
        })
    },
    reqValidateCode(data) {
        return request({
            url: 'user/register/validateCode',
            method: 'post',
            data,
            headers: {
                'Content-Type': 'application/json'
            }
        })
    },
    reqGenerateCode(data) {
        return request({
            url: 'user/register/generateCode',
            method: 'post',
            data,
            headers: {
                'Content-Type': 'application/json'
            }
        })
    },
    reqValidatePassword(data) {
        return request({
            url: 'user/register/validatePassword',
            method: 'post',
            data,
            headers: {
                'Content-Type': 'text/plain'
            }
        })
    },
    reqCheckPasswordIsSame(data) {
        return request({
            url: 'user/register/checkPasswordIsSame',
            method: 'post',
            data,
            headers: {
                'Content-Type': 'application/json'
            }
        })
    },


    /*
        注册
     */
    reqRegister(data) {
        return request({
            url: 'user/register',
            method: 'post',
            data,
            headers: {
                'Content-Type': 'application/json'
            }
        })
    },

    /*
        登录
     */
    reqLogin(data) {
        return request({
            url: 'user/login',
            method: 'post',
            data
        })
    },

    //获取轮播图
    reqBannerList(){
        return mockreq.get('/banner')
    },

    /**
     * 获取主页的大图
     */
    reqGetMainImg(data){
        return request({
            url:`product/getMainImg/${data}`,
            method:'get'
        })
    },

    /**
     * 获取首页商品
     */
    reqGetHomeProduct(data){
        return request({
            url:`product/getProduct/${data}`,
            method:'get'
        })
    },


};
