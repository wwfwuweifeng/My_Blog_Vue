<template>
	<div class="main">
		<h1>此功能正在开发中</h1>
	</div>
</template>
<script>
import wait from '../waitDevelop.vue'
export default{
	data(){
		return {

		}
	},
	components:{
    	wait
  	},
	methods:{

	},
	mounted(){

	}
}

</script>
<style scoped>
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
    margin-top: 20%;
  }

	
</style>