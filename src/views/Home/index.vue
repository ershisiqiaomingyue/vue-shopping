<!--
 * @Description: 首页组件
 * @Author: hai-27
 * @Date: 2020-02-07 16:23:00
 * @LastEditors: hai-27
 * @LastEditTime: 2020-02-27 13:36:12
 -->
<template>
  <div class="home" id="home" name="home">
    <!-- 轮播图 -->
    <div class="block">
      <el-carousel height="460px">
        <el-carousel-item v-for="item in bannerList" :key="item.id">
          <img style="height:460px;" :src="item.imgUrl"  />
        </el-carousel-item>
      </el-carousel>
    </div>
    <!-- 轮播图END -->

    <div class="main-box">
      <div class="main">
        <!-- 手机商品展示区域 -->
        <div class="phone">
          <div class="box-hd">
            <div class="title">手机</div>
          </div>
          <div class="box-bd">
            <div class="promo-list">
              <router-link to>
                <img :src="homePhoneBigImg.productPicture"/>
              </router-link>
            </div>
            <div class="list">
              <List :list="homePhoneList" :isMore="true"></List>
            </div>
          </div>
        </div>
        <!-- 手机商品展示区域END -->

        <!-- 家电商品展示区域 -->
        <div class="appliance" id="promo-menu">
          <div class="box-hd">
            <div class="title">家电</div>
            <div class="more">
              <Menu/>
            </div>
          </div>
          <div class="box-bd">
            <div class="promo-list">
              <ul v-for="(item,id) in homeApplianceBigImg" :key="id">
                <li>
                  <img :src="item.productPicture" />
                </li>
              </ul>
            </div>
            <div class="list">
              <List :list="homeApplianceList" :isMore="true"></List>
            </div>
          </div>
        </div>
        <!-- 家电商品展示区域END -->

        <!-- 生活电器商品展示区域 -->
        <div class="accessory" id="promo-menu">
          <div class="box-hd">
            <div class="title">生活电器</div>
            <div class="more" id="more">
              <Menu/>
            </div>
          </div>
          <div class="box-bd">
            <div class="promo-list">
              <ul v-for="(item,id) in homeLiveBigImg" :key="id">
                <li>
                  <img :src="item.productPicture" alt />
                </li>
              </ul>
            </div>
            <div class="list">
              <List :list="homeLivelist" :isMore="true"></List>
            </div>
          </div>
        </div>
        <!-- 配件商品展示区域END -->
      </div>
    </div>
  </div>
</template>
<script>
import {mapGetters, mapState} from 'vuex'
export default {
  mounted () {
    //获取轮播图
    this.$store.dispatch('getBannerList');
    //获取手机列表
    this.$store.dispatch('getPhone')
    //获取家电列表
    this.$store.dispatch('getApplianceList')
    //获取生活电器的列表
    this.$store.dispatch('getLiveList')
  },
  computed: {
    ...mapGetters(['homePhoneBigImg','homeApplianceBigImg','homeLiveBigImg'
    ,'homeLivelist','homePhoneList','homeApplianceList']),
    ...mapState({
      bannerList: state => state.banner.bannerList || {},
    }),/*
    applianceList:{
      get(){
        return this.$store.getters.appliance
      },
      set(value){
        //return (value || '').slice(value.length -7 , value.length)
        return value;
      }
    },
    phoneList(){
      return this.$store.getters.homePhoneList
    },
    liveList:{
      get(){
        return this.$store.getters.liveOne
      },
      set(){
        return this.$store.getters.liveTwo
      }
    }*/
  },
};
</script>
<style scoped>
@import "../../assets/css/index.css";
</style>
