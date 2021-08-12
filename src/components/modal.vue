<template>
  <div class="com-container">
    <div class="com-chart" ref="trend_ref">1111</div>
  </div>
</template>

<script>
export default {
  name: '',

  data () {
    return {
      chartInstance: null
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
      const initOption = {}
      this.chartInstance.setOption(initOption)
    },
    getData () {
      this.updateChart()
    },
    updateChart () {
      const dataOption = {}
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
