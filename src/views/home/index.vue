<template>
  <div class="home">
    <div class="home-header">广东人口大数据</div>
    <div class="home-main">
      <Vmenu></Vmenu>
      <router-view class="home-main-content"/>
      <Vsetting></Vsetting>
      <Vheader></Vheader>
    </div>
  </div>
</template>

<script>
import Vmenu from './children/menu'
import Vsetting from './children/setting'
import Vheader from './children/header'
export default {
  data () {
    return {
    }
  },
  components: {
    Vmenu, Vsetting, Vheader
  },
  computed: {
  }
}
</script>

<style lang="scss" scoped>
.home {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  &-header {
    position: fixed;
    top: 1.5rem;
    left: 1.8rem;
    z-index: 999;
    font-size: 3rem;
    color: #fff;
  }
  &-main {
    flex: 1;
    display: flex;
    &-content {
      flex: 1;
      background-color: #1a0038;
      overflow-y: auto;
    }
  }
}
</style>


