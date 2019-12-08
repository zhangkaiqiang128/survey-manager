<template>
  <div>
    <el-card style="margin: 0 auto; margin-top: 120px; width: 420px;">
      <h2 style="text-align: center;">水保问卷调查系统</h2>
      <el-form>
        <el-form-item label="账号">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input type="password" v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item style="margin-top: 36px;">
          <el-button @click="login()" type="primary" style="width: 100%;" size="small">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      form: {
        username: "",
        password: ""
      }
    };
  },
  methods: {
    login() {
      sessionStorage.setItem("username", this.form.username);
      sessionStorage.setItem("password", this.form.password);

      axios.defaults.auth.username = sessionStorage.getItem("username");
      axios.defaults.auth.password = sessionStorage.getItem("password");

      this.$router.push("/survey");
    }
  }
};
</script>
