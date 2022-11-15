<!--
 * @Description: file desc
 * @Author: zhangwang
 * @Date: 2022-03-31 11:31:45
 * @LastEditors: zhangwang
 * @LastEditTime: 2022-04-27 15:55:41
 * @FilePath: \explorer\src\layout\components\Navbar.vue
-->
<template>
  <div class="navbar-container">
    <hamburger id="hamburger-container" :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />

    <breadcrumb id="breadcrumb-container" class="breadcrumb-container" />

    <div class="right-pale fr">
      <span><i class="el-icon-user-solid"></i></span>
      <span class="user-name">{{ username }}</span>
      <span class="seprate">|</span>
      <a class="login-out" href="javascript:;" @click.prevent="handerLogout">退出登录</a>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'

export default {
  name: 'Navbar',
  components: {
    Breadcrumb,
    Hamburger
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'username'
    ])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async handerLogout() {
      await this.$store.dispatch('user/logout')
      // this.$router.push(`/login?redirect=${this.$route.fullPath}`)
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="scss" scoped>
.hamburger-container{
  height: 100%;
  padding: 0 15px;
  float: left;
  line-height: 66px;
  cursor: pointer;
  transition: background .3s;
  -webkit-tap-highlight-color:transparent;

  &:hover {
    background: rgba(0, 0, 0, .025)
  }
}
.breadcrumb-container{
  height: 70px;
  line-height: 70px;
}
.right-pale {
  padding-right: 50px;
  height: 70px;
  line-height: 70px;
  el-avatar, span, a{
    display: inline-block;
    color: #ffffff;
  }
  .avatar {
    margin-right: 10px;
    vertical-align: middle;
  }
  .user-name {
    padding-left: 10px;
    font-size: 14px;
  }
  .seprate {
    font-size: 20px;
    margin: 0 10px;
  }
  .login-out{
    font-size: 16px;
  }
}
</style>
