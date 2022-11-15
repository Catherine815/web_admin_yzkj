<!--
 * @Description: file desc
 * @Author: zhangwang
 * @Date: 2022-03-31 11:54:13
 * @LastEditors: zhangwang
 * @LastEditTime: 2022-03-31 11:54:16
 * @FilePath: \hxomsp-blockchain-web\src\components\Hamburger\index.vue
-->
<template>
  <div @click="toggleClick">
    <i :class="['hamburger', 'el-icon-s-fold', {'is-active': isActive}]" />
  </div>
</template>

<script>
export default {
  name: 'Hamburger',
  props: {
    isActive: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    toggleClick() {
      this.$emit('toggleClick')
    }
  }
}
</script>

<style scoped>
.hamburger {
  display: inline-block;
  vertical-align: middle;
  width: 25px;
  height: 25px;
  font-size: 25px;
  color: #6c6c6c;
}

.hamburger.is-active {
  transform: rotate(180deg);
}
</style>
