<template>
<div class="header-wraper">
    <el-menu theme="dark" default-active="1" class="el-menu-demo" mode="horizontal" @select="handleSelect">

        <li class="title">
            <i class="el-icon-menu"></i>
            <span>WWF的个人博客</span>
        </li>
        <div class="test">
        
        <el-menu-item index="/">发现文章</el-menu-item>
        <el-menu-item index="/myblog">我的博客</el-menu-item>
        <el-menu-item index="/forum">论坛区</el-menu-item>
        <el-menu-item index="/aboutplatform">关于此平台</el-menu-item>
        <el-menu-item index="5">
        <el-input
            placeholder="请输入文章/作者的关键词"
            icon="search"
            v-model="search_message"
            :on-icon-click="iconSearch">
        </el-input>
        </el-menu-item>
        </div>
        <li class="user">
            <el-dropdown trigger="click" @command="selectstate">
                <span class="el-dropdown-link">
                {{this.$store.state.username}}<i class="el-icon-caret-bottom el-icon--right"></i>
              </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item v-for="item in this.$store.state.status" :command="item.url">{{item.info}}</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </li>
    </el-menu>
</div>
</template>


<script>
export default {
    data() {
    return {
       status:[
        {
            url:'/login',
            info:'登录'
        },
        {
            url:'/register',
            info:'注册'
        }

       ],
        search_message:''
        }
    },
    mounted(){
        this.judgeIsLogin();
    },
    methods: {
        handleSelect(key, keyPath) {
            if(key=="5"){ 

            }else{

            this.$router.push({ path:key });
        }
        },
        selectstate(command){

            this.$router.push({ path:command});
        },
        iconSearch(vl){
            this.$store.state.searchStr=this.search_message;
            this.$router.push({ path:'/jmp'});
            //console.log(this.search_message)
        },

        judgeIsLogin(){
            this.axios({
                url:this.$store.state.infoserverhost+'/user/getusername',
                method:'post',
                params:{'sessionId':this.$store.state.sessionId}
            }).then(res=>{
                this.$store.commit('setPart',res.data.part);
                this.$store.commit('setRole',res.data.readrole);
                if(res.data.status==1){
                    this.$store.commit('setUserName',res.data.username+' ');
                    this.status=[
                        {
                            'url':'canclelogin',
                            'info':'注销'

                        }

                    ];
                    this.$store.commit('setStatus',this.status);
                    
                }


            })
      
        }
    }
}
</script>

<style scoped>
.header-wraper li {
    float: left;
    margin-right: 20px;
    margin-top: 5px;
}

.title {
    padding: 1em .2em;
}

.title span {
    font-size: 1.4em;
    margin-left: 5px;
}
.title i{
    margin-left: 30px;
}
.el-select-dropdown__list{
  max-height: 187px !important;
}
.option {
    padding-top: 10px;
}

.user .el-dropdown {
    position: absolute;
    right: 20px;
    padding-top: 20px;
    color: #fff !important;
}
.test .el-menu-item{
    left: 150px;
    padding-top: 5px;
    font-weight:bold;
    font-size: 1.0em;
}
.el-input{
    width: 200px;
}
.el-menu{
    background-color: #475669;

}

</style>