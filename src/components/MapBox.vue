<template>
  <section class="vmapbox">
    <div ref="chart-map" style="height:100%;width:100%;"></div>
    <div class="vmapbox-mapStyle">
      <!-- <transition name="slide-fade"> -->
        <ButtonGroup shape="circle" size="small" class="vmapbox-mapStyle-content" v-show="show">
          <Button type="primary" @click="mapStyleTogger('satellite-v9')">
            <Poptip trigger="hover" placement="bottom">
              <Icon type="ios-world"></Icon> 卫星地图
              <div slot="content">
                <img src="static/img/mapstyle-satellite.png"/>
              </div>
            </Poptip>
          </Button>
          <Button type="primary" @click="mapStyleTogger('dark-v9')">
            <Poptip trigger="hover" placement="bottom">
              <Icon type="ios-world-outline"></Icon> 自定义地图
              <div slot="content">
                <img src="static/img/mapstyle-dark.png"/>
              </div>
            </Poptip>
          </Button>
        </ButtonGroup>
      <!-- </transition> -->
      <Button :type="show?'primary':'default'" shape="circle" icon="map" @click="mapStyleShow"></Button>
    </div>
    <div class="vmapbox-dimension" v-show="!show">
      <Tooltip content="2D/3D切换" placement="left">
        <Button :type="dimensionType?'primary':'default'" shape="circle" icon="earth" @click="dimensionTogger"></Button>
      </Tooltip>
    </div>
    <transition name="slide-fade">
      <div class="windowDialog" style="position: fixed;top: 0;left: 0;width: 200px;
      height: 300px;background: rgba(199, 199, 199, 0.7);border-radius: 15px;border: 1px solid rgb(72, 72, 72);
      box-shadow: rgba(0, 0, 0, 0.6) 2px 3px 5px 0px;" ref="windowDialog" v-show.syncy="winDialogShow">{{cityName}}</div>
    </transition>
  </section>
</template>

