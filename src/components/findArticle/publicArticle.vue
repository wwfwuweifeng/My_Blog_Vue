<template>
	<div class="main">
		<!-- <wait></wait> -->
		<div class="left">
    <el-menu class="el-menu-vertical-demo" @select="handleselect"  @close="handleClose" 
      >
      <!-- @open="handleOpen" -->
    <el-submenu index="1">
    <template slot="title">文章分类</template>
    <el-menu-item-group >
      <el-menu-item v-for="item in this.$store.state.part" :index="item">{{item}}</el-menu-item>
    </el-menu-item-group>
    </el-submenu>
    <el-submenu index="2">
    <template slot="title">热门文章</template>
    <el-menu-item-group>
        <el-menu-item v-for="article in hotarticles" :index="article.url">{{article.name}}</el-menu-item>
    </el-menu-item-group>
    </el-submenu>
    <el-submenu index="3">
    <template slot="title">帮助中心</template>
    <el-menu-item-group>
        <el-menu-item index="/article/language">平台功能说明</el-menu-item>
        <el-menu-item index="/article/system">我该如何获取源码</el-menu-item>
    </el-menu-item-group>
    </el-submenu>
    <el-menu-item index="/index/feedback">意见反馈</el-menu-item>
  </el-menu>
   </el-col>
		</div>
		<div class="center">
		<router-view :partname="partname"></router-view>
    <!-- <test></test> -->
		</div>
	</div>
</template>
<script>
import wait from '../waitDevelop.vue'
import test from '../test.vue'
export default{
	data(){
		return {
      partname:'全部文章',
      hotarticles:[],

		}
	},
	components:{
    	wait,
    	test
  	},
	methods:{
    handleselect(key,keyPath){
      if(keyPath[0]=='1'){
        this.partname=key;
      }else{
        this.$router.push({ path:key});
      }
    },
    handleClose(key, keyPath) {
        if(key==1){
          this.partname='全部文章';
        }
      },
      handleOpen(key, keyPath) {
          if (key==2) {
          this.getHotList();
        }
      },
    getHotList(){
      this.axios({
        url:this.$store.state.infoserverhost+'/article/gethotarticlelist',
        method:'get',
      }).then(res=>{
        if(res.data.status==1){
          this.hotarticles=res.data.articles;
        }else{
          this.$notify.error({
              title: '获取热门文章列表失败',
              message: res.data.errorInfo,
              });
        }
      })
    }
	},
	mounted(){
    this.part=this.$store.state.part;
    this.getHotList();
    // alert(this.part);
	}
}

</script>
<style scoped>
*{
  margin: 0;
  padding: 0;
	}
.main{
  width: 100%;
  height: 91%;
  position: absolute;
  }
.left {
  width: 20%;
  height: 100%;
  float: left;
  background-color: #EEEEE6;
  }
  .el-menu{
    background: #EEEEE6;
    /*text-align: center;*/
  }
/*.kind{
    width: 100%;
    height: 40%;
    float: left;
    border-bottom:1px solid #58B7FF;
    text-align: center;
  }*/

/*  .rank{
    width: 100%;
    height: 60%;
    float: left;

  }*/


  .center{
  width: 80%;
  height: 100%;
  float: left;
  text-align: center;
  /*background-color: #E6E6FA;*/
  }	
h3{
  margin-top: 20px;
  }

h4{
  margin-left: 5px;
  margin-top: 20px;
  font-size: 15px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
  

span{
  margin-top: 5px;
  margin-right: 10px;
  font-size:15px
}
a.color1:link{color: #000000 ; text-decoration:none;} /*常规时候的样式*/
a.color1:visited{color: #000000; text-decoration:none;} /*访问过后的样式*/
a.color1:hover {color: #0066CC; text-decoration:underline;} /*鼠标指上去的样式*/
</style>