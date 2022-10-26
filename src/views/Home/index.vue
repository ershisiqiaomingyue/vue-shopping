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
            <div class="promo-list" v-for="item in phoneMainImg">
              <router-link :to="`/details/productId=${item.productId}`">
                <img :src="item.productPicture"/>
              </router-link>
            </div>
            <div class="list">
              <List :list="phoneList" :isMore="true"></List>
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
              <ul v-for="(item,productId) in applianceMainImg" :key="productId">
                <li>
                  <router-link :to="`/details/productId=${item.productId}`">
                    <img :src="item.productPicture" />
                  </router-link>
                </li>
              </ul>
            </div>
            <div class="list">
              <List :list="applianceList" :isMore="true"></List>
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
              <ul v-for="(item,productId) in liveMainImg" :key="productId">
                <li>
                  <router-link :to="`/details/productId=${item.productId}`">
                    <img :src="item.productPicture" />
                  </router-link>
                </li>
              </ul>
            </div>
            <div class="list">
              <List :list="liveList" :isMore="true"></List>
            </div>
          </div>
        </div>
        <!-- 配件商品展示区域END -->
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  mounted () {
    //获取轮播图
    this.$store.dispatch('getBannerList');
    this.$store.dispatch('getPhoneMainImg')
    this.$store.dispatch('getApplianceMainImg')
    this.$store.dispatch('getLiveMainImg')
    this.$store.dispatch('getPhoneList')
    this.$store.dispatch('getApplianceList')
    this.$store.dispatch('getLiveList')

  },
  computed: {
    ...mapState({
      bannerList: state => state.banner.bannerList || {},
      phoneMainImg: state => state.home.phoneMainImg || [],
      applianceMainImg: state => state.home.applianceMainImg || [],
      liveMainImg: state => state.home.liveMainImg || [],
      phoneList: state => state.home.phoneList || [],
      applianceList: state => state.home.applianceList || [],
      liveList: state => state.home.liveList || []
    }),

  },
};
</script>
<style scoped>
@import "../../assets/css/index.css";
</style>
