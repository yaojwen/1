<template>
  <div class="home">
    <el-container>
      <is-menu></is-menu>

      <el-main style="padding: 0; ">
        <el-header style="height: 95%;">
            
            <router-view />

        </el-header>

        <el-footer style="height:30px;color:#ccc">&copy;Copyright 2018 7+超市管理系统</el-footer>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import Menu from "../components/Menu.vue";

export default {
  data() {
    return {
     
    };
  },
  components: {
    "is-menu": Menu
  },
  
};
</script>

<style lang='less' >
.home{user-select: none;}
.home {height: 100%;background: linear-gradient(to right, #355c7d,#6c5b7b,#c06c84);}
.home .el-container {height: 100%;}
.home .el-header {height: 100%;padding: 0 20px;display: flex;justify-content: center;align-items: center;}
.home .el-footer {font-size: 14px;line-height: 20px;text-align: center;background-color: transparent;color: #fff;}
</style>