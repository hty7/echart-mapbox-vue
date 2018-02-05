<template>
  <aside class="menu-sidebar">
    <!--导航菜单-->
    <Menu mode="horizontal" theme="dark" active-name="/permanent" @on-select="onSelect">
      <MenuItem v-for="(item, index) in routes[0].children" :key="index" :name="item.path">
        <router-link :to="{ path: item.path}">
          <Icon :type="item.icon"></Icon>{{item.name}}
        </router-link>
      </MenuItem>
    </Menu>
  </aside>
</template>

<script>
import {routes} from '@/utils/const'
export default {
  data () {
    return {
      routes,
      activeItem: '/permanent'
    }
  },
  methods: {
    onSelect (val) {
      this.activeItem = val
    }
  }
}
</script>

<style lang="scss" scoped>
.menu-sidebar {
  position: fixed;
  z-index: 999;
  top: 2rem;
  right: 5%;
}
.ivu-menu-dark {
  background: none;
}
.ivu-menu-horizontal {
  height: 4rem;
  line-height: 2.2rem;
}
.ivu-menu-dark.ivu-menu-horizontal .ivu-menu-item {
  margin-right: 0.5rem;
  border: 1.2px #adf6ff solid;
  border-radius: 10px;
  box-shadow: 1px 1px 2px #000;
  background: rgba(2, 158, 185, 0.64);
}
.ivu-menu-dark.ivu-menu-horizontal .ivu-menu-item a{
  color: #fff;
}
.ivu-menu-dark.ivu-menu-horizontal .ivu-menu-item:hover {
  background: rgb(0, 186, 219);
}
.ivu-menu-dark.ivu-menu-horizontal .ivu-menu-item-active {
  box-shadow: 2px 3px 5px #000;
  background: rgba(2, 158, 185, 0.8);
}
.ivu-menu-dark.ivu-menu-horizontal .ivu-menu-item-active a{
  font-size: 1.5rem;
  font-weight: bold;
  color: rgb(255, 150, 109);
  text-shadow: 1px 1px 4px #000;
}
</style>
