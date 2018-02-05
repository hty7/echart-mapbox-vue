<template>
  <section class="permanent">
    <div class="permanent-citySelect">
      <RadioGroup v-model="isFull" type="button" size="small" @on-change="changeView">
        <Radio label="1">全省</Radio>
        <Radio label="0">地级市</Radio>
      </RadioGroup>
      <Select v-model="chooseCity" placeholder="选择范围" style="width:300px" @on-change="changeCity" v-if="isFull === '0'">
        <Option v-for="item in gdCityData" :value="item.id" :key="item.id">{{ item.name }}</Option>
      </Select>
    </div>
    <VmapBox style="height:100%;width:100%;" ref='vmapBox'></VmapBox>
    <Vsidebox></Vsidebox>
  </section>
</template>

<script>
import gdData from '@/utils/guangdong.json'
import Vsidebox from './children/sidebox'
import VmapBox from '@/components/MapBox'
export default {
  components: {
    Vsidebox, VmapBox
  },
  data () {
    return {
      isFull: 1,
      chooseCity: '4401'
    }
  },
  mounted () {
  },
  computed: {
    gdCityData () {
      return gdData.features.map((item) => {
        return item.properties
      })
    }
  },
  methods: {
    // 省市切换
    changeView (val) {
      this.$refs.vmapBox.changeView(val)
    },
    // 切换地级市
    changeCity (e) {
      this.$refs.vmapBox.changeCity(e)
    }
  }
}
</script>

<style lang="scss" scoped>
.permanent {
  display: flex;
  flex-direction: column;
  color: #fff;
  &-citySelect {
    position: absolute;
    top: 8rem;
    left: 2%;
    width: 200px;
    height: 50px;
    z-index: 100;
  }
}
</style>
<style lang="scss">
.mapboxgl-ctrl-top-right {
  top: 6rem;
  right: 0.8rem;
}
.permanent .ivu-select-selection {
  background-color: rgba(0, 0, 0, 0.6);
  border: 1px solid #3c6b71;
}
.permanent .ivu-select {
  color: #fff;
}
</style>
