<template>
  <div>
    <h4>{{index + 1}}. {{answer.title}}</h4>
    <el-table border stripe :data="options">
      <el-table-column label="选项" prop="value"></el-table-column>
      <el-table-column label="数量" prop="count"></el-table-column>
      <el-table-column label="占比">
        <template slot-scope="{row}">
          <el-progress :percentage="answer.values.length ? parseInt(row.count * 100 / answer.values.length) : 0"></el-progress>
        </template>
      </el-table-column>
    </el-table>
    <div style="margin: 14px 0;">
      <el-button @click="chartMode = '饼图'" :type="chartMode === '饼图' ? 'primary' : 'default'">饼图</el-button>
      <el-button @click="chartMode = '环形图'" :type="chartMode === '环形图' ? 'primary' : 'default'">环形图</el-button>
      <el-button @click="chartMode = '柱状图'" :type="chartMode === '柱状图' ? 'primary' : 'default'">柱状图</el-button>
      <el-button @click="chartMode = '条形图'" :type="chartMode === '条形图' ? 'primary' : 'default'">条形图</el-button>
    </div>
    <div ref="chart" style="height: 400px;"></div>
  </div>
</template>
<script>
import ECharts from 'echarts'
export default {
  props: ['answer', 'index'],
  data () {
    return {
      chartMode: null
    }
  },
  computed: {
    options () {
      return this.answer.options.map(item => {
        return {
          value: item,
          count: this.answer.values.filter(value => value === item).length
        }
      })
    }
  },
  watch: {
    chartMode: {
      handler () {
        if (this.chartMode === '饼图') {
          this.chart.setOption({
            series: [
              {
                type: 'pie',
                data: this.options.map(option => {
                  return {
                    name: option.value,
                    value: option.count
                  }
                })
              }
            ]
          }, true)
        } else if (this.chartMode === '环形图') {
          this.chart.setOption({
            series: [
              {
                type: 'pie',
                radius: ['55%', '70%'],
                data: this.options.map(option => {
                  return {
                    name: option.value,
                    value: option.count
                  }
                })
              }
            ]
          }, true)
        } else if (this.chartMode === '柱状图') {
          this.chart.setOption({
            xAxis: {
              type: 'category',
              data: this.answer.options,
              axisLabel: {
                interval: 0
              }
            },
            yAxis: {
              type: 'value'
            },
            series: [
              {
                type: 'bar',
                data: this.options.map(option => option.count)
              }
            ]
          }, true)
        } else if (this.chartMode === '条形图') {
          this.chart.setOption({
            yAxis: {
              type: 'category',
              data: this.answer.options.concat().reverse()
            },
            xAxis: {
              type: 'value'
            },
            series: [
              {
                type: 'bar',
                data: this.options.map(option => option.count)
              }
            ]
          }, true)
        }
      }
    }
  },
  mounted () {
    this.chart = ECharts.init(this.$refs.chart)
    this.chartMode = '饼图'
  }
}
</script>
