<template>
<div class="dialog">
    <div class="loginPage">
        <div style="text-align:center">
        <h1>登录</h1>
        <el-form>
            <el-form-item label="username">
                <el-input type="text" id="user" v-model="formName.user" @blur="inputBlur('user',formName.user)"></el-input>
                <p>{{formName.userError}}</p>
            </el-form-item>
            <el-form-item label="password">
                <el-input type="password" id="password" v-model="formName.password" @blur="inputBlur('password',formName.password)"></el-input>
                <p>{{formName.passwordError}}</p>
            </el-form-item>

            <el-button type="primary" @click="submitForm('formName')" v-bind:disabled="formName.beDisabled">登录</el-button>
            <el-button @click="resetForm">重置</el-button>
        </el-form>
        </div>             
    </div>
</div>
</template>
<script>
    export default {
        name: '',
        data () {
            return {
                formName: {//表单中的参数
                    user: '',
                    userError: '',
                    password: '',
                    passwordError: '',
                    beDisabled: true
                },
                beShow: false//传值给父组件
            }           
        },
        /*props:[
                'fromParent'
        ],*/
        methods: {
            resetForm:function(){
                this.formName.user = '';
                this.formName.userError = '';
                this.formName.password = '';
                this.formName.passwordError = '';
                this.$notify({
                            title: '重置成功',
                            message: "请重新输入账号密码",
                            type: 'success'
                            });
            },
            submitForm:function(formName){

                var user = this.formName.user;
                var password = this.formName.password;
                this.axios({
                    url:this.$store.state.infoserverhost+'/login',
                    method:'post',
                    
                  
                    params:{"username":user,'pwd':password},
                }).then(res=>{
                    if(res.data.status==1){
                        this.$store.commit('setUserName',res.data.username+' ')
                        this.$store.commit('setSessionId',res.data.session_id);
                        window.localStorage.setItem("sessionId",res.data.session_id);
                        this.$notify({
                            title: '登录成功',
                            message: '欢迎来到博客平台',
                            type: 'success'
                            });
                        var status=[
                        {
                            'url':'canclelogin',
                            'info':'注销'

                        }

                    ];
                    this.$store.commit('setStatus',status);
                    this.$router.push({ path:'/'});

                    }else{
                        this.$notify.error({
                        title: '登录失败',
                        message: res.data.errorInfo,
                        });
                    }

                })
        
            },

            inputBlur:function(errorItem,inputContent){
                if (errorItem === 'user') {
                    if (inputContent === '') {
                        this.formName.userError = '用户名不能为空'
                    }else{
                        this.formName.userError = '';
                    }
                }else if(errorItem === 'password') {
                    if (inputContent === '') {
                        this.formName.passwordError = '密码不能为空'
                    }else{
                        this.formName.passwordError = '';
                    }
                }
                if (this.formName.user != '' && this.formName.password != '') {
                    this.formName.beDisabled = false;
                }else{
                    this.formName.beDisabled = true;
                }
            }
        }
    }
                //对于按钮的状态进行修改
</script>
<style scoped>

    .dialog{
        background-image: url('../../assets/mobai.jpg');
        background-size: cover;
        background-repeat: no-repeat;
        width: 100%;
        height: 91%;
        position: absolute;
    }
    .loginPage{
        position: absolute;
        top: 50%;
        left: 50%;
        margin-top: -150px;
        margin-left: -175px;
        width: 350px;
        min-height: 300px;
        padding: 30px 20px 20px;
        border-radius: 8px;
        box-sizing: border-box;
        background-color:   #2894FF;
        background:rgba(98,135,167,0.5);
        /*filter:alpha(Opacity=80);-moz-opacity:0.5;opacity: 0.5;*/
        /*CSS设置元素不透明度的几种方法，opacity对整个元素和其子元素都具有透明效果，RGBA和HSLA只对该元素有效果，不会影响子元素。*/
    }


    .loginPage p{
        color: red;
        text-align: left;
    }
    .el-button{
        text-align: center;
    }
</style>