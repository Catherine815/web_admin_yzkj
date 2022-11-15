<!--
 * @Description: file desc
 * @Author: zhangwang
 * @Date: 2022-03-31 11:23:37
 * @LastEditors: zhangwang
 * @LastEditTime: 2022-06-17 11:45:17
 * @FilePath: \account\src\views\login\index.vue
-->
<template>
  <div class="login-container">
    <div class="login-wrap">
      <div class="login-title">用户管理系统</div>
      <div class="login-form">
        <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">
          <el-form-item prop="userName">
            <el-input
              ref="userName"
              v-model="loginForm.userName"
              placeholder="账号"
              name="userCode"
              type="text"
              tabindex="1"
              autocomplete="on"
              prefix-icon="el-icon-user"
            />
          </el-form-item>
          <el-form-item prop="userPassword">
            <el-input
              ref="userPassword"
              v-model="loginForm.userPassword"
              type="password"
              placeholder="密码"
              name="password"
              tabindex="2"
              autocomplete="on"
              prefix-icon="el-icon-lock"
              @keyup.enter.native="handleLogin"
            />
          </el-form-item>

          <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="handleLogin">登录</el-button>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Login',
  data() {
    return {
      loginForm: {
        userName: '',
        userPassword: ''
      },
      loginRules: {
        userName: [{ required: true, message: '账号不能为空', trigger: 'blur' }],
        userPassword: [{ required: true, message: '密码不能为空', trigger: 'blur' }]
      },
      loading: false,
      redirect: undefined,
      otherQuery: {}
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        const query = route.query
        if (query) {
          this.redirect = query.redirect
          this.otherQuery = this.getOtherQuery(query)
        }
      },
      immediate: true
    }
  },
  async mounted() {
    if (this.loginForm.userName === '') {
      this.$refs.userName.focus()
    } else if (this.loginForm.userPassword === '') {
      this.$refs.userPassword.focus()
    }
  },
  methods: {
    // 点击登陆
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          // this.loading = true
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== 'redirect') {
          acc[cur] = query[cur]
        }
        return acc
      }, {})
    }
  }
}

</script>

<style lang="scss" scoped>
.login-container {
  width: 100%;
  height: 100%;
  background: url('@/assets/images/login_background.png') no-repeat center;
  background-size: cover;
  .login-wrap {
    position: absolute;
    width: 400px;
    left: 50%;
    top: 45%;
    transform: translate(-50%, -50%);
  }
  .login-title {
    width: 100%;
    height: 50px;
    margin-bottom: 20px;
    line-height: 50px;
    font-family: ArialMT;
    font-size: 30px;
    letter-spacing: 5px;
    color: #ffffff;
    text-align: center;
  }
}
</style>
