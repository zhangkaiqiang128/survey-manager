<template>
  <div>
    <div>
      <el-card>
        <el-form label-width="100px">
          <h4>基本信息</h4>
          <el-form-item label="问卷标题">
            <el-input v-model="form.title"></el-input>
          </el-form-item>
          <el-form-item label="问卷描述">
            <el-input v-model="form.description"></el-input>
          </el-form-item>
          <el-form-item label="限定陕西省内">
            <el-input v-model="form.limitArea"></el-input>
          </el-form-item>
          <h4>红包设置</h4>
          <el-form-item label="启动红包">
            <el-switch v-model="form.useRedEnvelope"></el-switch>
          </el-form-item>
          <el-form-item label="红包总额">
            <el-input
              style="width: 140px"
              :disabled="!form.useRedEnvelope"
              v-model="form.redEnvelope.totalAmount"
            ></el-input>
          </el-form-item>
          <el-form-item label="单个红包限额">
            <el-input
              style="width: 140px"
              :disabled="!form.useRedEnvelope"
              v-model="form.redEnvelope.range[0]"
            ></el-input>至
            <el-input
              style="width: 140px"
              :disabled="!form.useRedEnvelope"
              v-model="form.redEnvelope.range[1]"
            ></el-input>
          </el-form-item>
          <h4>问题设置</h4>
          <div>
            <div v-for="(item, index) in form.questions" :key="item.key">
              <h4>
                {{index + 1}}. {{item.title}}
                <el-button
                  @click="openEditDialog(item, index)"
                  icon="el-icon-edit"
                  type="primary"
                  circle
                ></el-button>
              </h4>
              <ul style="background-color: #efefef; border-radius: 4px;">
                <li style="line-height: 3;" v-for="option in item.options" :key="option">{{option}}</li>
              </ul>
            </div>
          </div>
          <div style="text-align: right">
            <el-button icon="el-icon-plus" @click="openAddDialog()">添加问题</el-button>
            <el-button type="success" @click="save()">保存</el-button>
          </div>
        </el-form>
      </el-card>
      <el-dialog width="640px" title="编辑问题" :visible.sync="showEditDialog">
        <el-form>
          <h4 style="margin-top: 0;">问题</h4>
          <el-form-item>
            <el-input v-model="currentQuestion.title"></el-input>
          </el-form-item>
          <h4>选项</h4>
          <el-form-item style="margin-bottom: 0;">
            <div
              v-for="(option, index) in currentQuestion.options"
              :key="option.key"
              style="margin-bottom: 14px;"
            >
              <el-input style="width: 240px;" v-model="currentQuestion.options[index]"></el-input>
              <el-button
                type="danger"
                icon="el-icon-delete"
                @click="currentQuestion.options.splice(index, 1)"
              ></el-button>
            </div>
          </el-form-item>
          <el-form-item>
            <el-input style="width: 240px;" v-model="optionBuf"></el-input>
            <el-button
              icon="el-icon-plus"
              @click="currentQuestion.options.push(optionBuf); optionBuf = ''"
            >添加选项</el-button>
          </el-form-item>
        </el-form>
        <div slot="footer" style="text-align: right;">
          <el-button @click="showEditDialog = false;">取消</el-button>
          <el-button @click="saveQuestion()" type="primary">保存</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      optionBuf: "",
      showEditDialog: false,
      editMode: "add",
      currentQuestion: {
        title: "",
        options: []
      },
      currentIndex: 0,
      form: {
        title: "",
        limitArea: true,
        useRedEnvelope: true,
        questions: [],
        redEnvelope: {
          totalAmount: 0,
          range: [0, 0]
        }
      }
    };
  },
  methods: {
    openEditDialog(question, index) {
      this.currentIndex = index;
      this.currentQuestion = JSON.parse(JSON.stringify(question));
      this.editMode = "edit";
      this.showEditDialog = true;
    },
    openAddDialog() {
      this.currentQuestion = {
        title: "",
        options: []
      };
      this.editMode = "add";
      this.showEditDialog = true;
    },
    saveQuestion() {
      if (this.editMode === "add") {
        this.form.questions.push(
          JSON.parse(JSON.stringify(this.currentQuestion))
        );
      } else {
        this.form.questions.splice(
          this.currentIndex,
          1,
          JSON.parse(JSON.stringify(this.currentQuestion))
        );
      }

      this.showEditDialog = false;
    },
    getSurveyList() {
      axios.get("/survey/search?pageNum=1&pageSize=20000").then(res => {
        this.list = res.data.results;
      });
    },
    save() {
      if (this.form.id) {
      } else {
        axios
          .post("/survey/create", this.form)
          .then(() => {
            this.$message.success("问卷创建成功");
            this.$router.push("/survey");
          })
          .catch(() => {
            this.$message.error("问卷创建失败");
          });
      }
    }
  },
  mounted() {
    this.getSurveyList();
  }
};
</script>
