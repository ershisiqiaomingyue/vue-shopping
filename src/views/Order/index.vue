<template>
  <div class="order-container">
    <!-- 我的订单主要内容 -->
    <div class="order-content" v-if="orders.length>0" >
      <div class="content" v-for="(item,index) in orders" :key="index">
        <ul>
          <!-- 我的订单表头 -->
          <li class="order-info">
            <div class="order-id">订单编号: {{item.orderId}}</div>
            <div class="order-time">订单时间: {{item.orderTime | dateFormat}}</div>
          </li>
          <li class="header">
            <div class="pro-img"></div>
            <div class="pro-name">商品名称</div>
            <div class="pro-price">单价</div>
            <div class="pro-num">数量</div>
            <div class="pro-total">小计</div>
          </li>
          <!-- 我的订单表头END -->

          <!-- 订单列表 -->
          <li class="product-list" v-for="(product,i) in item.productList" :key="i">
            <div class="pro-img">
              <router-link :to="{ path: '/details/productid', query: {productid:product.productId} }">
                <img :src="product.productPicture" />
              </router-link>
            </div>
            <div class="pro-name">
              <router-link
                  :to="{ path: '/details/productid', query: {productid:product.productId} }"
              >{{product.productName}}</router-link>
            </div>
            <div class="pro-price">{{product.price}}元</div>
            <div class="pro-num">{{product.productNum}}</div>
            <div class="pro-total pro-total-in">{{product.price*product.productNum}}元</div>
          </li>
        </ul>
        <div class="order-bar">
          <div class="order-bar-left">
            <span class="order-total">
              共
              <span class="order-total-num">{{total[index].totalNum}}</span> 件商品
            </span>
          </div>
          <div class="order-bar-right">
            <span>
              <span class="total-price-title">合计：</span>
              <span class="total-price">{{total[index].totalPrice}}元</span>
            </span>
          </div>
          <!-- 订单列表END -->
        </div>
      </div>

    </div>
    <!-- 我的订单主要内容END -->

    <!-- 订单为空的时候显示的内容 -->
    <div v-else class="order-empty">
      <div class="empty">
<!--        <h2>您的订单还是空的！</h2>
        <p>快去购物吧！</p>-->
      </div>
    </div>
    <!-- 订单为空的时候显示的内容END -->
  </div>
</template>
<script>
import {mapState} from "vuex";
import sideBar from "@/Layout/components/sideBar";
const defaultSearchObj = {
  currentPage:1,
  pageSize:3
}
export default {
  components:{
    sideBar
  },
  data(){
    return{
      searchObj:Object.assign({},defaultSearchObj)
    }
  },
  activated() {
    this.getData()
  },
  mounted() {
    this.$bus.$on('getData',()=>{
      this.getData()
    })
  },
  methods:{
    getData(){
      // 获取订单数据
      this.$store.dispatch('getOrder')
    },
    handleSizeChange(){

    },
    handleCurrentChange(){

    }
  },
  computed:{
    ...mapState({
      orders:state => state.order.orderList || []
    }),
    total(){
      let total = [];
      for (let i = 0; i < this.orders.length; i++) {
        const element = this.orders[i].productList;

        let totalNum = 0;
        let totalPrice = 0;
        for (let j = 0; j < element.length; j++) {
          const temp = element[j];
          totalNum += temp.productNum;
          totalPrice += temp.price * temp.productNum;
        }
        total.push({ totalNum, totalPrice });
      }
      return total
    }
  }
};
</script>
<style scoped>
.order-container{
  float: right;
  margin: 0 10px;
  background-color: #F5F5F5;
}

.order-container .content {
  width: 970px;
  background-color: #fff;
}

.order-container .content ul {
  background-color: #fff;
  color: #424242;
  line-height: 85px;
  margin-top: 10px;
}



/* 我的订单表头CSS */
.order-container .content ul .order-info {
  height: 60px;
  line-height: 60px;
  padding: 0 26px;
  color: #424242;
  border-bottom: 1px solid #ff6700;
}

.order-container .content ul .order-info .order-id {
  float: left;
  color: #ff6700;
}

.order-container .content ul .order-info .order-time {
  float: right;
}

.order-container .content ul .header {
  height: 85px;
  padding-right: 26px;
  color: #424242;
}
/* 我的订单表头CSS END */

/* 订单列表CSS */
.order-container .content ul .product-list {
  height: 85px;
  padding: 15px 26px 15px 0;
  border-top: 1px solid #e0e0e0;
}
.order-container .content ul .pro-img {
  float: left;
  height: 85px;
  width: 120px;
  padding-left: 80px;
}
.order-container .content ul .pro-img img {
  height: 80px;
  width: 80px;
}
.order-container .content ul .pro-name {
  float: left;
  width: 300px;
}
.order-container .content ul .pro-name a {
  font-size: 14px;
  color: #424242;
}
.order-container .content ul .pro-name a:hover {
  color: #ff6700;
}
.order-container .content ul .pro-price {
  float: left;
  width: 100px;
  padding-right: 18px;
  text-align: center;
}
.order-container .content ul .pro-num {
  float: left;
  width: 100px;
  text-align: center;
}
.order-container .content ul .pro-total {
  float: left;
  width: 100px;
  padding-right: 81px;
  text-align: right;
}
.order-container .content ul .pro-total-in {
  color: #ff6700;
}

.order-container .order-bar {
  width: 930px;
  padding: 0 20px;
  border-top: 1px solid #ff6700;
  height: 50px;
  line-height: 50px;
  background-color: #fff;
}
.order-container .order-bar .order-bar-left {
  float: left;
}
.order-container .order-bar .order-bar-left .order-total {
  color: #757575;
}
.order-container .order-bar .order-bar-left .order-total-num {
  color: #ff6700;
}
.order-container .order-bar .order-bar-right {
  float: right;
}
.order-container .order-bar .order-bar-right .total-price-title {
  color: #ff6700;
  font-size: 14px;
}
.order-container .order-bar .order-bar-right .total-price {
  color: #ff6700;
  font-size: 30px;
}
/* 订单列表CSS END */

/* 订单为空的时候显示的内容CSS */
.order-container .order-empty {
  position: absolute;
  left: 230px;
  top: 200px;
  width: 970px;
  margin: 0 auto;
}
.order-container .order-empty .empty {
  height: 600px;
  background: url(../../assets/imgs/暂无订单.png) no-repeat center;
  background-size: 600px;
  color: #b0b0b0;
  overflow: hidden;
}
/* 订单为空的时候显示的内容CSS END */
</style>
