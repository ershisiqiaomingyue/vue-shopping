<template>
  <div id="details">
    <!-- 头部 -->
    <div class="page-header">
      <div class="title">
        <p>{{goodsInfo.productName}}</p>
        <div class="list">
          <ul>
            <li>
              <router-link to>概述</router-link>
            </li>
            <li>
              <router-link to>参数</router-link>
            </li>
            <li>
              <router-link to>用户评价</router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <!-- 头部END -->

    <!-- 主要内容 -->
    <div class="main">
      <!-- 左侧商品轮播图 -->
      <div class="block">
        <!--        <el-carousel height="560px" v-if="goodsInfo.productPicture.length>1">
                  <el-carousel-item v-for="item in goodsInfo.productPicture" :key="item.id">
                    <img style="height:560px;" :src="$target + item.product_picture" :alt="item.intro" />
                  </el-carousel-item>
                </el-carousel>-->
        <div >
          <img
              style="height:560px;"
              :src="goodsInfo.productPicture"
          />
        </div>
      </div>
      <!-- 左侧商品轮播图END -->

      <!-- 右侧内容区 -->
      <div class="content">
        <h1 class="name">{{goodsInfo.productName}}</h1>
        <p class="intro">{{goodsInfo.productInfo}}</p>
        <p class="store">小米自营</p>
        <div class="price">
          <span>{{goodsInfo.productSellingPrice}}元</span>
          <span
              v-show="goodsInfo.productPrice != goodsInfo.productSellingPrice"
              class="del"
          >{{goodsInfo.productPrice}}元</span>
        </div>
        <div class="pro-list">
          <span class="pro-name">{{goodsInfo.productName}}</span>
          <span class="pro-price">
            <span>{{goodsInfo.productSellingPrice}}元</span>
            <span
                v-show="goodsInfo.productPrice != goodsInfo.productSellingPrice"
                class="pro-del"
            >{{goodsInfo.productPrice}}元</span>
          </span>
          <br>
          <span>
             数量：<el-button  type="text" icon="el-icon-circle-plus-outline" @click="addSum">1</el-button>
          </span>

          <p class="price-sum">总计 : {{goodsInfo.productSellingPrice}}元*{{productNum}} = {{productSum}}元</p>
        </div>
        <!-- 内容区底部按钮 -->
        <div class="button">
          <el-button class="shop-cart" :disabled="dis" @click="addShoppingCart">加入购物车</el-button>
          <el-button class="like" @click="addCollect">喜欢</el-button>
        </div>
        <!-- 内容区底部按钮END -->
        <div class="pro-policy">
          <ul>
            <li>
              <i class="el-icon-circle-check"></i> 小米自营
            </li>
            <li>
              <i class="el-icon-circle-check"></i> 小米发货
            </li>
            <li>
              <i class="el-icon-circle-check"></i> 7天无理由退货
            </li>
            <li>
              <i class="el-icon-circle-check"></i> 7天价格保护
            </li>
          </ul>
        </div>
      </div>
      <!-- 右侧内容区END -->
    </div>
    <!-- 主要内容END -->
  </div>
</template>

<script>
import {mapActions, mapState} from "vuex";
export default {
  data() {
    return {
      dis: false, // 控制“加入购物车按钮是否可用”
      productID: "", // 商品id
      productNum:1,
    };
  },
  // 通过路由获取商品id
  activated() {
    if (this.$route.query.productid !== undefined) {
      this.productID = this.$route.query.productid;
    }
  },
  watch: {
    // 监听商品id的变化，请求后端获取商品数据
    productID(val) {
      this.getDetails(val);
    }
  },
  methods: {
    ...mapActions(['unshiftShoppingCart']),
    //增加数量
    addSum(){
      this.productNum++
    },
    async getDetails(val){
      await this.$store.dispatch('getDetails', val)
    },
    async addShoppingCart() {
      // 判断是否登录,没有登录则显示登录组件,加完购物车，要重新获取购物车信息，否则进入购物车不更新数据
      if (!this.$store.getters.getUser) {
        await this.$store.dispatch("setShowLogin", true);
        return;
      }
      //发送请求
      this.$api.reqAddShoppingCart({
        user_id: this.$store.getters.getUser.userId,
        total_num:this.productNum,
        product_id:this.productID,
        product_price:this.goodsInfo.productSellingPrice,
        product_picture:this.goodsInfo.productPicture,
        product_name:this.goodsInfo.productName,
        is_checked:0
      }).then(res=>{
        if(res.data.code == 200) {
          //同时派发请求，修改购物车数据
          this.$store.dispatch('unshiftShoppingCart',res.data.data[0])
          this.notifySucceed(res.data.msg);
        }else this.notifyError(res.data.msg);
      }).catch(e=>{
        return Promise.reject(e);
      })
    },
    //添加完后，还要再次发请求获得数据，否则进入收藏，数据不刷新
    async addCollect() {
      // 判断是否登录,没有登录则显示登录组件
      if (!this.$store.getters.getUser) {
        await this.$store.dispatch("setShowLogin", true);
        return;
      }
      this.$api.reqAddLike({
        user_id: this.$store.getters.getUser.userId,
        product_id:this.productID,
        product_selling_price:this.goodsInfo.productSellingPrice,
        product_picture:this.goodsInfo.productPicture,
        product_name:this.goodsInfo.productName,
        product_price:this.goodsInfo.productPrice
      }).then((res)=>{
        if (res.data.code == 200){
          this.notifySucceed(res.data.msg)
        }else{
          this.notifyError(res.data.msg)
        }
      })
      //await this.$store.dispatch('getLike', {user_id: this.$store.getters.getUser.userId})
    }
  },
  mounted() {
    //this.getDetails(this.productID);
    //需要向后端请求，获取商品数量，如果小于0，添加购物车会失败
  },
  computed:{
    ...mapState({
      goodsInfo:state => state.details.goodsInfo
    }),
    productSum(){
      return this.productNum*this.goodsInfo.productSellingPrice
    }
  },
};
</script>

