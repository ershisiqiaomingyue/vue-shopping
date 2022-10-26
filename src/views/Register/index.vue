<template>
  <div class="container">
    <el-form ref="ruleForm" :model="RegisterUser" :rules="rules" class="demo-ruleForm" label-width="100px" status-icon>
      <el-form-item label="昵称" prop="nickname">
        <el-input v-model="RegisterUser.nickname" maxLength="10"></el-input>
      </el-form-item>

      <el-form-item label="账号" prop="username">
        <el-input v-model="RegisterUser.username"
                  maxLength="20" type="username"></el-input>
      </el-form-item>

      <el-form-item label="邮箱" prop="email">
        <el-input v-model="RegisterUser.email" maxLength="40"></el-input>
      </el-form-item>

      <el-form-item label="手机" prop="phone">
        <el-input v-model="RegisterUser.phone" maxLength="11"></el-input>
      </el-form-item>

      <el-form-item label="密码" prop="password">
        <el-input v-model="RegisterUser.password"
                  maxLength="30" placeholder="密码长度为8到20位,必须包含字母和数字" type="password"></el-input>
      </el-form-item>

      <el-form-item label="确认密码" prop="checkPassword">
        <el-input v-model="RegisterUser.checkPassword"
                  maxLength="30" type="password"></el-input>
      </el-form-item>

      <el-form-item label="验证码" prop="code">
        <!--校验code必须为数字，且为6位-->
        <el-input v-model.number="RegisterUser.code" maxLength="6"
                  oninput="value=value.replace(/[^\d]/g,'')"></el-input>
        <el-button slot="default" plain style="position: absolute" type="primary" @click="generateCode">发送验证码
        </el-button>
      </el-form-item>

      <el-form-item style="position:relative;left: 40px">
        <el-button size="medium" type="primary" @click="registerCommit">注册</el-button>
        <el-button size="medium" @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>

    </el-form>

  </div>
</template>

<script>

