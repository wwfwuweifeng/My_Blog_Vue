<template>
	<div id="main">
		<h2 style="margin-top:4px;text-align:left;margin-left:10px;font-size: 20px">文章编辑</h2>
    	<mavon-editor class="set" v-model="value" @change="getHTML"></mavon-editor>

    	<div class="img-upload">
		    <form id='myform'>
          	<input class="input-img" type='file' name='myImg' id='myImg'/>
          	<el-button class="button-img" type="primary" icon="search">搜索图片</el-button>   
          	<el-button type="primary" @click="sendImg">上传<i class="el-icon-upload el-icon--right"></i></el-button>
      		</form>  
			<el-button class="sub-article" type="primary" @click="dialogFormVisible = true">发表<i class="el-icon-upload2 el-icon--right"></i></el-button>
			<el-button class="sub-article" type="primary" @click="dialogSaveNotFinish = true">存为草稿<i class=" el-icon--right"></i></el-button>


			<el-dialog title="文章信息" :visible.sync="dialogFormVisible">
				<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
    			<el-form-item label="文章名称" prop="articlename" class="diysize">
     		 	<el-input v-model="ruleForm.articlename"></el-input>
    			</el-form-item>
    			<el-form-item label="文章分类" prop="classifyname" class="diysize">
    			<el-cascader
    				expand-trigger="hover"
    				:options="classify"
    				v-model="ruleForm.classifyname"
    				placeholder="请选择文章所属分类"
    				>
  				</el-cascader>
<!--       			<el-select v-model="ruleForm.classifyname" placeholder="请选择文章所属分类">
        		<el-option 	v-for="part in this.$store.state.part"  :label="part" :value="part"></el-option>
      			</el-select> -->
    			</el-form-item>
    			<el-form-item label="阅读权限" prop="role" class='diysize'>
    				<el-radio-group v-model="ruleForm.role">
    				<el-radio v-for="role in readrole" :label="role"></el-radio>
    				</el-radio-group>
  				</el-form-item>
			    <el-form-item label="文章简介" prop="articleintroduce">
			    <el-input
				    type="textarea"
				    :autosize="{ minRows: 3, maxRows: 4}"
				    placeholder="请输入内容"
				    v-model="ruleForm.articleintroduce">
				</el-input>
				</el-form-item>
				</el-form>
			    <div slot="footer" class="dialog-footer">
			    	<el-button type="primary" @click="subArticle('ruleForm')">立即发表</el-button>
			        <el-button @click="dialogFormVisible = false">取 消</el-button>
			  
			    </div>
			</el-dialog>

			<el-dialog title="草稿保存" :visible.sync="dialogSaveNotFinish">
  				<el-form :model="form" :rules="rules2" ref="form"  class="demo-ruleForm">
<!--     			<el-form-item label="文章名称" prop="articlename" :label-width="formLabelWidth">
      			<el-input v-model="form.articlename_2" auto-complete="off"></el-input>
    			</el-form-item> -->
    			<el-form-item label="文章名称" prop="articlename_2" >
     		 	<el-input v-model="form.articlename_2"></el-input>
    			</el-form-item>
  				</el-form>
  				<div slot="footer" class="dialog-footer">
    			<el-button @click="dialogSaveNotFinish= false">取 消</el-button>
    			<el-button type="primary" @click="saveArticle('form')">保存</el-button>
  				</div>
			</el-dialog>


		</div>
	</div>
</template>

