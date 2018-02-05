<template>
  <div id="app">
    <router-view class="app-content"/>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="scss">
@import './styles/index';
@import './styles/reset';
@import './styles/iconfont';
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
  width: 100%;
  color: #2c3e50;
  font-size: 1.3rem;
  .anchorBL {
    display: none;
  }
  .app-content {
    position: absolute;
  }
}
</style>
