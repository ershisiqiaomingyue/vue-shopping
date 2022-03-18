const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  productionSourceMap:false,
  // 关闭lint校验
  lintOnSave: false,
  publicPath: './',
  devServer: {
    open: true,
    proxy: {
      '/api': {
        //target: 'http://localhost:8000', // 本地后端地址*/
        target: 'http://store.zxpersonalweb.top:5000', // 线上后端地址
        ws:true,
        changeOrigin: true, //允许跨域
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
})
