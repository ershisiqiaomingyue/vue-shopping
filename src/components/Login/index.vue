<!--
 * @Description: 登录组件
 * @Author: hai-27
 * @Date: 2020-02-19 20:55:17
 * @LastEditors: hai-27
 * @LastEditTime: 2020-03-01 15:34:08
 -->
<template>
  <div id="myLogin">
    <el-dialog title="登录" width="700px" center :visible.sync="isLogin">
      <div class="login-container">
        <!--微信登录-->
        <div id="wxLogin">

        </div>
<!--
        <i>打开微信扫一扫登录，更加安全便捷！</i>
-->
        <div class="login">
          <el-form :model="LoginUser" :rules="rules" status-icon ref="ruleForm" class="demo-ruleForm">
            <el-form-item prop="name">
              <el-input prefix-icon="el-icon-user-solid" placeholder="请输入账号/邮箱/手机号" v-model="LoginUser.username"></el-input>
            </el-form-item>
            <el-form-item prop="pass">
              <el-input
                  prefix-icon="el-icon-view"
                  type="password"
                  placeholder="请输入密码"
                  v-model="LoginUser.password"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button size="medium" type="primary" @click="login" style="width:100%;margin: 0 auto">登录</el-button>
              <el-button size="medium" type="danger" @click="forget" style="width:100%;margin: 10px 0 auto">忘记密码</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>

    </el-dialog>
  </div>
</template>

<script>
import {mapActions, mapState} from "vuex";

export default {
  data() {
    // 用户名的校验方法
    let validateName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请输入用户名"));
      }
      // 用户名以字母开头,长度在5-16之间,允许字母数字下划线
      const userNameRule = /^[a-zA-Z][a-zA-Z0-9_]{4,15}$/;
      if (userNameRule.test(value)) {
        this.$refs.ruleForm.validateField("checkPass");
        return callback();
      } else {
        return callback(new Error("字母开头,长度5-16之间,允许字母数字下划线"));
      }
    };
    // 密码的校验方法
    let validatePass = (rule, value, callback) => {
      if (value === "") {
        return callback(new Error("请输入密码"));
      }
      // 密码以字母开头,长度在6-18之间,允许字母数字和下划线
      const passwordRule = /^[a-zA-Z]\w{5,17}$/;
      if (passwordRule.test(value)) {
        this.$refs.ruleForm.validateField("checkPass");
        return callback();
      } else {
        return callback(
            new Error("字母开头,长度6-18之间,允许字母数字和下划线")
        );
      }
    };
    return {
      LoginUser: {
        username: "",
        password: ""
      },
      // 用户信息校验规则,validator(校验方法),trigger(触发方式),blur为在组件 Input 失去焦点时触发
      rules: {
        username: [{ validator: validateName, trigger: "blur" }],
        password: [{ validator: validatePass, trigger: "blur" }]
      },
      showLoginDialog:this.showLogin,
      openid:null
    };
  },
  computed: {
    // 获取vuex中的showLogin，控制登录组件是否显示
    isLogin: {
      get() {
        return this.$store.getters.getShowLogin;
      },
      set(val) {
        this.$refs["ruleForm"].resetFields();
        this.setShowLogin(val);
      }
    },
    ...mapState({
      showLogin: state => state.user.showLogin
    })
  },
  watch:{
    showLogin(val){
      if (val === true) {
        this.getQRCode()
      }
    }
  },
  mounted() {
    //初始化微信js库
    const script = document.createElement('script')
    script.type = 'text/javascript'
    script.src = "https://res.wx.qq.com/connect/zh_CN/htmledition/js/wxLogin.js"
    document.body.appendChild(script)

    //微信回调的方法
    let self = this;
    window["loginCallback"] = (name, token, openid) =>{
      self.loginCallback(name, token, openid);
    }
  },
  methods: {
    ...mapActions(["setUser", "setShowLogin"]),
    login() {
      // 通过element自定义表单校验规则，校验用户输入的用户信息
      this.$refs["ruleForm"].validate(valid => {
        //如果通过校验开始登录
        if (valid) {
          this.$api.reqLogin({
            account: this.LoginUser.username,
            password: this.LoginUser.password
          }).then(res => {
                // “200”代表登录成功，其他的均为失败
                if (res.code === 200) {
                  // 隐藏登录组件
                  this.isLogin = false;
                  // 登录信息存到本地
                  let user = JSON.stringify(res.data);
                  window.localStorage.setItem("user", user);
                  window.localStorage.setItem('token',res.data.token)
                  // 登录信息存到vuex
                  this.$bus.$emit('getData')
                  this.setUser(res.data);
                  // 弹出通知框提示登录成功信息
                  this.notifySucceed(res.msg);
                } else {
                  // 清空输入框的校验状态
                  this.$refs["ruleForm"].resetFields();
                  // 弹出通知框提示登录失败信息
                  this.notifyError(res.msg);
                }
              }).catch(err => {
            return Promise.reject(err);
          });
        } else {
          return false;
        }
      });
    },
    forget(){

    },
    //微信登录
    loginCallback(nickName, token) {
      console.log('进入回调函数！')
      console.log('name=' + nickName)
      console.log('token=' + token)
      // 打开手机登录层，绑定手机号，改逻辑与手机登录一致
      if(token != null) {
        window.localStorage.setItem('token',token)
        //使用token去获取用户信息
        this.$api.reqGetUserInfo()
            .then(res => {
              if (res.code === 200) {
                window.localStorage.setItem('user',res.data);
                this.$bus.$emit('getData')
                this.setUser(res.data);
                this.notifySucceed('登录成功！')
                this.isLogin = false
              }else {
                this.notifyError('登录失败，请重新尝试！')
              }
            })
      } else {
        this.notifyError('登录失败，请重新尝试！')
      }
    },

    getQRCode(){
      //获取二维码
      this.$api.reqGetWxLoginQRCode()
          .then(res=>{
            console.log(res)
            var obj = new WxLogin({
              self_redirect:true,
              id: 'wxLogin',
              appid:res.data.appid,
              scope:res.data.scope,
              redirect_uri:res.data.redirectUri,
              state:res.data.state,
              style:'black',
              href:''
            })
          })
    }
  }
}
</script>

<style scoped>
.login-container{
  height: 400px;
  width: 700px;
}

.login-container .login{
  position: relative;
  right: 100px;
  top: 60px;
  float: right;
  width: 250px;
  height: 250px;
}
#wxLogin{
  float: left;
  width: 290px;
  height: 290px;
}
</style>

