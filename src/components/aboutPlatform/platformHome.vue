<template>
	<div class="main">
		<div class="motto">

			
		</div>
		<div class="loginPage">
			<h1>本人为哈尔滨工业大学(威海校区)学生</h1>
			<h2>写此博客平台仅为学习之用</h2><br>
			<p>前端采用vue框架，后端采用tornado框架</p>
			<p>项目地址：暂未上传</p>
			<p>联系方式：940642506@qq.com</p>
		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return {
				motto:"使用文字交流工具不是解决问题的好办法。 ——Shallow"
			}
		}
	}
</script>

<style scoped>

	.motto{
		width: 600px;
		text-align: center;
		font-size: 15px;
		margin: auto auto;
		color:#B2B0B0;
	}

	.content{
		width: 900px;
		margin:100px auto;
		text-align: center;
	}
	.main{
		background-image: url('../../assets/mobai.jpg');
		background-size: cover;
		background-repeat: no-repeat;
		width: 100%;
  		height: 91%;
  		position: absolute;
	}

	h1{
    color: #ccc;
    text-align: center;

  }

  .loginPage{
        position: absolute;
        top: 50%;
        left: 40%;
        text-align: center;
        margin-top: -150px;
        margin-left: -175px;
        width: 700px;
        min-height: 300px;
        padding: 30px 20px 20px;
        border-radius: 8px;
        box-sizing: border-box;
        background-color:   #2894FF;
        background:rgba(98,135,167,0.5);
        /*filter:alpha(Opacity=80);-moz-opacity:0.5;opacity: 0.5;*/
        /*CSS设置元素不透明度的几种方法，opacity对整个元素和其子元素都具有透明效果，RGBA和HSLA只对该元素有效果，不会影响子元素。*/
   }  
</style>