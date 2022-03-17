<!--
 * @Description: 全部商品页面组件(包括全部商品,商品分类,商品搜索)
 * @Author: hai-27
 * @Date: 2020-02-07 16:23:00
 * @LastEditors: hai-27
 * @LastEditTime: 2020-03-08 12:11:13
 -->
<template>
  <div class="goods" id="goods" name="goods">
    <!-- 面包屑 -->
    <div class="breadcrumb">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item to="/">首页</el-breadcrumb-item>
        <el-breadcrumb-item>全部商品</el-breadcrumb-item>
        <el-breadcrumb-item v-if="list.keyword">搜索</el-breadcrumb-item>
        <el-breadcrumb-item v-else>分类</el-breadcrumb-item>
        <el-breadcrumb-item v-if="list.keyword">{{list.keyword}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!-- 面包屑END -->

    <!-- 分类标签 -->
    <div class="nav">
      <div class="product-nav" >
        <div class="title">分类</div>
        <el-tabs v-model="list.categoryID" type="card">
          <el-tab-pane
              v-for="item in category"
              :key="item.categoryId"
              :label="item.categoryName"
              :name="item.categoryId"
          />
        </el-tabs>
      </div>
    </div>
    <!-- 分类标签END -->

    <!-- 主要内容区 -->
    <div class="main">
      <div class="list">
        <List :list="goodsList" v-if="goodsList.length>0"></List>
        <div v-else class="none-product">抱歉没有找到相关的商品，请看看其他的商品</div>
      </div>
      <!-- 分页 -->
      <div class="pagination">
        <el-pagination
            @size-change="findSizeChange"
            background
            layout="total,prev, pager, next,jumper"
            :page-size="list.pageSize"
            :current-page.sync="list.currentPage"
            :total="total"
            @current-change="currentChange"
        ></el-pagination>
      </div>
      <!-- 分页END -->
    </div>
    <!-- 主要内容区END -->
  </div>
</template>
<script>
import {mapState} from "vuex";

export default {
  data() {
    return {
      list:{
        categoryID: null, // 分类id
        pageSize: 10, // 每页显示的商品数量
        currentPage: 1, //当前页码
        keyword: "" // 搜索条件
      }
    };
  },
  watch: {
    'list.categoryID': {
      handler(){
        this.getData();
        if (this.$route.query) {
          this.$router.push({
            name: 'Goods',
            query:this.$route.query
          });
        }
        this.list.keyword = ''
      }
    },
    // 监听路由变化，更新路由传递了搜索条件
    $route() {
      //合并参数
      Object.assign(this.list,this.$route.query,this.$route.params)
      this.getData()
      //每次发送请求后，keyword为空，等待下次请求
      this.list.keyword = ''
    }
  },
  methods: {
    //用来处理每页显示记录发生变化的方法
    findSizeChange(pageSize) {
      //将val赋值给size
      Object.assign(this.list.pageSize, pageSize)
      //重新去后台查询数据
      this.getData()
    },
    // 返回顶部
    backtop() {
      const timer = setInterval(function () {
        const top = document.documentElement.scrollTop || document.body.scrollTop;
        const speed = Math.floor(-top / 5);
        document.documentElement.scrollTop = document.body.scrollTop =
            top + speed;

        if (top === 0) {
          clearInterval(timer);
        }
      }, 20);
    },
    // 页码变化调用currentChange方法
    currentChange() {
      this.getData()
      this.backtop();
    },
    async getData() {
      await this.$store.dispatch('getAllGoods', this.list)
    }
  },
  //在组件挂载完毕之前执行一次，在mounted之前
  beforeMount() {
    //发请求之前，通过这个方法 数据合并！ 后面两个数据合并到第一个数据中
    Object.assign(this.list,this.$route.query,this.$route.params)
  },
  mounted() {
    this.getData();
    //获取种类
    this.$store.dispatch('getCategory')
  },
  computed:{
    ...mapState({
      goodsList: state => state.goods.goods.goodsList || {},
      total: state => state.goods.goods.total,
      category:state => state.goods.category || [],
    })
  }
}
</script>

<style scoped>
.goods {
  background-color: #f5f5f5;
}
/* 面包屑CSS */
.el-tabs--card .el-tabs__header {
  border-bottom: none;
}
.goods .breadcrumb {
  height: 50px;
  background-color: white;
}
.goods .breadcrumb .el-breadcrumb {
  width: 1225px;
  line-height: 30px;
  font-size: 16px;
  margin: 0 auto;
}
/* 面包屑CSS END */

/* 分类标签CSS */
.goods .nav {
  background-color: white;
}
.goods .nav .product-nav {
  width: 1225px;
  height: 40px;
  line-height: 40px;
  margin: 0 auto;
}
.nav .product-nav .title {
  width: 50px;
  font-size: 16px;
  font-weight: 700;
  float: left;
}
/* 分类标签CSS END */

/* 主要内容区CSS */
.goods .main {
  margin: 0 auto;
  max-width: 1225px;
}
.goods .main .list {
  min-height: 650px;
  padding-top: 14.5px;
  margin-left: -13.7px;
  overflow: auto;
}
.goods .main .pagination {
  height: 50px;
  text-align: center;
}
.goods .main .none-product {
  color: #333;
  margin-left: 13.7px;
}
/* 主要内容区CSS END */
</style>
