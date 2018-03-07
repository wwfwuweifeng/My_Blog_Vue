<template>
	<div class="main">
		<!-- <wait></wait> -->
		<!-- <test></test> -->
	<div class="left">
	<el-menu class="el-menu-vertical-demo" router>
    <el-menu-item index="/myblog/article-manager">文章管理</el-menu-item>
    <el-menu-item index="/myblog/article-classify">文章分类</el-menu-item>
    <el-menu-item index="/myblog/editorarticle">新建文章</el-menu-item>
    <el-menu-item index="/myblog/wait-message">未读消息</el-menu-item>
    <el-menu-item index="/myblog/myself-setting">个人设置</el-menu-item>
  </el-menu>
   </el-col>

		</div>
		<div class="center">
			<router-view></router-view>
		</div>
	</div>
</template>
<script>
import wait from '../waitDevelop.vue'
import test from '../test.vue'
import show from '../show.vue'
export default{
	data(){
		return {

		}
	},
	components:{
    	wait,
    	test,
    	show
  	},
	methods:{

      judgeIsLogin(){
            this.axios({
                url:this.$store.state.infoserverhost+'/user/getusername',
                method:'post',
                params:{'sessionId':this.$store.state.sessionId}
            }).then(res=>{
                this.$store.commit('setPart',res.data.part);
                this.$store.commit('setRole',res.data.readrole);
                if(res.data.status==1){
                    this.$store.commit('setUserName',res.data.username+' ')
                }else{
                  this.$notify.error({
                        title: '请先登录',
                        // message: res.data.errorInfo,
                        });
                  this.$router.push({ path:'/login'});
                }


            })
      
        }
	},
	mounted(){
    this.judgeIsLogin();
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
  text-align: center;
  }	
  .center{
  width: 80%;
  height: 100%;
  float: left;
  text-align: center;
  /*background-color: #E6E6FA;*/
  }	

  .el-menu{
  	margin-top: 30px;
    background: #EEEEE6;
  }
</style>