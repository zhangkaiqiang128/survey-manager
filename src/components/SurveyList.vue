<template>
  <div>
    <div style="margin: 0 auto; width: 1192px;">
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <h2>问卷列表</h2>
      </div>
      <el-card v-for="item in list" :key="item.id" style="margin-bottom: 24px;">
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <div>
            <h4 style="margin-top: 0;">{{item.title}}</h4>
            <div style="font-size: 12px; color: #666;">
              <span style="margin-right: 48px;">创建时间： {{item.createdTime | formatDate}}</span>
              <span style="margin-right: 48px;">状态： {{item.status | status}}</span>
              <span>回答数： {{item.answerCount}}</span>
            </div>
          </div>
          <div>
            <el-button type="success">查看详情</el-button>
            <el-button type="primary">发布</el-button>
            <el-button type="danger">删除</el-button>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import * as moment from 'moment'
export default {
  data () {
    return {
      list: []
    }
  },
  filters: {
    status (val) {
      if (val === 'published') {
        return '已发布'
      } else {
        return '待发布'
      }
    },
    formatDate (val) {
      return moment(val).format('YYYY-MM-DD HH:mm:ss')
    }
  },
  methods: {
    getSurveyList () {
      axios.get('/survey/search?pageNum=1&pageSize=20000').then(res => {
        this.list = res.data.results.concat(res.data.results, res.data.results)
      })
    }
  },
  mounted () {
    this.getSurveyList()
  }
}
</script>
