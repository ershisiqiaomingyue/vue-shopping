<template>
  <div class="userInfo-container">
    <div class="main">
      <div class="portal-main">
        <div class="userInfo">
          <ul>
            <li>
              头像：
              <img :src="getUser.avatar" alt="#" >
            </li>
            <li>
              性别：<span v-if="getUser.sex === 0">女</span>
              <span v-else>男</span>
            </li>
            <li>
              昵称：<span>{{ getUser.nickName }}</span>
            </li>
            <li>
              用户名：<span>{{getUser.userName}}</span>
            </li>
            <li>
              绑定手机：<span v-if="getUser.phone !== '' ">{{ getUser.phone }}</span>
                      <span v-else class="common">未绑定</span>
            </li>
            <li>
              绑定邮箱：<span v-if="getUser.email !== ''">{{ getUser.email }}</span>
              <span v-else class="common">未绑定</span>
            </li>
            <li>
              账号安全：<span class="level">普通</span>
            </li>
            <li>
              账号状态：<span class="common" v-if="getUser.status === 0">正常</span>
              <span class="prohibit" v-else >封禁</span>
            </li>
          </ul>
        </div>

        <div class="clearfix"></div>

      </div>
      <el-button  type="danger" class="edit" @click="dialogVisible = true">编辑</el-button>
    </div>

    <el-dialog
        title="个人信息"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose">
      <el-form ref="form" :model="getUser" label-width="80px">
        <el-form-item label="头像">
          <single-upload :img="getUser.avatar"/>
        </el-form-item>
        <el-form-item label="昵称">
          <el-input v-model="getUser.nickName"></el-input>
        </el-form-item>
        <el-form-item label="用户名">
          <el-input v-model="getUser.username"></el-input>
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="getUser.phone">
            <el-button slot="append">发送验证码</el-button>
          </el-input>
        </el-form-item>
        <el-form-item label="邮箱号">
          <el-input v-model="user.email">
            <el-button slot="append">发送验证码</el-button>
          </el-input>
        </el-form-item>
        <el-form-item label="验证码">
          <el-input v-model="code"></el-input>
        </el-form-item>
        <div style="text-align: center;color: #757575;font-size: 12px">
          <span>任选其一发送验证码验证</span>
        </div>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">修 改</el-button>
        <el-button @click="dialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import sideBar from "@/Layout/components/sideBar";
import singleUpload from "@/components/Upload/singleUpload";
import {mapGetters} from "vuex";
export default {
  name: "index",
  components:{
    singleUpload
  },
  data(){
    return{
      dialogVisible:false,
      user:{},
      code:null,
    }
  },
  computed:{
    ...mapGetters(['getUser'])
  },
  methods:{
    handleClose(){
      this.dialogVisible = false
    }
  }
}
</script>

<style scoped>
.userInfo-container{
  float: right;
  background-color: #F5F5F5;
}

.main{
  position: relative;
  padding: 36px 48px;
  width: 880px;
  height: 677px;
}

.portal-main{
  width: 888px;
  height: 700px;
  padding: 24px 0 0;
}


.main .portal-main .userInfo{
  float: left;
  width: 358px;
  margin: 30px 30px;
}

.main .portal-main .userInfo ul {
  width: 358px;
  height: 99px;
}

.userInfo ul>li:first-child{
 margin: 0 60px 50px 60px;
}

.userInfo ul>li {
  position: relative;
  padding: 6px 0;
  font-size: 16px;
  color: #757575;
  margin: 50px 60px;
}

.userInfo ul>li img{
  position: absolute;
  top:-20px;
  left:70px;
  width: 70px;
  height: 70px;
  border-radius: 50%;
}

.main .edit{
  position: absolute;
  left:150px;
  width: 300px;
}

.userInfo ul>li>span{
  font-size: 12px;
}

.userInfo ul>li .level{
  color: #ffac13;
}

.userInfo ul>li .common{
  color: #67C23A;
}
.userInfo ul>li .prohibit{
  color: red;
}

</style>
