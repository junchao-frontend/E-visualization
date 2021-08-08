<template>
  <div class="com-container">
    <div class="com-chart" ref="seller_ref"></div>
  </div>
</template>

<script>
import { getsalesData } from '../api/wjc.js'
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
  },
  methods: {
    initChart () {
      this.chartInstance = this.$echarts.init(this.$refs.seller_ref)
    },
    getData () {
      getsalesData().then(res => {
        this.allData = res.data
        this.updateChart()
      })
    },
    updateChart () {
      const sellerNames = this.allData.map((item) => {
        return item.name
      })
      const sellerValues = this.allData.map((item) => {
        return item.value
      })
      const option = {
        xAxis: {
          type: 'value'
        },
        yAxis: {
          type: 'category',
          data: sellerNames
        },
        series: [
          {
            type: 'bar',
            data: sellerValues
          }
        ]
      }
      this.chartInstance.setOption(option)
    }
  }
}
</script>