<script>
import echarts from 'echarts'
import 'echarts-gl'
import mapboxgl from 'mapbox-gl'
import MapboxLanguage from '@mapbox/mapbox-gl-language'
import gdData from '@/utils/guangdong.json'
import gdPostion from '@/utils/gdPostion.json'
export default {
  components: {
  },
  data () {
    return {
      show: false,
      mapType: 'satellite-v9',
      dimensionType: 1, // 2d/3d切换
      count: 0,
      chart: null,
      options: null,
      chooseCity: '广州市',
      map: null,
      palceCodData: [
        {name: '广州市', value: [113.475995, 23.417055]},
        {name: '深圳市', value: [114.032357, 22.675157]},
        {name: '珠海市', value: [113.234262, 22.167468]},
        {name: '汕头市', value: [116.442536, 23.305796]},
        {name: '佛山市', value: [112.994017, 23.032548]},
        {name: '韶关市', value: [113.590304, 24.844739]},
        {name: '湛江市', value: [110.064944, 21.335451]},
        {name: '肇庆市', value: [112.165740, 23.464062]},
        {name: '江门市', value: [112.687406, 22.397417]},
        {name: '茂名市', value: [110.886700, 21.850193]},
        {name: '惠州市', value: [114.413784, 23.131249]},
        {name: '梅州市', value: [116.123213, 24.307352]},
        {name: '汕尾市', value: [115.378103, 23.046161]},
        {name: '河源市', value: [114.794798, 23.867677]},
        {name: '阳江市', value: [111.782165, 22.068633]},
        {name: '清远市', value: [113.072816, 24.205702]},
        {name: '东莞市', value: [113.761870, 23.032629]},
        {name: '中山市', value: [113.388499, 22.531929]},
        {name: '潮州市', value: [116.623721, 23.779569]},
        {name: '揭阳市', value: [115.970463, 23.373230]},
        {name: '云浮市', value: [111.746914, 22.934758]}
      ],
      winDialogShow: false,
      cityName: ''
    }
  },
  mounted () {
    this.loadData()
  },
  computed: {
    gdCityData () {
      return gdData.features.map((item) => {
        return item.properties
      })
    }
  },
  methods: {
    dimensionTogger () {
      this.dimensionType = !this.dimensionType
      this.map.easeTo({
        pitch: this.dimensionType ? 60 : 0
      })
    },
    mapStyleShow () {
      this.show = !this.show
    },
    mapStyleTogger (e) {
      this.count = 0
      this.map.setStyle('mapbox://styles/mapbox/' + e)
      this.map.addControl(new MapboxLanguage({
        defaultLanguage: 'zh'
      }))
    },
    // 显示全省地图
    changeView (val) {
      if (val === '1') {
        this.options.series[0].data = this.setBarData(this.palceCodData, 1)
        this.options.series[1].data = this.setBarData(this.palceCodData, 0)
        this.options.series[0].barSize = 1
        this.options.series[1].barSize = 1
        this.options.mapbox.boxHeight = 20
        this.chart.setOption(this.options)
        this.map.flyTo({
          center: [113.206456, 23.072519],
          zoom: 6.2,
          speed: 0.8,
          curve: 1,
          bearing: 0,
          easing: t => t
        })
        this.setMapBox(gdData)
      }
    },
    // 数据初始化
    async loadData (params) {
      mapboxgl.accessToken = 'pk.eyJ1IjoieWFuZ2ppYW4iLCJhIjoiY2phaG1neno0MXFkNDMzbWhwNWw0bWM4aiJ9.CFmrh0LVWAbmVeed-Xr7wA'
      window.mapboxgl = mapboxgl
      this.chart = echarts.init(this.$refs['chart-map'])
      this.options = {
        visualMap: [{
          show: false,
          min: 0,
          max: 100,
          seriesIndex: 0,
          calculable: true,
          inRange: {
            color: ['#ffffbf', '#fee090', '#fdae61', '#f46d43', '#d73027', '#a50026']
          }
        }],
        mapbox: {
          center: [113.206456, 23.072519],
          zoom: 6.2,
          pitch: 60,
          bearing: 0,
          style: 'mapbox://styles/mapbox/satellite-v9',
          boxHeight: 20,
          light: {
            main: {
              intensity: 1,
              shadow: true,
              shadowQuality: 'high'
            },
            ambient: {
              intensity: 0.2
            }
          }
        },
        series: [
          {
            name: '常驻人口',
            type: 'bar3D',
            shading: 'realistic',
            coordinateSystem: 'mapbox',
            silent: true,
            barSize: 1, // 柱子粗细
            bevelSize: 0.3,
            emphasis: {
              label: {
                show: false
              }
            },
            label: {
              show: true,
              distance: 0,
              formatter: '{b}',
              textStyle: {
                fontSize: 12
              }
            },
            data: this.setBarData(this.palceCodData, 1)
          },
          {
            name: '流动人口',
            type: 'bar3D',
            shading: 'realistic',
            coordinateSystem: 'mapbox',
            silent: true,
            barSize: 1, // 柱子粗细
            bevelSize: 0.3,
            itemStyle: {
              color: '#00c5ac'
            },
            data: this.setBarData(this.palceCodData, 0)
          }
        ]
      }
      this.chart.setOption(this.options)
      const self = this
      window.onresize = () => {
        this.chart.resize()
      }
      this.map = this.chart.getModel().getComponent('mapbox3D').getMapbox()
      let map = this.map
      map.addControl(new mapboxgl.NavigationControl())
      map.addControl(new MapboxLanguage({
        defaultLanguage: 'zh'
      }))
      map.on('load', function () {
        map.addSource('states', {
          'type': 'geojson',
          'data': gdData
        })
        map.addLayer({
          'id': 'state-fills',
          'type': 'fill',
          'source': 'states',
          'layout': {},
          'paint': {
            'fill-color': '#627BC1',
            'fill-opacity': 0.1
          }
        })
        map.addLayer({
          'id': 'state-borders',
          'type': 'line',
          'source': 'states',
          'layout': {},
          'paint': {
            'line-color': '#fff',
            'line-width': 2
          }
        })
        map.addLayer({
          'id': 'state-fills-hover',
          'type': 'fill',
          'source': 'states',
          'layout': {},
          'paint': {
            'fill-color': 'orange',
            'fill-opacity': 0.3
          },
          'filter': ['==', 'name', '']
        })
        // let popup = new mapboxgl.Popup({
        //   closeButton: false,
        //   closeOnClick: false
        // })
        // map.on('mouseenter', 'state-fills', function (e) {
        //   map.getCanvas().style.cursor = 'pointer'
        //   popup.setLngLat(e.lngLat)
        //     .setHTML(e.features[0].properties.name)
        //     .addTo(map)
        // })
        map.on('mousemove', 'state-fills', e => {
          map.getCanvas().style.cursor = 'pointer'
          map.setFilter('state-fills-hover', ['==', 'name', e.features[0].properties.name])
          let el = e.features[0].properties.name
          let postion = e.point
          self.showWinDialog(true, el, postion)
        })
        map.on('mouseleave', 'state-fills', () => {
          map.getCanvas().style.cursor = ''
          // popup.remove()
          map.setFilter('state-fills-hover', ['==', 'name', ''])
          self.showWinDialog(false)
        })
        map.on('click', 'state-fills', e => {
          self.changeCity(e.features[0].properties.id)
        })
      })
    },
    showWinDialog (status, el, postion) {
      if (postion) {
        this.cityName = el
        let boxHeight = window.innerHeight - 300
        let boxWidth = window.innerWidth - 280 // 右边存在80px空间
        if (boxHeight > postion.y) {
          this.$refs.windowDialog.style.top = postion.y - 30 + 'px'
        } else {
          this.$refs.windowDialog.style.top = boxHeight + 'px'
        }
        if (boxWidth > postion.x) {
          this.$refs.windowDialog.style.left = postion.x + 30 + 'px'
        } else {
          this.$refs.windowDialog.style.left = boxWidth + 'px'
        }
      }
      this.winDialogShow = status
    },
    // 获取城市区镇中心点
    setBarData (data, status) {
      if (status) {
        return data.map(function (item, index) {
          return {name: item.name, value: item.value.concat(100 * Math.random())}
        })
      } else {
        let positionOffset = data.map(function (item, index) {
          return {name: item.name, value: [item.value[0] + 0.18, item.value[1]]}
        })
        return positionOffset.map(function (item, index) {
          return {name: item.name, value: item.value.concat(100 * Math.random())}
        })
      }
    },
    // 城市改变时更换视口
    async changeCity (cityCode) {
      let chooseCity = null
      this.gdCityData.map((item, index) => {
        if (parseInt(item.id) === parseInt(cityCode)) chooseCity = item
      })
      if (chooseCity) {
        this.options.series[0].data = this.setBarData(gdPostion[chooseCity.name], 1)
        this.options.series[1].data = this.setBarData(gdPostion[chooseCity.name], 0)
        this.options.series[0].barSize = 0.2
        this.options.series[1].barSize = 0.2
        this.options.mapbox.boxHeight = 2
        this.chart.setOption(this.options)
        this.map.flyTo({
          center: chooseCity.cp,
          zoom: 8.5,
          bearing: -30,
          speed: 0.7,
          curve: 1,
          easing: t => t
        })
        this.options.mapbox.center = chooseCity.cp
      }
      let data = require(`@/utils/city/${cityCode}.json`)
      this.setMapBox(data)
    },
    // 绘制城市区镇边界
    setMapBox (data) {
      this.count += 1
      let map = this.map
      if (this.count !== 1) {
        map.removeSource('state')
        map.addSource('state', {
          'type': 'geojson',
          'data': data
        })
      } else {
        map.addSource('state', {
          'type': 'geojson',
          'data': data
        })
        map.addLayer({
          'id': 'state-fill',
          'type': 'fill',
          'source': 'state',
          'layout': {},
          'paint': {
            'fill-color': '#42e6ff',
            'fill-opacity': 0.2
          }
        })
        map.addLayer({
          'id': 'state-border',
          'type': 'line',
          'source': 'state',
          'layout': {},
          'paint': {
            'line-color': '#ccc',
            'line-width': 2
          }
        })
        map.addLayer({
          'id': 'state-fill-hover',
          'type': 'fill',
          'source': 'state',
          'layout': {},
          'paint': {
            'fill-color': '#42e6ff',
            'fill-opacity': 0.4
          },
          'filter': ['==', 'name', '']
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.vmapbox {
  display: flex;
  flex-direction: column;
  color: #fff;
  &-dimension {
    position: fixed;
    top: 18rem;
    right: 1.5rem;
  }
  &-mapStyle {
    position: fixed;
    top: 15rem;
    right: 1.5rem;
    &-content {
      display: inline-block;
    }
  }
  &-rotate {
    position: fixed;
    top: 18rem;
    right: 1.5rem;
  }
}
.slide-fade-enter-active {
  transition: all .5s ease;
}
.slide-fade-leave-active {
  transition: all .2s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to {
  transform: translateX(50px);
  opacity: 0;
}
</style>
<style lang="scss">
.mapboxgl-ctrl-top-right {
  top: 6rem;
  right: 0.8rem;
}
</style>
