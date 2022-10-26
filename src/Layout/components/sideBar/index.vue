<template>
  <el-card class="sidebar" shadow="always">
    <div class="menu-box">
      <h3 class="title">订单中心</h3>
      <ul class="list">
        <li>
          <router-link to="/orderCenter/order" :class="{active:name==='Order'}">我的订单</router-link>
        </li>
        <li>
          <a href="#" class="no-impl">评价晒单</a>
        </li>
        <li>
          <a href="#" class="no-impl">话费充值订单</a>
        </li>
        <li>
          <a href="#" class="no-impl">以旧换新订单</a>
        </li>
      </ul>
    </div>
    <div class="menu-box">
      <h3 class="title">个人中心</h3>
      <ul class="list">
        <li>
          <router-link to="/center/userCenter" :class="{active:name==='UserCenter'}">我的购物中心</router-link>
        </li>
        <li>
          <router-link to="/center/shoppingCart" :class="{active:name==='ShoppingCart'}">我的购物车</router-link>
        </li>
        <li>
          <router-link to="/center/collect" :class="{active:name==='Collect'}">我的收藏</router-link>
        </li>
        <li>
          <a href="#" class="no-impl">我的消息</a>
        </li>
        <li>
          <a href="#" class="no-impl">消息通知</a>
        </li>
        <li>
          <a href="#" class="no-impl">现金账户</a>
        </li>
        <li>
          <a href="#" class="no-impl">现金券</a>
        </li>
        <li>
          <a href="#" class="no-impl">优惠券</a>
        </li>
        <li>
          <a href="#" class="no-impl">收货地址</a>
        </li>
        <li>
          <a href="#" class="no-impl">红包</a>
        </li>
        <li>
          <router-link to="/center/test" style="color: red">测试页</router-link>
        </li>
      </ul>
    </div>
    <div class="menu-box">
      <h3 class="title">售后服务</h3>
      <ul class="list">
        <li>
          <a href="#" class="no-impl">服务记录</a>
        </li>
        <li>
          <a href="#" class="no-impl">申请服务</a>
        </li>
        <li>
          <a href="#" class="no-impl">领取快递报销</a>
        </li>
      </ul>
    </div>
    <div class="menu-box">
      <h3 class="title">账号管理</h3>
      <ul class="list">
        <li>
          <router-link to="/account/userInfo" :class="{active:name==='UserInfo'}">个人信息</router-link>
        </li>
        <li>
          <router-link to="/account/updateInfo" :class="{active:name==='UpdateInfo'}">修改密码</router-link>
        </li>
        <li>
          <a href="#" class="no-impl">注销服务</a>
        </li>
      </ul>
    </div>
  </el-card>
</template>

<script>
export default {
  name: "index",
  computed:{
    name(){
      return this.$route.name
    }
  }
}
</script>

<style scoped>
.sidebar{
  display: inline-block;
  position: relative;

  width: 232px;
  height: 1000px;
}
.sidebar .menu-box:first-child{
  padding: 10px 0 0 0;

}
.sidebar .menu-box{
  margin: 0 48px 12px;
}

.sidebar .menu-box .title{
  font-size: 16px;
  font-weight: 400;
  line-height: 52px;
  color: #333333;
  margin: 0;
  width: 138px;
  padding: 0;
}
.sidebar .menu-box .list{
  margin: 0;
  padding: 0;
  list-style: none;
}
.sidebar .menu-box .list>li {
  width: 138px;
  height: 21px;
  padding: 6px 0;
}
.sidebar .menu-box .list>li a{
  font-size: 14px;
  color: #757575;
}

.sidebar .menu-box .list>li a:active{
  color: #FF6700;
}

.sidebar .menu-box .list>li .active{
  color: #FF6700;
}

.sidebar .menu-box .list>li .no-impl{
  color: #b2bec8;
  pointer-events: none;
}




</style>
