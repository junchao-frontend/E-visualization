<template>
  <div class="com-container">
    <div class="com-chart" ref="trend_ref">1111</div>
  </div>
</template>

<script>
import { gettrendData } from '../api/wjc.js'
export default {
  name: '',

  data () {
    return {
      chartInstance: null,
      allData: null
    }
  },
  mounted () {
    this.initChart()
    this.getData()
    window.addEventListener('resize', this.screenAdapter)
    this.screenAdapter()
  },
  destroyed () {
    window.removeEventListener('resize', this.screenAdapter)
  },
  methods: {
    initChart () {
      this.chartInstance = this.$echarts.init(this.$refs.trend_ref)
      const initOption = {
        xAxis: {
          type: 'category'
        },
        yAxis: {
          type: 'value'
        }
      }
      this.chartInstance.setOption(initOption)
    },
    getData () {
      gettrendData().then(res => {
        this.allData = res.data
        this.updateChart()
      })
    },
    updateChart () {
      const timeArr = this.allData.common.month
      const valueArr = this.allData.map.data
      const seriesArr = valueArr.map(item => {
        return {
          name: item.name,
          type: 'line',
          data: item.data,
          stack: 'map'
        }
      })
      const legendArr = valueArr.map(item => {
        return item.name
      })
      const dataOption = {
        xAxis: {
          data: timeArr
        },
        legend: {
          data: legendArr
        },
        series: seriesArr
      }
      this.chartInstance.setOption(dataOption)
    },
    screenAdapter () {
      const adapterOption = {}
      this.chartInstance.setOption(adapterOption)
      this.chartInstance.resize()
    }
  }
}
</script>
