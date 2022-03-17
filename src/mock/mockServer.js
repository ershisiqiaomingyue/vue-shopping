/*
利用mockjs来mock数据接口
*/
import Mock from 'mockjs'
// 为什么引入他们的时候，不需要对外暴露？
/**
 * webpack默认对外暴露的：图片，json数据格式
 */
// 引入轮播图数据
import banner from './banner.json'
//引入种类数据
import category from  './category.json'
//引入md文件
import info from './info.json'
// 提供广告位轮播数据的接口
Mock.mock('/mock/banner', {
    code: 200,
    data: banner
})

Mock.mock('/mock/category',{
    code:200,
    data:category
})

Mock.mock('/mock/info',{
    code:200,
    data:info
})
