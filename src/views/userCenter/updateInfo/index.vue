<template>
  <div class="updateInfo-container">
    <div class="main">
      <h2 class="title">验证账号的安全性：</h2>
      <ul class="verify-type">
        <li>微信登录验证：
          <el-button type="text" disabled>验证></el-button>
        </li>
        <li>账号登录验证：
          <el-button type="text" @click="dialogVisible = true">验证></el-button>
        </li>
        <li>邮箱验证码验证：
          <el-button type="text" disabled>验证></el-button>
        </li>
        <li>手机号验证码验证：
          <el-button type="text" disabled>验证></el-button>
        </li>
        <li>账号密保问题验证：
          <el-button type="text" disabled>验证></el-button>
        </li>
      </ul>
      <h2 class="title">账号安全：</h2>
      <ul class="safe">
        <li>密保问题：
          <el-button type="text" class="active" disabled>未设置</el-button>
        </li>
        <li>登录设备管理
          <el-button type="text" disabled> ></el-button>
        </li>
      </ul>
    </div>
    <el-dialog
        title="验证"
        :visible.sync="dialogVisible"
        width="25%"
        :before-close="handleClose"
        destroy-on-close>
      <el-input v-model="password" placeholder="请输入密码" clearable></el-input>
      <div style="margin: 10px 0"></div>
      <el-input v-model="checkedPassword" placeholder="请重新输入密码" clearable></el-input>
      <span slot="footer" class="dialog-footer">
         <el-button type="primary" @click="updatePassword">校 验</el-button>
        <el-button @click="dialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import sideBar from "@/Layout/components/sideBar";
export default {
  name: "index",
  components:{
    sideBar
  },
  data(){
    return{
      dialogVisible:false,
      password:null,
      checkedPassword:null,
    }
  },
  methods:{
    handleClose(){
      this.dialogVisible = false
    },
    updatePassword(){
      //发生请求
      this.dialogVisible = false

    }
  }
}
</script>

<style scoped>
.updateInfo-container{
  float: right;
  background-color: #F5F5F5;
}

.main{
  float: right;
  padding: 36px 48px;
  width: 880px;
  height: 677px;
}

.title{
  font-weight: 400;
  font-size: 20px;
  margin-bottom: 50px;
}
.verify-type{
  font-weight: 400;
  font-size: 14px;
}
.verify-type li{
  width: 800px;
  padding: 30px 30px;
  font-size: 16px;
  color: #757575;
}
/* 图标浮动 */
.el-button--text{
  float: right;
  font-size:16px;
}



.verify-type li:last-child{
  margin-bottom: 50px;
}
.safe{
  font-weight: 400;
  font-size: 14px;
  margin-top: 30px;
}
.safe li {
  width: 800px;
  padding: 30px 30px;
  font-size: 16px;
  color: #757575;
}
.safe li>a{
  float: right;
}
.active{
  color: #ff5c00;
}
</style>
