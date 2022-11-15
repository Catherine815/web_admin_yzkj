<!--
 * @Description: file desc
 * @Author: zhangwang
 * @Date: 2022-03-31 11:34:00
 * @LastEditors: zhangwang
 * @LastEditTime: 2022-04-01 11:08:20
 * @FilePath: \hxomsp-blockchain-web\src\layout\components\Sidebar\SidebarItem.vue
-->
<template>
  <div v-if="!item.hidden">
    <template v-if="hasOneShowingChild(item.children,item) && (!onlyOneChild.children||onlyOneChild.noShowingChildren) && !item.alwaysShow">
      <router-link v-if="onlyOneChild.meta" :to="resolvePath(onlyOneChild.path)">
        <el-menu-item :index="resolvePath(onlyOneChild.path)" :class="{'submenu-title-noDropdown':!isNest}">
          <item :icon="onlyOneChild.meta.icon||(item.meta&&item.meta.icon)" :title="onlyOneChild.meta.title" />
        </el-menu-item>
      </router-link>
    </template>

    <el-submenu v-else :index="resolvePath(item.path)" popper-append-to-body>
      <template slot="title">
        <item v-if="item.meta" :icon="item.meta.icon" :title="item.meta.title" />
      </template>
      <sidebar-item
        v-for="child in item.children"
        :key="child.path"
        :is-nest="true"
        :item="child"
        :base-path="resolvePath(child.path)"
        class="nest-menu"
      />
    </el-submenu>
  </div>
</template>

<script>
import path from 'path'
import Item from './Item'

export default {
  name: 'SidebarItem',
  components: {
    Item
  },
  props: {
    item: {
      type: Object,
      required: true
    },
    isNest: {
      type: Boolean,
      default: false
    },
    basePath: {
      type: String,
      default: ''
    }
  },
  data() {
    this.onlyOneChild = null
    return {} // 这里注意将onlyOneChild放在return里面和放在return外面的区别
  },
  methods: {
    hasOneShowingChild(children = [], parent) {
      const showingChildren = children.filter(item => {
        if (item.hidden) {
          return false
        } else {
          // Temp set (will be used if only has one showing child)
          this.onlyOneChild = item
          return true
        }
      })

      // 当只有一个可显示的子菜单，则父菜单默认显示
      if (showingChildren.length === 1) {
        return true
      }

      // Show parent if there are no child router to display
      if (showingChildren.length === 0) {
        // 这里置path为''很重要
        this.onlyOneChild = { ... parent, path: '', noShowingChildren: true }
        return true
      }

      return false
    },
    resolvePath(routerPath) {
      return path.resolve(this.basePath, routerPath)
    }
  }
}
</script>
