<template>
	<div class="main2">
		<h1 style="margin-top:5px">文章管理</h1>
		<div class="line"></div>
		<el-table
	      :data="showlist"
	        border
    		style="width: 100%"
	      >
	      <el-table-column
	        prop="name"
	        label="文章名称"
	        min-width="180">
	      </el-table-column>
	      
	      <el-table-column
	        prop="time"
	        label="创建日期"
	        width="170">
	      </el-table-column>
	      <el-table-column
	        prop="part"
	        label="文章所属区"
	        min-width="150">
	      </el-table-column>
	      <el-table-column
	        prop="classify"
	        label="文章所属类"
	        min-width="150">
	      </el-table-column>
	      <el-table-column
	        prop="readrole"
	        label="阅读权限"
	        width="90">
	      </el-table-column>
	       <el-table-column
	        prop="state"
	        label="编辑状态"
	        width="80">
	      </el-table-column>
		  <el-table-column 
		  	label="操作"
		  	width="200">
	        <template scope="scope">
	        	<el-button type="success" size="small" 
	        	@click="handleSee(scope.$index, scope.row)">查看</el-button>
	          <el-button
	            size="small"
	            type="info"
	            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
	          <el-button
	            size="small"
	            type="danger"
	            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
	        </template>
	      </el-table-column>
	    </el-table>
	   
        <el-pagination
        	style="margin-top:7px"
            :current-page.sync="currentpage"
            @current-change="pagechange"
            :page-size="11"
            layout="prev, pager, next, jumper"
            :total="totalsize">
    </el-pagination>
	</div>
</template>
	
<script>
	export default{
		data(){
			return{
				articles:[],
				totalsize:0,
				currentpage:1,
				showlist:[],

			}
		},
		mounted(){
			this.getArticles();
		},
		methods:{
			getArticles:function(){
				this.axios({
					url:this.$store.state.infoserverhost+'/article/getarticlelist',
					method: 'post',
					params:{'sessionId':this.$store.state.sessionId}
				}).then((res)=> {
					if(res.data.status==1){
						this.articles=res.data.articles;
						this.showlist=this.articles.slice(0,11);
						this.totalsize=this.articles.length;
					}else{
					this.$notify.error({
                        title: '获取文章列表失败',
                        message: res.data.errorInfo,
                        });
					}
				})
			},
			pagechange(val){
        		this.showlist=this.articles.slice((val-1)*11,val*11);
    		},
    		handleSee(index,row){
    			this.$router.push({ path:'/showmyselfblog/'+row.url});
    		},
			handleDelete:function(index,row){
				this.$confirm('此操作将删除该文章, 是否继续?', '提示', {
		          confirmButtonText: '确定',
		          cancelButtonText: '取消',
		          type: 'warning'
		        }).then(() => {
		        	this.axios({
						url: this.$store.state.infoserverhost+'/article/delarticle',
		                method: 'post',
		                params: {'sessionId':this.$store.state.sessionId,"articleurl":row.url},
					}).then((res)=>{
						if(res.data.status==1){
						this.getArticles();
						this.$message({
				            type: 'success',
				            message: '删除成功!'
				          });
					}else{
						this.$notify.error({
                        title: '获取文章列表失败',
                        message: res.data.errorInfo,
                        });
					}
					})
		        }).catch(() => {
		          this.$message({
		            type: 'info',
		            message: '已取消删除'
		          });          
		        });
			},
			handleEdit(index,row){
				this.$store.commit('setArticleUrl',row.url);
				this.$router.push({path:'/myblog/continue-editor'});
			}
		}
	}
</script>

<style scoped>
.main2{
  width: 80%;
  height: 100%;
  position: absolute;
}
h1 {
	font-size: 20px;
	margin: 0;
	padding: 0;
}
.line{
	height: 5px;
	border-bottom: 1px solid #e6e6e6;
	margin-bottom: 7px;
	}

	
</style>