<template>
  <el-dialog :visible.sync="loginDialogVisible" :before-close="handleDialogClose" width="40%" :close-on-click-modal="false">
    <div class="login-container">
      <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">
        <div class="title-container">
          <h3 class="title">登录</h3>
        </div>
        <el-form-item prop="username">
          <span class="svg-container">
            <i class="iconfont icon-user" />
          </span>
          <el-input ref="username" v-model="loginForm.username" placeholder="请输入账号" name="username" type="text" tabindex="1" auto-complete="on" />
        </el-form-item>
        <el-form-item prop="password">
          <span class="svg-container">
            <i class="iconfont icon-lock" />
          </span>
          <el-input
            :key="passwordType"
            ref="password"
            v-model="loginForm.password"
            :type="passwordType"
            placeholder="请输入密码"
            name="password"
            tabindex="2"
            auto-complete="on"
            @keyup.enter.native="handleLogin"
          />
          <span class="show-pwd" @click="showPwd">
            <i :class="passwordType === 'password' ? 'iconfont icon-eye-off-2' : 'iconfont icon-eye'" />
          </span>
        </el-form-item>
        <el-button :loading="loading" type="primary" style="width: 100%; margin-bottom: 30px" @click.native.prevent="handleLogin">登录</el-button>
        <span style="margin-right: 20px">试用账号：test</span><span>密码：123456</span>
      </el-form>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      loginForm: {
        username: "",
        password: ""
      },
      loginRules: {
        username: [
          { required: true, message: '用户名不能为空', trigger: 'blur' },
          { min: 3, max: 20, message: '长度为3-20个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
          { min: 5, max: 15, message: '长度为5-15个字符', trigger: 'blur' }
        ]
      },
      loading: false,
      passwordType: 'password',
    };
  },
  computed: {
    loginDialogVisible() {
      return this.$store.state.app.loginDialogVisible
    }
  },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('user/login', this.loginForm).then(() => {
            this.$store.dispatch('app/toggleLoginDialog').then(() => {
            })
            this.$store.dispatch('user/getUserInfo')
            this.loading = false
          }).catch((error) => {
            this.loading = false
            console.log(error)
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    handleDialogClose() {
      this.$store.dispatch('app/toggleLoginDialog').then(() => {

      })
    }
  }
}
</script>


<style lang="scss">
/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      border: 0px;
      -webkit-appearance: none;
      padding: 12px 5px 12px 15px;
      height: 47px;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px white inset !important;
        // -webkit-text-fill-color: white !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid #dcdfe6;
    border-radius: 5px;
  }

  .el-form-item.is-error {
    border-color: #f56c6c;
  }
}
</style>

<style lang="scss" scoped>
.login-container {
  min-height: 100%;
  width: 100%;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 30px 30px;
    margin: 0 auto;
    overflow: hidden;
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    cursor: pointer;
    user-select: none;
  }
}
</style>