export default {
  props: ["register"],
  data() {
    // 昵称的校验方法
    let validateNickname = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请输入昵称！"));
      } else {
        this.$api.reqValidateNickname(this.RegisterUser.nickname).then(res => {
          if (res.data.code === 200) {
            return callback();
          } else {
            return callback(new Error(res.data.msg));
          }
        }).catch(err => {
          return Promise.reject(err);
        })
      }
    };
    // 用户名的校验方法
    let validateUsername = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请输入用户名"));
      }
      // 用户名以字母开头,长度在5-16之间,允许字母数字下划线
      const userNameRule = /^[a-zA-Z][a-zA-Z0-9_]{4,15}$/;
      if (userNameRule.test(value)) {
        //判断数据库中是否已经存在该用户名
        this.$api.reqValidateUsername(value).then(res => {
          // 200代表用户名不存在，可以注册
          if (res.data.code === 200) {
            return callback();
          } else {
            return callback(new Error(res.data.msg));
          }
        }).catch(err => {
          return Promise.reject(err);
        });
      } else {
        return callback(new Error("字母开头,长度5-16之间,允许字母数字下划线"));
      }
    };
    //邮箱的校验方法
    let validateEmail = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请输入您的邮箱！"))
      }
      const emailRule = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
      if (emailRule.test(value)) {
        this.$api.reqValidateEmail(value).then(res => {
          if (res.data.code === 200) {
            return callback();
          } else {
            return callback(this.notifyError(res.data.msg));
          }
        }).catch(err => {
          return Promise.reject(err);
        });
      } else {
        return callback(new Error("邮箱格式不正确，请重新输入"))
      }
    };
    //手机号的校验方法
    let validatePhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请输入您的手机号！"))
      }
      const phoneRule = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
      if (phoneRule.test(value)) {
        this.$api.reqValidatePhone(value).then(res => {
          if (res.data.code === 200) {
            return callback();
          } else {
            return callback(this.notifyError(res.data.msg));
          }
        }).catch(err => {
          return Promise.reject(err);
        })
      } else {
        return callback(new Error("请输入正确的昵称格式"))
      }
    };
    // 密码的校验方法
    let validatePassword = (rule, value, callback) => {
      if (value === "") {
        return callback(new Error("请输入密码"));
      }
      // 密码以字母开头,长度在6-18之间,允许字母数字和下划线
      const passwordRule = /^[a-zA-Z]\w{5,17}$/;
      if (passwordRule.test(value)) {
        this.$api.reqValidatePassword(value).then(res => {
          if (res.data.code === 200) {
            return callback();
          } else {
            return callback(this.notifyError(res.data.msg))
          }
        }).catch(err => {
          return callback(new Error(err))
        })
      } else {
        return callback(new Error("密码的长度或格式不对，请重新输入！"));
      }
    };
    // 确认密码的校验方法
    let validateCheckPassword = (rule, value, callback) => {
      if (value === "") {
        return callback(new Error("请确认密码"));
      }
      // 校验是否密码一致
      if (this.RegisterUser.password !== "" && value === this.RegisterUser.password) {
        this.$api.reqCheckPasswordIsSame({
          password: this.RegisterUser.password,
          checkPassword: this.RegisterUser.checkPassword
        }).then(res => {
          if (res.data.code === 200) {
            return callback();
          } else {
            return callback(this.notifyError(res.data.msg));
          }
        }).catch(err => {
          return callback(new Error(err))
        })
      } else {
        return callback(new Error("两次输入的密码不一致"));
      }
    };
    // 校验验证码
    let validateCode = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("输入验证码才可以注册您的账号！"))
      }
      const codeRule = /^\d{6}$/;
      if (codeRule.test(value)) {
        this.$api.reqValidateCode({
          phone: this.RegisterUser.phone,
          email: this.RegisterUser.email,
          code: this.RegisterUser.code
        }).then(res => {
          if (res.data.code === 200) {
            return callback();
          } else {
            return callback(this.notifyError(res.data.msg));
          }
        }).catch(err => {
          return Promise.reject(err);
        })
      } else {
        return callback(new Error("请输入6位验证码"))
      }
    };
    return {
      RegisterUser: {
        nickname: "",
        username: "",
        email: "",
        phone: "",
        password: "",
        checkPassword: "",
        code: "",
      },
      // 用户信息校验规则,validator(校验方法),trigger(触发方式),blur为在组件 Input 失去焦点时触发
      rules: {
        nickname: [{require: true, validator: validateNickname, trigger: "blur"}],
        username: [{require: true, validator: validateUsername, trigger: "blur"}],
        email: [{require: true, validator: validateEmail, trigger: "blur"}],
        phone: [{require: true, validator: validatePhone, trigger: "blur"}],
        password: [{require: true, validator: validatePassword, trigger: "blur"}],
        checkPassword: [{require: true, validator: validateCheckPassword, trigger: "blur"}],
        code: [{require: true, validator: validateCode, trigger: "change"}],
      }
    };
  },
  methods: {
    registerCommit() {
      // 通过element自定义表单校验规则，校验用户输入的用户信息
      this.$refs["ruleForm"].validate(valid => {
        //如果通过校验开始注册
        if (valid) {
          this.$api.reqRegister({
            nickname: this.RegisterUser.nickname,
            username: this.RegisterUser.username,
            email: this.RegisterUser.email,
            phone: this.RegisterUser.phone,
            password: this.RegisterUser.password,
            checkPassword: this.RegisterUser.checkPassword,
            code: this.RegisterUser.code
          }).then(res => {
            // 200代表注册成功，其他的均为失败
            if (res.data.code === 200) {
              // 弹出通知框提示注册成功信息
              this.notifySucceed(res.data.msg);
              //将数据存入vuex
              let user = {
                nickname: this.RegisterUser.nickname,
                username: this.RegisterUser.username,
                email: this.RegisterUser.email,
                phone: this.RegisterUser.phone,
                token: res.data.token
              }
              let userInfo = JSON.stringify(user);
              localStorage.setItem('user',userInfo)
              localStorage.setItem('token',user.token)
              this.$store.dispatch('setUser', user)
              this.$router.push('/home');
            } else {
              // 弹出通知框提示注册失败信息
              this.notifyError(res.msg);
            }
          }).catch(err => {
                return this.notifyError(err);
              });
        } else {
          return false;
        }
      });
    },
    generateCode() {
      if (this.RegisterUser.phone == null) {
        return this.$message.error("手机号未填写")
      }
      if (this.RegisterUser.email == null) {
        return this.$message.error("邮箱未填写")
      }
      this.$api.reqGenerateCode({
        phone: this.RegisterUser.phone,
        email: this.RegisterUser.email
      }).then(res => {
        if (res.code === 200) {
          this.$message.success(res.msg);
        } else {
          this.$message.error(res.msg);
        }
      }).catch(err => {
        return this.$message.error(err)
      });
    },
    resetForm() {
      this.$refs['ruleForm'].resetFields();
    }
  }
};
</script>


<style scoped>
.container {
  margin: 0 auto;
  width: 400px;
  height: auto;
}
</style>
