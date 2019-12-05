<template>
  <el-container id="app">
    <el-header style="padding: 0;">
      <el-menu mode="horizontal" router :default-active="$route.path">
        <el-menu-item>水保问卷调查系统</el-menu-item>
        <el-menu-item index="/survey">问卷列表</el-menu-item>
        <el-menu-item index="/survey/create">创建问卷</el-menu-item>
        <el-menu-item index="/system/config">系统配置</el-menu-item>
      </el-menu>
    </el-header>
    <el-main>
      <router-view/>
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
  html, body {
    padding: 0;
    margin: 0;
  }
</style>
