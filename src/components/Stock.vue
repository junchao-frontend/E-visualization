<template>
  <div class="com-container">
    <div class="com-chart" ref="stock_ref">1111</div>
  </div>
</template>

<script>
import { getstockData } from '../api/wjc.js'
export default {
  name: '',

  data () {
    return {
      chartInstance: null,
      allData: null,
      currentIndex: 0,
      timerId: null
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
    clearInterval(this.timerId)
  },
  methods: {
    initChart () {
      this.chartInstance = this.$echarts.init(this.$refs.stock_ref, 'chalk')
      const initOption = {
        title: {
          text: '▎库存和销量分析',
          left: 20,
          top: 20
        }
      }
      this.chartInstance.setOption(initOption)
      this.chartInstance.on('mouseover', () => {
        clearInterval(this.timerId)
      })
      this.chartInstance.on('mouseout', () => {
        this.startInterval()
      })
    },
    getData () {
      getstockData().then(res => {
        this.allData = res.data
        console.log(this.allData)
        this.updateChart()
        this.startInterval()
      })
    },
    updateChart () {
      const centerArr = [
        ['18%', '40%'],
        ['50%', '40%'],
        ['82%', '40%'],
        ['34%', '75%'],
        ['66%', '75%']
      ]
      const colorArr = [
        ['#4FF778', '#0BA82C'],
        ['#E5DD45', '#E8B11C'],
        ['#E8821C', '#E55445'],
        ['#5052EE', '#AB6EE5'],
        ['#23E5E5', '#2E72BF']
      ]
      const start = this.currentIndex * 5
      const end = (this.currentIndex + 1) * 5
      const showData = this.allData.slice(start, end)
      const seriesArr = showData.map((item, index) => {
        return {
          type: 'pie',
          center: centerArr[index],
          radius: [110, 100],
          hoverAnimation: false, // 关闭鼠标移入到饼图时的动画效果
          labelLine: {
            show: false // 隐藏指示线
          },
          label: {
            normal: {
              show: false,
              position: 'center',
              color: colorArr[index][0]
            }
          },
          data: [
            {
              name: item.name + '\n' + item.sales,
              label: {
                normal: {
                  show: true
                }
              },
              value: item.sales,
              itemStyle: {
                color: new this.$echarts.graphic.LinearGradient(0, 1, 0, 0, [
                  {
                    offset: 0,
                    color: colorArr[index][0]
                  },
                  {
                    offset: 1,
                    color: colorArr[index][1]
                  }
                ])
              }
            },
            {
              value: item.stock,
              itemStyle: {
                color: '#333843'
              }
            }
          ]
        }
      })
      const dataOption = {
        series: seriesArr
      }
      this.chartInstance.setOption(dataOption)
    },
    screenAdapter () {
      const titleFontSize = this.$refs.stock_ref.offsetWidth / 100 * 3.6
      const innerRadius = titleFontSize * 2
      const outterRaidus = innerRadius * 1.125
      const adapterOption = {
        title: {
          textStyle: {
            fontSize: titleFontSize
          },
          series: [
            {
              type: 'pie',
              radius: [outterRaidus, innerRadius],
              label: {
                fontSize: titleFontSize
              }
            },
            {
              type: 'pie',
              radius: [outterRaidus, innerRadius],
              label: {
                fontSize: titleFontSize
              }
            },
            {
              type: 'pie',
              radius: [outterRaidus, innerRadius],
              label: {
                fontSize: titleFontSize
              }
            },
            {
              type: 'pie',
              radius: [outterRaidus, innerRadius],
              label: {
                fontSize: titleFontSize
              }
            },
            {
              type: 'pie',
              radius: [outterRaidus, innerRadius],
              label: {
                fontSize: titleFontSize
              }
            }
          ]
        }
      }
      this.chartInstance.setOption(adapterOption)
      this.chartInstance.resize()
    },
    startInterval () {
      if (this.timerId) {
        clearInterval(this, this.timerId)
      }
      this.timerId = setInterval(() => {
        this.currentIndex++
        if (this.currentIndex > 1) {
          this.currentIndex = 0
        }
        this.updateChart()
      }, 3000)
    }
  }
}
</script>
