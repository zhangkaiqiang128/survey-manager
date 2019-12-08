<template>
  <div>
    <div>
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <h2>问卷列表</h2>
      </div>
      <el-card v-for="item in list" :key="item.id" style="margin-bottom: 24px;">
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <div>
            <h4 style="margin-top: 0;">{{item.title}}</h4>
            <div style="font-size: 12px; color: #666;">
              <span style="margin-right: 48px;">状态： {{item.status | status}}</span>
              <span style="margin-right: 48px;">回答数： {{item.answerCount}}</span>
              <span
                style="margin-right: 48px;"
                v-if="item.publishedTime"
              >发布时间： {{item.publishedTime | formatDate}}</span>
              <span style="margin-right: 48px;" v-if="!item.publishedTime">发布时间： -</span>
            </div>
          </div>
          <div>
            <el-button type="primary" @click="downloadXlsx(item)">下载结果</el-button>
            <el-button type="success" @click="$router.push(`/survey/${item.id}/answers`)">查看详情</el-button>
            <el-button
              v-if="item.status !== 'published'"
              type="primary"
              @click="publish(item.id)"
            >发布</el-button>
            <el-button type="danger">删除</el-button>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import * as moment from "moment";
export default {
  data() {
    return {
      list: []
    };
  },
  filters: {
    status(val) {
      if (val === "published") {
        return "已发布";
      } else {
        return "待发布";
      }
    },
    formatDate(val) {
      return moment(val).format("YYYY-MM-DD HH:mm:ss");
    }
  },
  methods: {
    downloadXlsx(item) {
      window.open(`/answer/download?questionId=${item.id}`);
    },
    publish(id) {
      axios
        .get(`/survey/publish?id=${id}`)
        .then(res => {
          this.$message.success("发布成功");
          this.getSurveyList();
        })
        .catch(() => {
          this.$message.error("发布失败");
        });
    },
    getSurveyList() {
      axios.get("/survey/search?pageNum=1&pageSize=20000").then(res => {
        this.list = res.data.results;
      });
    }
  },
  mounted() {
    this.getSurveyList();
  }
};
</script>
