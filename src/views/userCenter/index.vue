<template>
  <div class="container">

    <div class="main">

      <div class="portal-main">
        <div class="user-card">
          <h2 class="username">{{ getUser.nickName }}</h2>
          <p class="tip">晚上好！</p>
          <router-link to="/account/userInfo" class="link">修改个人信息></router-link>
          <img :src="getUser.avatar" alt="#" >
        </div>

        <div class="userInfo">
          <ul>
            <li>
              账号安全：<span class="level">普通</span>
            </li>
            <li>
              绑定手机：<span v-if="getUser.phone">{{ getUser.phone }}</span>
              <span v-else style="color: #FF6700">未绑定</span>
            </li>
            <li>
              绑定邮箱：<span v-if="getUser.email">{{ getUser.email }}</span>
              <span v-else style="color: #FF6700">未绑定</span>
            </li>
          </ul>
        </div>

      </div>

      <div class="portal-sub">
        <ul class="info-list">
          <li>
            <h3>
              购物车的商品数：<span class="num">{{getNum}}</span>
            </h3>
            <router-link to="/center/shoppingCart">
              查看购物车的商品>
              <img src="https://s01.mifile.cn/i/user/portal-icon-1.png" alt="#" class="icon">
            </router-link>
          </li>
          <li>
            <h3>
              待收货的订单：<span class="num">0</span>
            </h3>
            <a href="#">
              查看待收货的商品>
              <img src="https://s01.mifile.cn/i/user/portal-icon-2.png" alt="#" class="icon">
            </a>
          </li>
          <li>
            <h3>
              待评价的商品数：<span class="num">0</span>
            </h3>
            <a href="#">
              查看待评价的商品>
              <img src="https://s01.mifile.cn/i/user/portal-icon-3.png" alt="#" class="icon">
            </a>
          </li>
          <li>
            <h3>
              喜欢的商品：<span class="num">{{collectNum}}</span>
            </h3>
            <router-link to="/center/collect">
              查看喜欢的商品>
              <img src="https://s01.mifile.cn/i/user/portal-icon-4.png" alt="#" class="icon">
            </router-link>
          </li>
        </ul>
      </div>

    </div>
  </div>
</template>

<script>
import sideBar from "@/Layout/components/sideBar";
import {mapGetters, mapState} from "vuex";
export default {
  name: "index",
  components:{
    sideBar
  },
  computed:{
    ...mapGetters(['getUser','getNum']),
    ...mapState({
      collectNum: state => state.collect.collectNum
    })
  }
}
</script>

<style scoped>
.container{
  float: right;;
  background-color: #F5F5F5;
}

.main{
  padding: 36px 48px;
  width: 880px;
  height: 677px;
}

.portal-main{
  width: 888px;
  height: 224px;
  padding: 24px 0 0;
}

.main .portal-main .user-card{
  position: relative;
  float: left;
  width: 302px;
  height: 160px;
  padding: 40px 0 0 180px;
}

.user-card img {
  position: absolute;
  left: 0;
  top: 0;
  width: 160px;
  height: 160px;
  padding: 4px;
  border-radius: 160px;
  border: 1px solid #e0e0e0;
}

.user-card .username{
  font: 14px/1.5 Helvetica Neue,Helvetica,Arial,Microsoft Yahei,Hiragino Sans GB,Heiti SC,WenQuanYi Micro Hei,sans-serif;
  margin: 0;
  font-size: 24px;
  font-weight: 400;
  color: #616161;
}

.user-card .tip{
  margin: 0 0 10px;
  color: #b0b0b0;
  font-size: 14px;
}

.user-card .link{
  font-size: 12px;
  color: #ff6700;
}

.user-card .link:hover{
  text-decoration: none;
}

.main .portal-main .userInfo{
  float: right;
  width: 358px;
  margin-top: 35px;
}

.main .portal-main .userInfo ul {
  width: 358px;
  height: 99px;
}

.userInfo ul>li {
  padding: 6px 0;
  font-size: 14px;
  color: #757575;
}


.userInfo ul>li span{
  font-size: 12px;
}

.userInfo ul>li .level{
  color: #ffac13;
}

.portal-sub{
  border-top: 1px solid #e0e0e0;
  width: 882px;
  height: 381px;
}

.portal-sub .info-list{
  list-style-type: none;
  padding: 60px 0 0;
  margin: 0;
}

.portal-sub .info-list ul{
  float: left;
  width: 882px;
  height: 380px;

}

.info-list li {
  position: relative;
  float: left;
  width: 276px;
  height: 65px;
  padding-left: 112px;
  padding-top: 15px;
  margin-left: 14px;
  margin-bottom: 80px;
  color: #757575;
}


.info-list li a{
  font-size: 12px;
  color: #757575;
}

.info-list li a:hover{
  color: #FF6700;
}

.info-list li h3{
  font-size: 18px;
  font-weight: 400;
  margin-bottom: 5px;
}

.info-list li .num{
  color: #ff6700;
}

.info-list li a{
  font-size: 12px;
}

.info-list .icon{
  position: absolute;
  left: -10px;
  top: -10px;
  width: 100px;
  height: 100px;
  border-radius: 50%;
}

.clearfix:after{
  clear:both;
  content: " ";
  display: table;
}

</style>
