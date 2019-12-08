<template>
  <el-container id="app">
    <el-header
      style="background-color: #409eff; color: white; display: flex; justify-content: space-between; align-items: center;"
    >
      <h4 style="margin: 0;">水保问卷调查系统</h4>
      <div>
        <el-button @click="logout()" style="color: white;" size="large" type="text">注销</el-button>
      </div>
    </el-header>
    <el-container>
      <el-aside style="width: 240px">
        <el-menu
          background-color="#545c64"
          text-color="#fff"
          style="height: 100%;"
          router
          :default-active="$route.path"
        >
          <el-menu-item index="/survey">问卷列表</el-menu-item>
          <el-menu-item index="/survey/create">创建问卷</el-menu-item>
        </el-menu>
      </el-aside>
      <el-main style="overflow: auto;">
        <router-view style="height: 100%; overflow: auto;" />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: "App",
  methods: {
    logout() {
      sessionStorage.removeItem("username");
      sessionStorage.removeItem("password");

      this.$router.push("/login");
    }
  },
  mounted() {
    if (!sessionStorage.getItem("username")) {
      this.$router.push("/login");
    }
  }
};
</script>

<style>
html,
body,
#app {
  padding: 0;
  margin: 0;
  height: 100%;
}
</style>
