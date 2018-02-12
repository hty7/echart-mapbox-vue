<template>
  <section class="permanent">
    <div ref="chart-map" style="height:100%;width:100%;position: absolute;"></div>
    <div style="position: fixed;bottom: 0;right: 0;width: 70%;">
      <Table :columns="columns" :data="chartData"></Table>
    </div>
  </section>
</template>

<script>
import echarts from 'echarts'
import mapboxgl from 'mapbox-gl'
import MapboxLanguage from '@mapbox/mapbox-gl-language'
import gdData from '@/utils/guangdong.json'
export default {
  components: {
  },
  data () {
    return {
      show: false,
      count: 0,
      counts: 0,
      dimensionType: 1, // 2d/3d切换
      isFull: 1,
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
      columns: [
        {title: 'Name', key: 'name'},
        {title: 'Age', key: 'age'},
        {title: 'Address', key: 'address'}
      ],
      chartData: [
        {
          name: 'John Brown',
          age: 18,
          address: 'New York No. 1 Lake Park',
          date: '2016-10-03'
        },
        {
          name: 'Jim Green',
          age: 24,
          address: 'London No. 1 Lake Park',
          date: '2016-10-01'
        },
        {
          name: 'Joe Black',
          age: 30,
          address: 'Sydney No. 1 Lake Park',
          date: '2016-10-02'
        },
        {
          name: 'Jon Snow',
          age: 26,
          address: 'Ottawa No. 2 Lake Park',
          date: '2016-10-04'
        }
      ]
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
    // 数据初始化
    async loadData (params) {
      mapboxgl.accessToken = 'pk.eyJ1IjoieWFuZ2ppYW4iLCJhIjoiY2phaG1neno0MXFkNDMzbWhwNWw0bWM4aiJ9.CFmrh0LVWAbmVeed-Xr7wA'
      window.mapboxgl = mapboxgl
      window.echarts = echarts
      let map = new mapboxgl.Map({
        container: this.$refs['chart-map'],
        style: 'mapbox://styles/yangjian/cjc1e9v1c0ast2sp2n0ufw7r9',
        center: [113.206456, 23.072519],
        bearing: -10,
        pitch: 60,
        zoom: 6
      })
      map.addControl(new mapboxgl.NavigationControl())
      map.addControl(new MapboxLanguage({
        defaultLanguage: 'zh'
      }))
      var EchartLayer = require('echartslayer')
      map.on('load', () => {
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
            'fill-color': '#42e6ff',
            'fill-opacity': 0.1
          }
        })
        map.addLayer({
          'id': 'state-borders',
          'type': 'line',
          'source': 'states',
          'layout': {},
          'paint': {
            'line-color': '#CCC',
            'line-width': 1,
            'line-opacity': 0.5
          }
        })
        map.addLayer({
          'id': 'state-fills-hover',
          'type': 'fill',
          'source': 'states',
          'layout': {},
          'paint': {
            'fill-color': 'orange',
            'fill-opacity': 0.7
          },
          'filter': ['==', 'name', '']
        })
        map.on('mousemove', 'state-fills', e => {
          map.getCanvas().style.cursor = 'pointer'
          map.setFilter('state-fills-hover', ['==', 'name', e.features[0].properties.name])
        })
        map.on('mouseleave', 'state-fills', () => {
          map.getCanvas().style.cursor = ''
          map.setFilter('state-fills-hover', ['==', 'name', ''])
        })
        map.on('click', 'state-fills', e => {
          self.isFull = '0'
          self.changeCity(e.features[0].properties.id)
        })
        this.options = {
          tooltip: {
            trigger: 'item',
            formatter: function (params) {
              if (params.seriesType === 'effectScatter') {
                if (params.value[2] === 'undefined') {
                  return params.name + ' : ' + params.value
                } else {
                  return params.name + ' : ' + params.value[2]
                }
              }
            }
          },
          GLMap: {
            roam: true
          },
          series: [
            {
              type: 'lines',
              coordinateSystem: 'GLMap',
              zlevel: 1,
              effect: {
                show: true,
                period: 4,
                trailLength: 0.7,
                color: '#00fff5',
                symbolSize: 3
              },
              lineStyle: {
                normal: {
                  color: '#00fff5',
                  width: 0,
                  curveness: 0.2
                }
              },
              data: [
                [[113.475995, 23.417055], [112.994017, 23.032548]],
                [[113.475995, 23.417055], [113.761870, 23.032629]],
                [[113.475995, 23.417055], [114.032357, 22.675157]],
                [[113.475995, 23.417055], [113.761870, 23.032629]],
                [[113.475995, 23.417055], [114.413784, 23.131249]],
                [[113.475995, 23.417055], [114.032357, 22.675157]],
                [[113.475995, 23.417055], [113.388499, 22.531929]],
                [[113.475995, 23.417055], [113.234262, 22.167468]],
                [[113.475995, 23.417055], [111.782165, 22.068633]],
                [[113.475995, 23.417055], [113.072816, 24.205702]]
              ]
            },
            {
              type: 'lines',
              coordinateSystem: 'GLMap',
              zlevel: 2,
              effect: {
                show: true,
                period: 4,
                trailLength: 0,
                symbol: 'arrow',
                symbolSize: 10
              },
              lineStyle: {
                normal: {
                  color: '#00fff5',
                  width: 2,
                  opacity: 0.4,
                  shadowColor: 'rgba(0, 0, 0, 0.3)',
                  shadowBlur: 10,
                  curveness: 0.2
                }
              },
              data: [
                [[113.475995, 23.417055], [112.994017, 23.032548]],
                [[113.475995, 23.417055], [113.761870, 23.032629]],
                [[113.475995, 23.417055], [114.032357, 22.675157]],
                [[113.475995, 23.417055], [113.761870, 23.032629]],
                [[113.475995, 23.417055], [114.413784, 23.131249]],
                [[113.475995, 23.417055], [114.032357, 22.675157]],
                [[113.475995, 23.417055], [113.388499, 22.531929]],
                [[113.475995, 23.417055], [113.234262, 22.167468]],
                [[113.475995, 23.417055], [111.782165, 22.068633]],
                [[113.475995, 23.417055], [113.072816, 24.205702]]
              ]
            },
            {
              type: 'effectScatter',
              coordinateSystem: 'GLMap',
              zlevel: 3,
              rippleEffect: {
                period: 4,
                brushType: 'stroke',
                scale: 4
              },
              label: {
                normal: {
                  show: true,
                  color: '#fff',
                  position: 'right',
                  offset: [5, 0],
                  formatter: '{b}'
                },
                emphasis: {
                  show: true
                }
              },
              symbol: 'circle',
              symbolSize: val => {
                return 4 + val[2] / 10
              },
              itemStyle: {
                normal: {
                  shadowColor: 'rgba(0, 0, 0, 1)',
                  shadowBlur: 10,
                  color: 'rgba(245, 126, 0, 1)'
                }
              },
              data: this.palceCodData.map((item) => {
                return {name: item.name, value: item.value.concat(100)}
              })
            }
          ]
        }
        console.log(EchartLayer)
        let echartslayer = new EchartLayer(map)
        echartslayer.chart.setOption(this.options)
      })
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
.permanent {
  .ivu-table-wrapper {
    border: 1px solid #000;
  }
  .ivu-table {
    color: #eee;
    background-color: rgba(16, 16, 16, 0.3);
  }
  .ivu-table th {
    height: 30px;
    background-color: rgba(0, 0, 43, 0.4);
  }
  .ivu-table td, .ivu-table th {
    height: 30px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.7);
  }
  .ivu-table td {
    background-color: rgba(33, 33, 33, 0.4);
  }
}
</style>
