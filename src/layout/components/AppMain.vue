<!--
 * @Description: file desc
 * @Author: zhangwang
 * @Date: 2022-03-31 10:42:53
 * @LastEditors: zhangwang
 * @LastEditTime: 2022-06-17 09:02:17
 * @FilePath: \account\src\layout\components\AppMain.vue
-->
<template>
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
      <keep-alive>
        <router-view :key="key" />
      </keep-alive>
    </transition>
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    key() {
      return this.$route.path
    }
  }
}
</script>

<style lang="scss" scoped>
.app-main {
  /* 70= navbar  70  */
  min-height: calc(100vh - 70px);
  width: 100%;
  position: relative;
  overflow: hidden;
}

.fixed-header+.app-main {
  padding-top: 70px;
}
</style>
