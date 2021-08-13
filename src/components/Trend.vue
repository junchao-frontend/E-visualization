<template>
  <div class="com-container">
    <div class="title" :style="showtitleFontSize">
      <span>{{ '▎'+' ' +' '+ showTitle}}</span>
      <span class="iconfont title-icon" @click="selectShow=!selectShow" :style="showtitleFontSize">&#xe6eb;</span>
      <div class="select" v-show="selectShow" :style="marginStyle">
        <div class="select-item" v-for="item in selectTypes" :key="item.key" @click="switchData(item.key)">{{item.text}}</div>
      </div>
    </div>
    <div class="com-chart" ref="trend_ref"></div>
  </div>
</template>

<script>
import { gettrendData } from '../api/wjc.js'
export default {
  name: '',

  data () {
    return {
      chartInstance: null,
      allData: null,
      selectShow: false,
      choiceType: 'map',
      titleFontSize: 0
    }
  },
  mounted () {
    this.initChart()
    this.getData()
    window.addEventListener('resize', this.screenAdapter)
    this.screenAdapter()
  },
  computed: {
    selectTypes () {
      if (!this.allData) {
        return []
      } else {
        return this.allData.type.filter(item => {
          return item.key !== this.choiceType
        })
      }
    },
    showTitle () {
      if (!this.allData) {
        return ''
      } else {
        return this.allData[this.choiceType].title
      }
    },
    showtitleFontSize () {
      // console.log(this.titleFontSize, '111111')
      return {
        fontSize: this.titleFontSize + 'px'
      }
    },
    marginStyle () {
      return {
        marginLeft: this.titleFontSize + 'px'
      }
    }
  },
  destroyed () {
    window.removeEventListener('resize', this.screenAdapter)
  },
  methods: {
    initChart () {
      this.chartInstance = this.$echarts.init(this.$refs.trend_ref, 'chalk')
      const initOption = {
        grid: {
          left: '3%',
          top: '35%',
          right: '4%',
          bottom: '1%',
          containLabel: true
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          left: 20,
          top: '15%',
          icon: 'circle'
        },
        xAxis: {
          type: 'category',
          boundaryGap: false
        },
        yAxis: {
          type: 'value'
        }
      }
      this.chartInstance.setOption(initOption)
    },
    getData () {
      gettrendData().then(res => {
        console.log(res)
        this.allData = res.data
        this.updateChart()
      })
    },
    updateChart () {
      // 半透明的颜色值
      const colorArr1 = [
        'rgba(11,168,44,0.5)',
        'rgba(44,110,255,0.5)',
        'rgba(22,242,217,0.5)',
        'rgba(254,33,30,0.5)',
        'rgba(250,105,0,0.5)'
      ]
      const colorArr2 = [
        'rgba(11,168,44,0)',
        'rgba(44,110,255,0)',
        'rgba(22,242,217,0)',
        'rgba(254,33,30,0)',
        'rgba(250,105,0,0)'
      ]
      const timeArr = this.allData.common.month
      const valueArr = this.allData[this.choiceType].data
      const seriesArr = valueArr.map((item, index) => {
        // console.log(this.allData[this.choiceType], '11111')
        return {
          name: item.name,
          type: 'line',
          data: item.data,
          stack: this.choiceType,
          areaStyle: {
            color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
              // 百分之0状态下的颜色
              {
                offset: 0,
                color: colorArr1[index]
              },
              {
                offset: 1,
                color: colorArr2[index]
              }
            ])
          }
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
      this.titleFontSize = this.$refs.trend_ref.offsetWidth / 100 * 3.6
      // console.log(this.titleFontSize, '2222')
      const adapterOption = {
        legend: {
          itemWidth: this.titleFontSize,
          itemHeight: this.titleFontSize,
          itemGap: this.titleFontSize,
          textStyle: {
            fontSize: this.titleFontSize / 2
          }
        }
      }
      this.chartInstance.setOption(adapterOption)
      this.chartInstance.resize()
    },
    switchData (currentType) {
      // console.log(currentType)
      this.choiceType = currentType
      this.updateChart()
      this.selectShow = false
    }
  }
}
</script>
<style scoped>
.title{
  position: absolute;
  top:20px;
  left:20px;
  color: white;
  z-index: 10;
}
.title-icon{
  margin-left: 10px;
  cursor:pointer
}
.select{
  background-color: #222733;
}
</style>
