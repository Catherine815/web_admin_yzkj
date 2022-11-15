<!--
 * @Description: file desc
 * @Author: zhangwang
 * @Date: 2022-04-06 09:03:51
 * @LastEditors: zhangwang
 * @LastEditTime: 2022-04-19 09:56:43
 * @FilePath: \explorer\src\components\SvgIcon\index.vue
-->
<template>
  <svg :class="svgClass" aria-hidden="true" v-on="$listeners">
    <use :href="iconName" />
  </svg>
</template>

<script>
export default {
  name: 'SvgIcon',
  props: {
    iconClass: {
      type: String,
      required: true
    },
    className: {
      type: String,
      default: ''
    }
  },
  computed: {
    iconName() {
      return `#icon-${this.iconClass}`
    },
    svgClass() {
      if (this.className) {
        return 'svg-icon ' + this.className
      } else {
        return 'svg-icon'
      }
    }
  }
}
</script>

<style scoped>
.svg-icon {
  margin-right: 5px;
  width: 30px;
  text-align: center;
  font-size: 20px;
  vertical-align: middle;
  height: 1em;
  fill: currentColor;
  overflow: hidden;
}
.el-menu-item.is-active svg{
  color: #409EFF;
}
</style>
