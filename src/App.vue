<template>
  <div class="main">

    <div class="d1">
      <data-header></data-header>
    </div>
    <div class="d2">
      <!-- <ue  :defaultMsg=defaultMsg :config=config ref="ue" ></ue> -->
      <router-view></router-view>
    </div>

  </div>
</template>

<!--  <div class="breadcrumb">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>{{pathName}}</el-breadcrumb-item>
          </el-breadcrumb>
        </div> -->

<script>
import DataHeader from './components/header/header_top.vue'
// import SideNav from './components/common/SideNav.vue'
import wait from './components/waitDevelop.vue'
export default {
  name: 'app',
  data () {
    return {
      pathName: this.$route.name,
      defaultMsg: '这里是UE测试',
        config: {
          initialFrameWidth: null,
          initialFrameHeight: 350
        }
    }
  },
  components:{
    DataHeader,
    wait
  },
  mounted(){
 

  },
  watch: {
    '$route': function(){
      this.pathName = this.$route.name;

    }
  }
}
</script>

<style>

*{
  margin: 0;
  padding: 0;
}
.main{
  width: 100%;
  height: 100%;
  position: absolute;
  }
.d1{
    width: 100%;
    height: 8%;       
   }
.d2{
 width: 100%;
 height: 91%;
 float: left;
/* background: #EEEEE6;*/
  }

.breadcrumb{
  padding-bottom: 20px;
  border-bottom: 1px solid #ddd;
}
</style>
