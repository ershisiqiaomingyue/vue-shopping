<template>
  <div class="layout-container">
    <div class="breadcrumb">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item to="/">首页</el-breadcrumb-item>
        <el-breadcrumb-item to="/center/userCenter">个人中心</el-breadcrumb-item>
        <el-breadcrumb-item >{{ title }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <side-bar/>
    <router-view :key="key"/>
  </div>
</template>

<script>
import sideBar from "@/Layout/components/sideBar";

export default {
  name: "index",
  components:{
    sideBar
  },
  computed:{
    key(){
      return this.$route.path
    },
    title(){
      return this.$route.meta.title
    }
  }
}
</script>

<style scoped>
.layout-container {
  position: relative;
  margin: 0 auto;
  width: 1226px;
  height: 100%;
  background-color: #F5F5F5;
}

.layout-container .el-tabs--card .el-tabs__header {
  border-bottom: none;
}

.layout-container .breadcrumb {
  height: 50px;
  background-color: white;
}

.layout-container .breadcrumb .el-breadcrumb {
  width: 1225px;
  line-height: 30px;
  font-size: 16px;
  margin: 0 auto;
}

</style>
