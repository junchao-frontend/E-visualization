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
      allData: null,
      currentPage: 1, // 当前页数
      totalPage: null, // 总共的页数
      showData: null,
      timerId: null // 定时器的标识
    }
  },
  mounted () {
    this.initChart()
    this.getData()
    // console.log(window.echarts)
  },
  destroyed () {
    clearInterval(this.timerId)
  },
  methods: {
    initChart () {
      this.chartInstance = this.$echarts.init(this.$refs.seller_ref, 'chalk')
      // 对图表对象进行鼠标事件的监听
      this.chartInstance.on('mouseover', () => {
        clearInterval(this.timerId)
      })
      this.chartInstance.on('mouseout', () => {
        this.startInterval()
      })
    },
    getData () {
      getsalesData().then(res => {
        this.allData = res.data
        this.allData.sort((a, b) => {
          return a.value - b.value
        })
        // 每五个元素显示一页 算一下一共有多少页数据
        this.totalPage = this.allData.length % 5 === 0 ? this.allData.length / 5 : this.allData.length / 5 + 1
        this.updateChart()
        // 启动定时器
        this.startInterval()
      })
    },
    updateChart () {
      const start = (this.currentPage - 1) * 5
      const end = this.currentPage * 5
      const showData = this.allData.slice(start, end)
      const sellerNames = showData.map((item) => {
        return item.name
      })
      const sellerValues = showData.map((item) => {
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
    },
    startInterval () {
      if (this.timerId) {
        clearInterval(this, this.timerId)
      }
      this.timerId = setInterval(() => {
        this.currentPage++
        if (this.currentPage > this.totalPage) {
          this.currentPage = 1
        }
        this.updateChart()
      }, 300000)
    }
  }
}
</script>
