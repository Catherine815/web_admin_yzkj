<!--
 * @Description: file desc
 * @Author: zhangwang
 * @Date: 2022-03-31 11:53:03
 * @LastEditors: zhangwang
 * @LastEditTime: 2022-04-24 16:14:04
 * @FilePath: \explorer\src\components\Breadcrumb\index.vue
-->
<template>
  <el-breadcrumb class="app-breadcrumb" separator-class="el-icon-arrow-right">
    <el-breadcrumb-item v-for="(item,index) in levelList" :key="item.path">
      <span v-if="item.redirect==='noRedirect'||index==levelList.length-1" class="no-redirect">{{ item.meta.title }}</span>
      <a v-else href="javascript:;" class="link" @click.prevent="handleLink(item)">{{ item.meta.title }}</a>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
// import pathToRegexp from 'path-to-regexp'

export default {
  data() {
    return {
      levelList: null
    }
  },
  watch: {
    $route(route) {
      // if you go to the redirect page, do not update the breadcrumbs
      if (route.path.startsWith('/redirect/')) {
        return
      }
      this.getBreadcrumb()
    }
  },
  created() {
    this.getBreadcrumb()
  },
  methods: {
    getBreadcrumb() {
      // only show routes with meta.title
      // let matched = this.$route.matched.filter(item => item.meta && item.meta.title)
      // const first = matched[0]
      // if (!this.isDashboard(first)) {
      //   matched = [{ path: '/dashboard', meta: { title: '首页' }}].concat(matched)
      // }
      const matched = this.$route.matched.filter(item => item.meta && item.meta.title)
      this.levelList = matched.filter(item => item.meta && item.meta.title && item.meta.breadcrumb !== false)
    },
    isDashboard(route) {
      const name = route && route.name
      if (!name) {
        return false
      }
      return name.trim().toLocaleLowerCase() === 'Dashboard'.toLocaleLowerCase()
    },
    // 解决带参数的路由，比如编辑某个页面或者详情页
    // pathCompile(path) {
    //   const { params } = this.$route
    //   var toPath = pathToRegexp.compile(path)
    //   return toPath(params)
    // },
    handleLink(item) {
      const { redirect, path } = item
      // console.log(898977777)
      // console.log(redirect)
      // console.log(path)
      if (redirect) {
        this.$router.push(redirect)
        return
      }
      this.$router.push(path)
      // this.$router.push(this.pathCompile(path))
    }
  }
}
</script>

<style lang="scss" scoped>
.app-breadcrumb.el-breadcrumb {
  display: inline-block;
  margin-left: 8px;
  font-size: 16px;

  .no-redirect {
    color: #ffffff;
    cursor: text;
  }
}
.link {
  color: #ffffff;
}
</style>
