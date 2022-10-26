<template>
  <div id="details">
    <!-- 头部 -->
    <div class="page-header">
      <div class="title">
                <p>{{product.productName}}</p>
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
        <div>
          <el-card shadow="none" style="height: 570px">
            <el-carousel height="560px" v-if="product.productImg !== null">
              <el-carousel-item v-for="item in product.productImg" :key="item.productId">
                <img style="height:100%;width: 100%;" :src="item" />
              </el-carousel-item>
            </el-carousel>
            <div v-else>
              <img
                  :src="product.productPicture"
                  style="height:560px;"
                  alt="#"/>
            </div>
          </el-card>
        </div>



      </div>
      <!-- 左侧商品轮播图END -->

      <!-- 右侧内容区 -->
      <div class="content">
        <h1 class="name">{{ product.productName }}</h1>
        <p class="intro">{{ product.content }}</p>
        <p class="store">小米自营</p>
        <div class="price">
          <span>{{ product.sellingPrice }}元</span>
          <span
              v-show="product.price != product.sellingPrice"
              class="del"
          >{{ product.price }}元</span>
          <span style="float: right;color: #fc0505">库存：{{product.totalStocks}}</span>
        </div>
        <div class="pro-list">
          <span class="pro-name">{{ product.productName }}</span>
          <br>
          <span>
             数量：<el-button icon="el-icon-circle-plus-outline" type="text" @click="addSum">1</el-button>
          </span>

          <p class="price-sum">总计 : {{ product.sellingPrice }}元×{{ productNum }} = {{ productSum }}元</p>
        </div>
        <!-- 内容区底部按钮 -->
        <div class="button">
          <el-button :disabled="dis" class="shop-cart" @click="addShoppingCart">加入购物车</el-button>
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
      productId: "", // 商品id
      productNum: 1,
    };
  },
  // 通过路由获取商品id
  activated() {
    if (this.$route.params.productId !== undefined) {
      this.productId = this.$route.params.productId;
    }
  },
  watch: {
    // 监听商品id的变化，去vuex仓库中获取数据
    productId(val) {
      this.getDetails(val);
    },
  },
  methods: {
    ...mapActions(['unshiftShoppingCart']),
    //增加数量
    addSum() {
      if (this.productNum === this.product.totalStocks) {
        this.notifyError('商品无法添加至购物车，库存不足！')
        return;
      }
      this.productNum++
    },

    async getDetails(val){
      await this.$store.dispatch('getProductDetails',val)
    },

    async addShoppingCart() {
      // 判断是否登录,没有登录则显示登录组件,加完购物车，要重新获取购物车信息，否则进入购物车不更新数据
      if (!localStorage.getItem('user')) {
        await this.$store.dispatch("setShowLogin", true);
        return;
      }
      //发送请求
      this.$api.reqAddShoppingCart({
        productNumber: this.productNum,
        productId: this.productId,
      }).then(res => {
        if (res.code === 200) {
          //同时派发请求，修改购物车数据
          this.$store.dispatch('unshiftShoppingCart', res.data)
         /* this.$bus.$emit('getData')*/
          this.notifySucceed(res.msg);
        } else {
          this.notifyError(res.msg);
        }
      }).catch(e => {
        return Promise.reject(e);
      })
    },

    //添加完后，还要再次发请求获得数据，否则进入收藏，数据不刷新
    async addCollect() {
      // 判断是否登录,没有登录则显示登录组件
      let user = localStorage.getItem("user")
      if (!user) {
        await this.$store.dispatch("setShowLogin", true);
        return;
      }
      //发送请求，请求中有token，从token可以获取到用户id
      this.$api.reqAddLike(this.productId)
          .then((res) => {
            if (res.code === 200) {
              this.notifySucceed(res.msg)
            } else {
              this.notifyError(res.msg)
            }
      })
    }
  },
  computed: {
    ...mapState({
      product:state => state.details.goodsInfo
    }),
    productSum() {
      return this.productNum * this.product.sellingPrice
    }
  }
};
</script>

<style scoped>
/* 头部CSS */
#details .page-header {
  height: 64px;
  margin-top: -20px;
  z-index: 4;
  background: #fff;
  border-bottom: 1px solid #e0e0e0;
  -webkit-box-shadow: 0 5px 5px rgba(0, 0, 0, 0.07);
  box-shadow: 0 5px 5px rgba(0, 0, 0, 0.07);
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
.el-carousel__item{
  background-color:#FFFFFF;
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
  background-color: #fa5757;
}

#details .main .content .button .like:hover {
  background-color: #fa5757;
}

#details .main .content .pro-policy li {
  float: left;
  margin-right: 20px;
  color: #b0b0b0;
}

/* 主要内容CSS END */
</style>
