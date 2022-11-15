<!--
 * @Description: file desc
 * @Author: zhangwang
 * @Date: 2022-03-31 11:33:26
 * @LastEditors: zhangwang
 * @LastEditTime: 2022-06-17 10:23:26
 * @FilePath: \account\src\layout\components\Sidebar\index.vue
-->
<template>
  <div class="showLogo">
    <logo :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="false"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        mode="vertical"
      >
        <sidebar-item v-for="route in constantRoutes" :key="route.path" :item="route" :base-path="route.path" />
      </el-menu>
    </el-scrollbar>
  </div>
  <!-- 动态路由 -->
  <!-- <div class="showLogo">
    <logo :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :default-openeds="opendedMenu"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="false"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        mode="vertical"
      >
        <sidebar-item v-for="route in permission_routes" :key="route.path" :item="route" :base-path="route.path" />
      </el-menu>
    </el-scrollbar>
  </div> -->
</template>
<script>
import { constantRoutes } from '@/router'
import variables from '@/styles/variables.module.scss'
import SidebarItem from './SidebarItem'
import Logo from './Logo'

export default {
  name: 'Sidebar',
  components: {
    SidebarItem,
    Logo
  },
  data() {
    return {
      opendedMenu: [], // 审核管理下的子菜单默认全展开
      constantRoutes
    }
  },
  computed: {
    isCollapse() {
      return this.$store.getters.sidebar.opened
    },
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      // 如果在meta里设置了activeMenu，则设置的路径将会高亮显示
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
    variables() {
      return variables
    }
  }
}
/* 动态路由：
import { mapGetters } from 'vuex'
import variables from '@/styles/variables.module.scss'
import SidebarItem from './SidebarItem'
import Logo from './Logo'

export default {
  name: 'Sidebar',
  components: {
    SidebarItem,
    Logo
  },
  data() {
    return {
      opendedMenu: ['/audit'] // 审核管理下的子菜单默认全展开
    }
  },
  computed: {
    ...mapGetters([
      'permission_routes'
    ]),
    isCollapse() {
      return this.$store.getters.sidebar.opened
    },
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      // 如果在meta里设置了activeMenu，则设置的路径将会高亮显示
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
    variables() {
      return variables
    }
  }
}
*/
</script>
