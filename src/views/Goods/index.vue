<template>
  <div class="goods" id="goods" name="goods">
    <!-- 面包屑 -->
    <div class="breadcrumb">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item to="/">首页</el-breadcrumb-item>
        <el-breadcrumb-item>全部商品</el-breadcrumb-item>
        <el-breadcrumb-item v-if="keyword">搜索</el-breadcrumb-item>
        <el-breadcrumb-item v-else>分类</el-breadcrumb-item>
        <el-breadcrumb-item v-if="keyword">{{ keyword }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!-- 面包屑END -->

    <!-- 分类标签 -->
    <div class="nav">
      <div class="product-nav" >
        <div class="title">分类</div>
        <el-tabs v-model="categoryId" type="card">
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
          <List :list="productList" v-if="productList.length>0"></List>
          <div v-else class="none-product">抱歉没有找到相关的商品，请看看其他的商品</div>

      </div>
      <!-- 分页 -->
      <div class="pagination">
        <el-pagination
            @size-change="handleSizeChange"
            background
            layout="total,prev, pager, next,jumper"
            :page-size="pageSize"
            :current-page.sync="currentPage"
            :total="total"
            @current-change="handleCurrentChange">
        </el-pagination>
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
      categoryId: "0", // 分类id
      pageSize: 10, // 每页显示的商品数量
      currentPage: 1, //当前页码
      keyword: "" // 搜索条件
    };
  },
  methods: {
    //用来处理每页显示记录发生变化的方法
    handleSizeChange(pageSize) {
      //将val赋值给size
      this.pageSize = pageSize
      //重新去后台查询数据
      this.Init()
    },
    // 返回顶部
    backTop() {
      const timer = setInterval(function () {
        const top = document.documentElement.scrollTop || document.body.scrollTop;
        const speed = Math.floor(-top / 5);
        document.documentElement.scrollTop = document.body.scrollTop = top + speed;
        if (top === 0) {
          clearInterval(timer);
        }
      }, 20);
    },
    // 页码变化调用currentChange方法
    handleCurrentChange() {
      this.Init()
      this.backTop();
    },
    async Init() {
      let list = {
          categoryId:this.categoryId,
          pageSize:this.pageSize,
          currentPage:this.currentPage,
          keyword:this.keyword
      }
      await this.$store.dispatch('getProduct',list)
    },
  },
  //在组件挂载完毕之前执行一次，在mounted之前
  beforeMount() {
    //发请求之前，通过这个方法 数据合并！ 后面两个数据合并到第一个数据中
    Object.assign(this.keyword,this.$route.params.keyword,this.$route.query.keyword)
  },
  mounted() {
    //获取种类
    this.$store.dispatch('getCategory')
    this.categoryId = '0'
    //获取商品
    this.Init();
  },
  computed:{
    ...mapState({
      productList: state => state.product.productList || {},
      total: state => state.product.total,
      category:state => state.product.category || []
    })
  },
  watch:{
    $route(to,from){
      //进入的是商品页面
      if (to.name === 'Goods'){
        //如果params中携带keyword，赋值
        if (to.params.keyword !== undefined) {
          this.keyword = to.params.keyword
        }
        //判断是否是从商品页面来的，即点击了搜索按钮或者点击了标签
        if (from.name !== 'Goods') {
          //1、点击了搜索按钮
          this.keyword = from.params.keyword
          //2、恢复标签为默认
          this.categoryId = '0'
        }
      }
    },
    categoryId(){
      this.$router.push({
        name:'Goods',
        params:this.$route.params
      })
      if (this.$route.name === 'Goods'){
        this.Init()
      }
    },
    keyword(){
      this.categoryId = '0'
      this.$router.push({
        name:'Goods',
        params:this.$route.params
      })
      if (this.$route.name === 'Goods'){
        this.Init()
      }
    }
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
  position: relative;
  height: 50px;
  text-align: center;
}
.goods .main .none-product {
  color: #333;
  margin-left: 13.7px;
}
/* 主要内容区CSS END */
</style>