<script>

	export default{

		data(){
			var judgeIsExist = (rule, value, callback) => {
				for(var i=0; i<this.articlelist.length;i++){
					if(this.articlelist[i]==value && value!=this.oldname){
						callback(new Error('您的文章列表中已有该文章'));
					}
				}
        			callback()
      			};

			return {
				isleave:1,	//1表示未保存要离开，2表示经过提示进行保存，3表示自然保存
				value:'# hello',
				oldname:'',
				url:'',
				content:'',
				towhere:'',
				dialogFormVisible: false,
				dialogSaveNotFinish:false,
				articlelist:[],
				readrole:[],
				classify:[],
				rules: {
          		articlename: [
            		{ required: true, message: '请输入文章名称', trigger: 'blur' },
            		{ min: 1, max: 20, message: '文章名称长度在1到20个字符', trigger: 'blur' },
            		{ validator: judgeIsExist, trigger: 'blur' }
            		
          		],
          		classifyname:[
            		{ required: true, message: '请选择文章所属分类'}
          		],
          		articleintroduce:[
          			{ required: true, message: '请输入文章名称', trigger: 'blur' },
     
          		],
          		role:[
          			{ required: true, message: '请设置该文章的阅读权限', trigger: 'change' }
          		]
          	},
          	rules2:{
          		articlename_2: [
            		{ required: true, message: '请输入文章名称', trigger: 'blur' },
            		{ min: 1, max: 20, message: '文章名称长度在1到20个字符', trigger: 'blur' },
            		{ validator: judgeIsExist, trigger: 'blur' }
            		
          		]
          	},

         	ruleForm: {
          	classifyname:[],
          	articlename: '',
          	articleintroduce:'',
          	role:''
        		},

        	form:{
        		articlename_2:''
        	}
			}
		},
		computed: {

		},
		mounted(){
			this.getBasicInfo();
			this.getContinueArticle();
		},

		methods: {
			
			getHTML:function(value,render){
				this.content = render;
			},

		    sendImg:function(){
		    	var that =this;
          		var myimg=document.getElementById('myImg');
          		if (myimg.files.length==0){
          			that.$message('请先选择图片');
          		}else {
          			
          		var img=myimg.files[0];
          		var myData=new FormData();
          		myData.append('file',img); 
          		myData.append('user','nihao');
          		this.axios({
                  url: this.$store.state.fileserverhost+'/uploadImg',
                  method: 'post',
                  data: myData,
                  headers: { 'Content-Type': 'multipart/form-data' },
              }).then((res) => {
     
                  myimg.outerHTML=myimg.outerHTML;//上传成功后，清空Input选中的文件
      
                  // console.log(res.data);
                  // window.localStorage.setItem("userid",res.data);  //设置b为"isaac"
                  // this.$store.commit('setcount',res.data);
                  if(res.data.status==1){
                  that.value += '![img]('+res.data.data.imgUrl+')';
                  that.$message('上传图片成功');
              		}else{
              		this.$notify.error({
                        title: '上传失败',
                        message: res.data.errorInfo,
                        });	
              		}
              })
          	}
		    },
		    getBasicInfo(){
		    	this.axios({
                url:this.$store.state.infoserverhost+'/user/getuserbasicinfo',
                method:'post',
                params:{'sessionId':this.$store.state.sessionId}
            	}).then(res=>{
                if(res.data.status==1){
                   this.classify=res.data.classify;
                   this.articlelist=res.data.articles;
                   this.readrole=res.data.readrole;
                }else{
                	this.$notify.error({
                        title: '获取基本信息失败',
                        message: res.data.errorInfo,
                        });
                }

            })

		    },
		    subArticle:function(article){
		   		this.$refs[article].validate((valid) => {
          			if (valid) {
            		this.axios({
						url:this.$store.state.infoserverhost+'/article/addoreditorarticle',
	              		method: 'post',
	              		params:{'sessionId':this.$store.state.sessionId,'classify':this.ruleForm.classifyname[1],'part':this.ruleForm.classifyname[0],'body':this.value,'state':1,'readrole':this.ruleForm.role,'name':this.ruleForm.articlename,
	              		'introduce':this.ruleForm.articleintroduce,'articleurl':this.url}
					}).then((res)=>{

					if(res.data.status==1){
						
						this.$refs[article].resetFields();
						this.dialogFormVisible=false;
						this.$notify({
                            title: '发表成功',
                            message: '文章发表成功',
                            type: 'success'
                            });	
						this.value='# hello';
						this.$router.push({ path:'/showmyselfblog/'+this.url});
					}else{
					this.$notify.error({
                        title: '发表失败',
                        message: res.data.errorInfo,
                        });
					}
				})
          		} else {
            		return false;
          		}
        	});
		    	
	    		// this.dialogFormVisible = false;
	    		// this.$message('文章编辑成功');
	    		// this.$router.push({path:'article'});
		    },

		    saveArticle(article){

		    	this.$refs[article].validate((valid) => {
          			if (valid) {
            		this.axios({
						url:this.$store.state.infoserverhost+'/article/savenotfinisharticle',
	              		method: 'post',
	              		params:{'sessionId':this.$store.state.sessionId,'body':this.value,'state':0,'name':this.form.articlename_2,'articleurl':this.url}
					}).then((res)=>{

					if(res.data.status==1){
						
						this.$refs[article].resetFields();
						this.dialogSaveNotFinish=false;
						this.$notify({
                            title: '保存成功',
                            // message: '文章发表成功',
                            type: 'success'
                            });	
						if(this.isleave==2){
						this.value='# hello'
						
						this.$router.push({ path:this.towhere});
						}else{
						this.value='# hello';
						this.$router.push({ path:'/showmyselfblog/'+this.url});
					}

					}else{
					this.$notify.error({
                        title: '保存失败',
                        message: res.data.errorInfo,
                        });
					}
				})
          		} else {
            		return false;
          		}
        	});

		   

		},

		getContinueArticle(){
			this.url=this.$store.state.articleurl;
			if (this.url=='') {
				this.$notify.error({
                        title: '获取文章失败',
                        message: '请先选择所要编辑的文章',
                        });
			}else{

				this.axios({
					url:this.$store.state.infoserverhost+'/article/getarticle',
					method:'post',
					params:{'sessionId':this.$store.state.sessionId,"articleurl":this.url}
				}).then(res=>{
					if(res.data.status==1){
					this.value = res.data.article['body'];
					this.form.articlename_2=res.data.article['name'];
					this.oldname=res.data.article['name'];
					this.ruleForm={
          				classifyname:[res.data.article['part'],res.data.article['classify']],
          				articlename:res.data.article['name'],
          				articleintroduce:res.data.article['introduce'],
          				role:res.data.article['readrole']
        				};
					}else{
						this.$notify.error({
                        title: '获取文章失败',
                        message: res.data.errorInfo,
                        });
					}
				})

			}
		},
		},
		beforeRouteLeave (to, from, next) {
    	// 导航离开该组件的对应路由时调用
    	// 可以访问组件实例 `this`
    	
    	if(this.value!='# hello'){
    		if(this.isleave!=3){
    			this.$confirm('您尚有未保存内容，离开将丢失修改的内容，是否确定离开？', '提示', {
		          confirmButtonText: '保存并离开',
		          cancelButtonText: '直接离开',
		          type: 'warning'
		        }).then(() => {
		        	this.dialogSaveNotFinish=true;
					this.isleave=2;
					this.towhere=to.path;
					}
		        ).catch(() => {
		          this.$message({
		            type: 'info',
		            message: '已取消保存'
		          }); 
		          this.$store.commit('setArticleUrl','');
		          next(true)         
		        });

    		}else{
    			this.$store.commit('setArticleUrl','');
    			next(true)
    		}
    	}else{
    		this.$store.commit('setArticleUrl','');
    		next(true)
    	}
    	
    	

  		}
	
	}
</script>

<style scoped>
	.main{
  	width: 100%;
  	height: 91%;
  	position: absolute;
  	}
	.set{
		height:500px;
		margin-top: 10px;
	}

	.img-upload{
		margin-top: 10px;
		box-sizing: border-box;
		width: 100%;
		height: 50px;
		background-color: #EEF1F6;
		border-radius: 6px;
		padding-top: 10px;
		padding-left: 10px;
	}
	#myform{
		display: inline-block;
	}

	.button-img{
		
	}

	.input-img{
		opacity: 0;
		width: 105px;
		position: absolute;
		height: 50px;
		cursor: pointer;
	}
	.sub-article{
		float: right;
		margin-right: 20px;
	}
	.diysize.el-form-item{
		width: 320px;
	}
</style>