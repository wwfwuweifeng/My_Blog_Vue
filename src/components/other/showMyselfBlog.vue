<template>
	<div class="article-container">
		<br>
		<div class="markdown-body"  v-html="htmlcon"></div>
		<div style="height: 200px;"></div>
		<mavon-editor v-show="false" v-model="content" @change="getHTML"></mavon-editor>
	</div>
</template>

<script>
// import marked from 'marked'
	export default{
		data(){
			return{
				id:0,
				content:'',
				htmlcon:'',
				articleurl:'',
			}
		},
		mounted(){
			// this.getUrl();
			this.getData();
			
			// this.content = this.$store.state.myblog;
		},
		methods:{
			getHTML:function(value,render){
				this.htmlcon = render;
			},
			changecontent(){
				 return marked(this.content, { sanitize: true })
			},
			getData:function(){
				this.articleurl=this.$route.params.articlecode;
				this.axios({
					url:this.$store.state.infoserverhost+'/article/getarticle',
					method:'post',
					params:{'sessionId':this.$store.state.sessionId,"articleurl":this.articleurl}
				}).then(res=>{
				
					if(res.data.status==1){
					this.content = res.data.article['body']
					// this.htmlcon=this.changecontent();
					}else{
						this.$notify.error({
                        title: '获取文章失败',
                        message: res.data.errorInfo,
                        });
					}
				})
			}
		}
	}
</script>

<style scoped>
	.article-container{
/*		margin-top: 20px;
		width: 100%;
		text-align: center;
		margin-left: 20px;*/
		width: 1000px;
		margin: auto auto;
		/*margin: auto auto;*/
	}
</style>