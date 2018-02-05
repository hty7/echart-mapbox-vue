<template>
  <div class="sidebox">
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
.sidebox {
  width: 350px;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  border-right: 1px solid #000;
  background: rgba(51, 51, 51, 0.8);
}
</style>
