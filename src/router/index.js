import Vue from 'vue'
import Router from 'vue-router'
import app from '../App.vue'
import platformhome from '../components/aboutPlatform/platformHome.vue'
import publicarticle from '../components/findArticle/publicArticle.vue'
import forumhome from '../components/forum/forumHome.vue'
import mybloghome from '../components/myBlog/myBlogHome.vue'
import waitdevelop from '../components/waitDevelop.vue'
import showarticlelist from '../components/findArticle/showArticleList.vue'
import login from '../components/other/login.vue'
import manager from '../components/myBlog/manager.vue'
import classify from '../components/myBlog/classify.vue'
import register from '../components/other/register.vue'
import showarticle from '../components/other/showBlog.vue'
import showmyselfblog from '../components/other/showMyselfBlog.vue'
import editorarticle from '../components/other/editorblog.vue'
import continueeditor from '../components/other/continueEditor.vue'
import test from '../components/test.vue'
import searchresult from '../components/findArticle/searchResult.vue'
import jmp from '../components/other/jmp.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component:publicarticle,
      children:[
      {
        path:'/',
        component:showarticlelist
      },
      {
        path:'/searchresult',
        component:searchresult

      },
      {
      path:'jmp',
      component:jmp
      },
      ]

    },
    {
    	path:'/myblog',
    	name:'bloghome',
    	component:mybloghome,
    	children:[
      {
        path:'article-manager',
        component:manager
      },
      {
        path:'/',
        component:manager
      },
      {
        path:'article-classify',
        component:classify
      },
      {
        path:'continue-editor',
        component:continueeditor
      },
      {
        path:'wait-message',
        component:waitdevelop
      },
      {
        path:'myself-setting',
        component:waitdevelop
      },
      {
      path:'editorarticle',
      component:editorarticle
      // component:test
    }

    	]

    },
    {
    	path:'/forum',
    	name:'forumhome',
      // component:waitdevelop,
    	component:forumhome,
    	children:[




    	]


    },
    {
    	path:'/aboutplatform',
    	name:'platformhome',
      // component:waitdevelop,
    	component:platformhome,
    	children:[


    	]

    },
    {
      path:'/login',
      component:login
    },
    {
      path:'/register',
      component:register
    },
    {
      path:'/showarticle/:articlecode',
      component:showarticle
    },
    {
      path:'/showmyselfblog/:articlecode',
      component:showmyselfblog
      
    },
    {
      path:'*',
      component:register
    }
  ]
})