<style>
/* 头部CSS */
#details .page-header {
  height: 64px;
  margin-top: -20px;
  z-index: 4;
  background: #fff;
  border-bottom: 1px solid #e0e0e0;
  -webkit-box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.07);
  box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.07);
}
#details .page-header .title {
  width: 1225px;
  height: 64px;
  line-height: 64px;
  font-size: 18px;
  font-weight: 400;
  color: #212121;
  margin: 0 auto;
}
#details .page-header .title p {
  float: left;
}
#details .page-header .title .list {
  height: 64px;
  float: right;
}
#details .page-header .title .list li {
  float: left;
  margin-left: 20px;
}
#details .page-header .title .list li a {
  font-size: 14px;
  color: #616161;
}
#details .page-header .title .list li a:hover {
  font-size: 14px;
  color: #ff6700;
}
/* 头部CSS END */

/* 主要内容CSS */
#details .main {
  width: 1225px;
  height: 560px;
  padding-top: 30px;
  margin: 0 auto;
}
#details .main .block {
  float: left;
  width: 560px;
  height: 560px;
}
#details .el-carousel .el-carousel__indicator .el-carousel__button {
  background-color: rgba(163, 163, 163, 0.8);
}
#details .main .content {
  float: left;
  margin-left: 25px;
  width: 640px;
}
#details .main .content .name {
  height: 30px;
  line-height: 30px;
  font-size: 24px;
  font-weight: normal;
  color: #212121;
}
#details .main .content .intro {
  color: #b0b0b0;
  padding-top: 10px;
}
#details .main .content .store {
  color: #ff6700;
  padding-top: 10px;
}
#details .main .content .price {
  display: block;
  font-size: 18px;
  color: #ff6700;
  border-bottom: 1px solid #e0e0e0;
  padding: 25px 0 25px;
}
#details .main .content .price .del {
  font-size: 14px;
  margin-left: 10px;
  color: #b0b0b0;
  text-decoration: line-through;
}
#details .main .content .pro-list {
  background: #f9f9fa;
  padding: 30px 60px;
  margin: 50px 0 50px;
}
#details .main .content .pro-list span {
  line-height: 30px;
  color: #616161;
}
#details .main .content .pro-list .pro-price {
  float: right;
}
#details .main .content .pro-list .pro-price .pro-del {
  margin-left: 10px;
  text-decoration: line-through;
}
#details .main .content .pro-list .price-sum {
  color: #ff6700;
  font-size: 24px;
  padding-top: 20px;
}
#details .main .content .button {
  height: 55px;
  margin: 10px 0 20px 0;
}
#details .main .content .button .el-button {
  float: left;
  height: 55px;
  font-size: 16px;
  color: #fff;
  border: none;
  text-align: center;
}
#details .main .content .button .shop-cart {
  width: 340px;
  background-color: #ff6700;
}
#details .main .content .button .shop-cart:hover {
  background-color: #f25807;
}

#details .main .content .button .like {
  width: 260px;
  margin-left: 40px;
  background-color: #b0b0b0;
}
#details .main .content .button .like:hover {
  background-color: #757575;
}
#details .main .content .pro-policy li {
  float: left;
  margin-right: 20px;
  color: #b0b0b0;
}
/* 主要内容CSS END */
</style>
