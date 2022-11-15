<!--
 * @Description:
 * @Author: zhangwang
 * @Date: 2022-03-30 11:00:46
 * @LastEditors: zhangwang
 * @LastEditTime: 2022-04-20 13:07:07
 * @FilePath: \explorer\src\layout\index.vue
-->
<template>
  <div :class="classObj" class="app-wrapper">
    <sidebar class="sidebar-container" />
    <div class="main-container">
      <div class="fixed-header">
        <navbar />
      </div>
      <app-main />
    </div>
  </div>
</template>

<script>
import { Sidebar, Navbar, AppMain } from './components'

export default {
  name: 'Layout',
  components: {
    Sidebar,
    Navbar,
    AppMain
  },
  computed: {
    sidebar() {
      return this.$store.getters.sidebar
    },
    classObj() {
      return {
        hideSidebar: this.sidebar.opened,
        openSidebar: !this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "~@/styles/variables.module.scss";
  .fixed-header {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 9;
    width: calc(100% - #{$sideBarWidth});
    transition: width 0.28s;
  }

  .hideSidebar .fixed-header {
    width: calc(100% - 54px)
  }
</style>
