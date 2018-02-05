<template>
  <div class="setting">
    <Button type="primary" shape="circle" icon="ionic" @click="modal1 = true">帮助</Button>
    <Modal v-model="modal1" title="帮助">
      <p>1、鼠标右键可进行地图视角调整</p>
    </Modal>
  </div>
</template>

<script>
export default {
  data () {
    return {
      modal1: false
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
.setting {
  font-size: 2rem;
  color: #fff;
  position: fixed;
  bottom: 3rem;
  left: 0.5rem;
}
</style>
