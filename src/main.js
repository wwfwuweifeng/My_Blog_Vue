// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-default/index.css';
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import axios from 'axios'
import Vuex from 'vuex'


Vue.use(Vuex)
Vue.use(mavonEditor);
Vue.use(ElementUI);
Vue.prototype.axios = axios; 
Vue.config.productionTip = false

const store = new Vuex.Store({
  state: {

    sessionId:window.localStorage.getItem("sessionId"),
    infoserverhost:'http://127.0.0.1:5001',
    fileserverhost:'http://127.0.0.1:5000',
    searchStr:'',
    username:'登录/注册',
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
    part:[],
    readrole:'',
    articleurl:'',

  },
  actions: {

  },
  mutations:{
      setSessionId(state,sessionid){
        state.sessionId=sessionid;
      },
      setUserName(state,name){
        state.username=name;
      },
      setPart(state,part){
        state.part=part;
      },
      setRole(state,role){
        state.readrole=role;
      },
      setArticleUrl(state,url){
        state.articleurl=url;
      },
      setStatus(state,status){
        state.status=status;
      }

  },
  getters: {

  }
});
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
