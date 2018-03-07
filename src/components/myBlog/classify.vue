<template>
	<div class="main2">
	
	<h1 style="margin-top: 15px">分类管理<span>
	<el-button type="primary" style="float: right;margin-right:30px;height:35px;" @click="cateVisible = true" >增加分类<i class="el-icon-document el-icon--right"></i></el-button></span></h1>

		<el-dialog title="新建分类" :visible.sync="cateVisible">
	<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
    		<el-form-item label="分类名称" prop="classifyname">
     		 <el-input v-model="ruleForm.classifyname"></el-input>
    		</el-form-item>
    		<el-form-item label="所属分区" prop="partname">
      		<el-select v-model="ruleForm.partname" placeholder="请选择该分类所属分区">
        	<el-option 	v-for="part in this.$store.state.part"  :label="part" :value="part"></el-option>
      		</el-select>
    		</el-form-item>
  		</el-form>
		  <div slot="footer" class="dialog-footer">
		  	<el-button type="primary" @click="createCate('ruleForm')">立即创建</el-button>
		    <el-button @click="cateVisible = false">取 消</el-button>
		  </div>
		</el-dialog>

		<div class="ctae-line"></div>
		<el-table
	      :data="showlist"
	      border
	      style="width: 100%">
	      <el-table-column
	        prop="classifyname"
	        label="类名"
	        min-width="240">
	      </el-table-column>
	      <el-table-column
	        prop="part"
	        label="所属分区"
	        min-width="240"
	        >
	      </el-table-column>
	       <el-table-column
	        prop="num"
	        label="文章数量"
	        min-width="140"
	        sortable
	        >
	      </el-table-column>
	      <el-table-column
	        prop="createdate"
	        label="创建时间"
	        min-width="150">
	      </el-table-column>
	      <el-table-column
	        prop="options"
	        label="操作"
	        min-width="150"
	        >
	        <template scope="scope">
<!-- 		        <el-button
		          size="small"
		          type="info"
		          @click="handleEdit(scope.$index, scope.row)">编辑</el-button> -->
		        <el-button
		          size="small"
		          type="danger"
		          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
	      </template>
	      </el-table-column>
	    </el-table>
	    <br>

        <el-pagination
            :current-page.sync="currentpage"
            @current-change="pagechange"
            :page-size="11"
            layout="prev, pager, next, jumper"
            :total="totalsize">
    </el-pagination>
<!-- 	    <el-button type="primary" style="float: right;margin-right:30px" @click="cateVisible = true" >增加分类<i class="el-icon-document el-icon--right"></i></el-button> -->
	</div>
</template>

<script>
export default{
	data(){
	var judgeIsExist = (rule, value, callback) => {
		for(var i=0; i<this.classifyData.length;i++){
			if(this.classifyData[i].classifyname==value){
				callback(new Error('该分类已存在'));
			}
		}
        callback()
      	};

		return{
			cateVisible:false,
			cateName:"",
			currentpage:1,
			totalsize:0,
			classifyData:[

			],
			showlist:[],
			rules: {
          		classifyname: [
            	{ required: true, message: '请输入分类名称', trigger: 'blur' },
            	{ min: 1, max: 10, message: '长度在1 到 10 个字符', trigger: 'blur' },
            	{ validator: judgeIsExist, trigger: 'blur' }
          		],
          		partname:[
            		{ required: true, message: '请选择该分类所属分区', trigger: 'change' }
          		],
          	},

         ruleForm: {
          classifyname: '',
          partname: '',
        		},

		}
		},
		mounted(){
			// this.getCateMes();
			this.getClassifys();
		},
		methods:{
			createCate:function(classify){
				this.$refs[classify].validate((valid) => {
          			if (valid) {
            		this.axios({
					url:this.$store.state.infoserverhost+'/user/addordelclassify',
	                method: 'post',
	                params:{'sessionId':this.$store.state.sessionId,'classifyname':this.ruleForm.classifyname,'operation':'add','belongpart':this.ruleForm.partname}
					}).then((res)=>{
					if(res.data.status==1){
						this.$refs[classify].resetFields();
						this.cateVisible=false;
						this.getClassifys();
						this.$notify({
                            title: '新建分类成功',
                            message: '添加成功',
                            type: 'success'
                            });	

					}else{
					this.$notify.error({
                        title: '新建分类失败',
                        message: res.data.errorInfo,
                        });
					}
				})
          		} else {
            		return false;
          		}
        	});

			},

			getClassifys(){
				this.axios({
					url:this.$store.state.infoserverhost+'/user/getuserclassify',
	                method: 'post',
	                params:{'sessionId':this.$store.state.sessionId}
				}).then((res)=>{
					if(res.data.status==1){
						this.classifyData=res.data.data;
						this.showlist=this.classifyData.slice(0,11);
						this.totalsize=this.classifyData.length;
						this.currentpage=1;
					}else{
					this.$notify.error({
                        title: '获取分类列表失败',
                        message: res.data.errorInfo,
                        });
					}
				})
			},

			pagechange(val){
        		this.showlist=this.classifyData.slice((val-1)*11,val*11);
    		},

			handleEdit:function(index,row){
				let cateID = this.cateData[index].cateID;
				this.$prompt('请输入分类名', '提示', {
		          confirmButtonText: '确定',
		          cancelButtonText: '取消',
		        }).then((obj) => {
		          this.axios({
		          	url: 'http://127.0.0.1:3000/users/change-cate',
	                method: 'post',
	                data: {"cateID":cateID,"newName":obj.value},
	            	}).then(()=>{
	            		this.getCateMes();
	            		this.$message({
			            type: 'success',
			            message: '修改成功'
			          });
	            	})
		        }).catch(() => {
		          this.$message({
		            type: 'info',
		            message: '取消修改'
		          });       
		        });
			},

			handleDelete:function(index,row){
				
				this.$confirm('此操作将删除该分类, 是否继续?', '提示', {
		          confirmButtonText: '确定',
		          cancelButtonText: '取消',
		          type: 'warning'
		        }).then(() => {
		        	this.axios({
					url:this.$store.state.infoserverhost+'/user/addordelclassify',
	                method: 'post',
	                params:{'sessionId':this.$store.state.sessionId,'classifyname':row.classifyname,'operation':'del','belongpart':row.part}
					}).then((res)=>{
					if(res.data.status==1){
						
						this.getClassifys();
						this.$message({
                            message: '删除成功',
                            type: 'success'
                            });	
					}else{
						this.$notify.error({
                        title: '删除失败',
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

		}
	}
</script>

<style scoped>
	.ctae-line{
		height: 10px;
		border-bottom: 1px solid #e6e6e6;
		margin-bottom: 7px;
	}
	.main2{
  	width: 80%;
  	height: 100%;
  	position: absolute;
	}

	h1 {
	font-size: 20px;
	text-align: left;
	margin-left: 20px;
	padding: 0;
	}
	.changeCate{
		font-size: 17px;
		font-weight: 500;
		margin-right: 50px;
	}
	.el-form-item{
		width: 320px;
	}
</style>