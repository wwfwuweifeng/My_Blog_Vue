<template>
<div class="main">
  <div class="left">
    <el-menu default-active="/testManagement" class="el-menu-vertical-demo" router>
    <el-submenu index="1">
      <template slot="title">系统管理</template>
      <el-menu-item-group>
        <template slot="title">分组一</template>
        <el-menu-item index="/index/testManagement">测试管理</el-menu-item>
        <el-menu-item index="/index/userGroup">用户分群管理</el-menu-item>
      </el-menu-item-group>
      <el-menu-item-group title="分组2">
        <el-menu-item index="/index/userList">用户管理</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    <el-menu-item index="/index/help">帮助中心</el-menu-item>
    <el-menu-item index="/index/feedback">意见反馈</el-menu-item>
  </el-menu>
   </el-col>
  </div>
</div>
</template>
<script>
import nothing from '../HelloWorld.vue'
  export default{
    data () {
    return {
      pathName: this.$route.name,
    }
  },
  components:{
    nothing
  },
  }
</script>
<style scoped >
.main{
  width: 100%;
  height: 90%;
  position: absolute;
  }
.left {
  width: 20%;
  height: 90%;
  float: left;
  }

  .el-menu{
    background: #EEEEE6;
  }

.center{
  width: 80%;
  height: 90%;
  float: left;
  text-align: center;
  background-color: #E6E6FA;
  }
  
</style>