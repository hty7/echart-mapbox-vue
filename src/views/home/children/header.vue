<template>
  <div class="header">
    <Icon type="person" class="header-av"></Icon>
  </div>
</template>

<script>
export default {
  data () {
    return {
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
.header {
  width: 40px;
  height: 40px;
  position: fixed;
  top: 1.5rem;
  right: 1.5rem;
  border: 1.2px #adf6ff solid;
  box-shadow: 1px 1px 2px #000;
  background: rgba(2, 158, 185, 0.64);
  border-radius: 50%;
  &-av {
    font-size: 3.5rem;
    color: #fff;
    margin: 0 auto;
    display: table;
  }
}
</style>
