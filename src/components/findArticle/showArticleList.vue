<template>
  <div class="main2">
  <h1 class="top">{{partname}}</h1>
  <div class="show">

  <section class="diyback" style="border-bottom:1px solid   #ADADAD" v-for="article in showlist">
    <router-link class="color1" :to="article.url"><h1 class="blogtitle">{{article.name}}<span class="blogs-mes">时间：{{article.time}}</span><span class="blogs-mes">作者：{{article.author}}</span></h1></router-link>
    <p class="hid">{{article.introduce}}</p>
    <router-link :to="article.url"><button class="blogs-button">阅读全文 >></button><span class="blogs-mes">阅读量：{{article.readtimes}}</span></router-link>
  </section>

<!--  <section class="diyback" style="border-bottom:1px solid   #ADADAD">
    <router-link class="color1" to="/showarticle/language"><h1 class="blogtitle">如何搭建博客</h1></router-link>
    <div class="blogs-mes"><p><span>作者:{{auto}}  时间:{{reporttime}}</span></p></div>
    <p class="hid">{{meg}}</p>
    <router-link to="/showarticle/language"><button class="blogs-button">阅读全文 >></button></router-link>
    </section> -->
  </div>
     <el-pagination
            :current-page.sync="currentpage"
            @current-change="pagechange"
            :page-size="5"
            layout="prev, pager, next, jumper"
            :total="totalsize">
    </el-pagination>
  </div>
</template>
<script>

export default{
  data(){
    return {
      currentpage:1,
      articlelist:[],
      showlist:[],
      nowpartlist:[],
      totalsize:0,
      meg:"The Panda has become the symbol of WWF. The well-known panda logo of WWF originated from a panda named Chi Chi that was transferred from the Beijing Zoo to the London Zoo in the same year of the establishment of WWF.The Panda has become the symbol of WWF. The well-known panda logo of WWF originated from a panda named Chi Chi that was transferred from the Beijing Zoo to the London Zoo in the same year of the establishment of WWF.",
      auto:'吴炜锋',
      reporttime:'2017-10-17',
      

    }
  },
  components:{

    },
  methods:{
    getArticleList(){
      this.axios({
        url:this.$store.state.infoserverhost+'/article/getarticlelist',
        method:'get',
      }).then(res=>{
        if(res.data.status==1){
          this.articlelist=res.data.articles;
          this.getPartArticleList();
        }else{
          this.$notify.error({
              title: '获取文章列表失败',
              message: res.data.errorInfo,
              });
        }
      })
    },
    getPartArticleList(){
        if(this.partname=='全部文章'){
          this.nowpartlist=this.articlelist;
        }else{
          var t_part = new Array();
          for(var i=0;i<this.articlelist.length;i++){
            if(this.articlelist[i].part==this.partname){
              t_part.push(this.articlelist[i])
            }
          }
          this.nowpartlist=t_part;
        }
        this.showlist=this.nowpartlist.slice(0,5);
        this.totalsize=this.nowpartlist.length;
        this.currentpage=1;
    },
    pagechange(val){
        this.showlist=this.nowpartlist.slice((val-1)*5,val*5);
    }

  },
  props: ['partname'],
  watch:{
    partname:function (val){
      this.getPartArticleList();
    },


  },
  mounted(){
    this.getArticleList();
  }
}

</script>
<style scoped>

.diyback{
  height: 20%;
  text-align: left;
}

.diyback:hover{
background-color:   #E8FFC4 ;
}

.top{
  letter-spacing : 10pt; /*字间距离*/
  font-size: 1.5em;
}

.blogtitle{
  margin-left: 20px;
  font-size: 22px;
  color: #000000;
  font-weight: 500;
  /*margin: 0;*/
  margin-top: 3px;
  cursor: pointer;

}

span{
  float: right;
  margin-right: 10px;
  margin-top: 8px;

}

a.color1:link{color: #000000 ; text-decoration:none;}   
/*a.color1:visited{color: #996600; text-decoration:none;}   
a.color1:hover {color: #99FF66; text-decoration:underline;}  */

.main2{
  width: 80%;
  height: 91%;
  position: absolute;
}


.hid{
margin-left: 20px;
margin-top: 4px;
display: -webkit-box;
-webkit-box-orient: vertical;
-webkit-line-clamp: 1;
overflow: hidden;
font-size: 15px;
color: #555;
}

/*.block{
  margin-top: 20px;
  width: 80%;
 
}*/

.show{
  width: 100%;
  height: 85%;
}
.el-pagination{
  margin-top: 50px;
  font-size: 1.2em;
}


  .blogs-mes{
    font-size: 14px;
    color: #7B7B7B;
    margin-left: 8px;
  }
 

  .blogs-button{
    margin-top: 7px;
    border: none;
    margin-left: 20px;
    background-color: black;
    color:white;
    width: 110px;
    height: 25px;
    margin-bottom: 10px;
    border: 2px solid black;
    cursor: pointer;
    transition: all 0.3s;
  }
  .blogs-button:hover{
    color:black;
    background-color: white;
  }

</style>