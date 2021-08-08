<template>
  <div>
    <button @click="ceshi()">asdasdas</button>
    <div
      id="main"
      style="width: 600px; height: 400px; border: 1px solid red"
    ></div>
  </div>
</template>
<script>
import { Ceshi } from '@/api/wjc.js'
export default {
  name: '',
  data () {
    return {}
  },
  mounted () {
    this.initBar()
  },
  methods: {
    ceshi () {
      Ceshi().then(res => {
        console.log(res)
      })
    },
    initBar () {
      // var myChart = this.$echarts.init(document.getElementById('main'), 'dark');
      // // 指定图表的配置项和数据
      // var xDataArr = ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
      // var yDataArr = [5, 20, 36, 10, 10, 20]

      var myChart = this.$echarts.init(document.getElementById('main'), 'dark')
      // 指定图表的配置项和数据
      var xDataArr = ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
      var yDataArr = [5, 20, 36, 10, 10, 20]
      var option = {
        animation: true, // 开启动画
        // animationDuration:7000, 动画时长
        title: {
          text: 'ECharts 入门示例'
        },
        tooltip: {},
        legend: {
          data: ['销量']
        },
        xAxis: {
          type: 'category',
          data: xDataArr
        },
        yAxis: {},
        series: [{
          name: '销量',
          type: 'bar',
          data: yDataArr,
          itemStyle: {
            color: {
              type: 'linear', // 线性渐变
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0, color: 'red' // 0%出的颜色
                },
                {
                  offset: 1, color: 'skyblue' // 0%出的颜色
                }
              ]
            }
          }
        }]
      }
      myChart.setOption(option)
    }
  }
}
</script>
