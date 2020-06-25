<template>
  <div>
    <el-menu :default-active="this.$route.path"
             mode="horizontal"
             router
             style="width:90%;margin:20px auto">
      <el-menu-item index="/adminindex/evaluate">待评审项目</el-menu-item>
      <el-menu-item index="/adminindex/evaluate/divide">申报材料分组</el-menu-item>
    </el-menu>
    <router-view></router-view>
  </div>
</template>
<script>
import mainshow from './mainshow'
export default {
  components: {
    mainshow
  }
}
</script>
<style scoped>
</style>