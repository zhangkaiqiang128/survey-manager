<template>
  <div>
    <div style="margin: 0 auto; width: 1192px;">
      <el-card>
        <el-form label-width="100px">
          <h4>基本信息</h4>
          <el-form-item label="问卷标题">
            <el-input v-model="form.title"></el-input>
          </el-form-item>
          <h4>红包设置</h4>
          <el-form-item label="启动红包">
            <el-switch v-model="form.useRedEnvelope"></el-switch>
          </el-form-item>
          <el-form-item label="红包总额">
            <el-input style="width: 140px" :disabled="!form.useRedEnvelope" v-model="form.redEnvelope.totalAmount"></el-input>
          </el-form-item>
          <el-form-item label="单个红包限额">
            <el-input style="width: 140px" :disabled="!form.useRedEnvelope" v-model="form.redEnvelope.range[0]"></el-input>
            至
            <el-input style="width: 140px" :disabled="!form.useRedEnvelope" v-model="form.redEnvelope.range[1]"></el-input>
          </el-form-item>
          <h4>问题设置</h4>
          <div style="text-align: center">
            <el-button icon="el-icon-plus">添加问题</el-button>
          </div>
        </el-form>
      </el-card>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  data () {
    return {
      form: {
        title: '',
        useRedEnvelope: true,
        redEnvelope: {
          totalAmount: 0,
          range: [0, 0]
        }
      }
    }
  },
  methods: {
    getSurveyList () {
      axios.get('/survey/search?pageNum=1&pageSize=20000').then(res => {
        this.list = res.data.results
      })
    }
  },
  mounted () {
    this.getSurveyList()
  }
}
</script>
