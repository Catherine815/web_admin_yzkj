<!--
 * @Description:
 * @Author: zhangwang
 * @Date: 2022-03-30 10:47:59
 * @LastEditors: zhangwang
 * @LastEditTime: 2022-11-15 11:30:24
 * @FilePath: \web_admin_yzkj\src\App.vue
-->
<template>
  <div id="app">
    <!-- <router-view /> -->
    <dash-board></dash-board>
  </div>
</template>

<script>
import DashBoard from '@/views/dashboard/index'

export default {
  name: 'App',
  components: {
    DashBoard
  }
}
</script>
