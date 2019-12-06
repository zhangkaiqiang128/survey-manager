<template>
  <div>
    <el-tabs v-model="mode" style="max-width: 960px; margin: 0 auto;" stretch type="border-card">
      <el-tab-pane label="默认报告" name="默认报告">
        <div v-if="mode === '默认报告'">
          <answer-detail v-for="(q, index) in answers" :answer="q" :key="q.key" :index="index"></answer-detail>
        </div>
      </el-tab-pane>
      <el-tab-pane label="分类统计" name="分类统计">
        <el-form>
          <el-form-item v-for="(filter, index) in paramFilters" :key="filter.key">
            <el-select style="width: 40%" v-model="filter.title">
              <el-option v-for="title in answers.map(item => item.title)" :key="title.key" :label="title" :value="title"></el-option>
            </el-select>
            <el-select style="width: 40%" v-model="filter.value">
              <el-option v-for="option in answers.filter(item => filter.title === item.title).length ? answers.filter(item => filter.title === item.title)[0].options : []" :key="option.key" :label="option" :value="option"></el-option>
            </el-select>
            <el-button @click="paramFilters.splice(index, 1)" type="danger" icon="el-icon-delete"></el-button>
          </el-form-item>
          <el-form-item>
            <el-button icon="el-icon-plus" style="width: 100%;" @click="paramFilters.push({title: null, value: null})">增加条件</el-button>
          </el-form-item>
        </el-form>
        <div v-if="mode === '分类统计'">
          <answer-detail v-for="(q, index) in filterResults" :answer="q" :key="q.key" :index="index"></answer-detail>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import AnswerDetail from '../commons/AnswerDetail'
import axios from 'axios'
export default {
  components: {
    AnswerDetail
  },
  computed: {
    filterResults () {
      const list = this.rawAnswers.filter(item => {
        return !!this.paramFilters.filter(filter => {
          return item.answers.filter(answer => {
            return answer.title === filter.title && filter.value === answer.value
          }).length
        }).length
      })

      if (list.length) {
        const report = list[0].answers.map(item => {
          return {
            title: item.title,
            options: item.options,
            values: []
          }
        })

        list.forEach(item => {
          item.answers.forEach((answer, index) => {
            report[index].values.push(answer.value)
          })
        })

        return report
      } else {
        return []
      }
    }
  },
  data () {
    return {
      mode: '默认报告',
      answers: [],
      paramFilters: [],
      rawAnswers: []
    }
  },
  mounted () {
    axios.get(`/answer/getAnswersByQuestionId?questionId=${this.$route.params.id}`).then(res => {
      const list = res.data

      this.rawAnswers = res.data

      if (list.length) {
        const report = list[0].answers.map(item => {
          return {
            title: item.title,
            options: item.options,
            values: []
          }
        })

        list.forEach(item => {
          item.answers.forEach((answer, index) => {
            report[index].values.push(answer.value)
          })
        })

        this.answers = report
      }
    })
  }
}
</script>
