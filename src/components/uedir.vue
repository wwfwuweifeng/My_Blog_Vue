<template>
  <div class="main">
    <script id="editor" type="text/plain"></script>
  </div>
</template>
<script>
  export default {
    name: 'UE',
    data () {
      return {
        editor: null
      }
    },
    props: {
      defaultMsg: {
        type: String
      },
      config: {
        type: Object
      }
    },
    mounted() {
      const _this = this;
      this.editor = UE.getEditor('editor', this.config); // 初始化UE
      this.editor.addListener("ready", function () {
        _this.editor.setContent(_this.defaultMsg); // 确保UE加载完成后，放入内容。
      });
    },
    methods: {
      getUEContent() { // 获取内容方法
        return this.editor.getContent()
        // UE.getPlainTxt() 可获取到编辑器中的纯文本内容，有段落格式
        // UE.getContentTxt() 可获取到编辑器中的纯文本内容，没有段落格式；
      }
    },
    destroyed() {
      this.editor.destroy();
    }
  }
</script>

<style scoped>
  .main{
        width: 100%;
        height: 100%;
        position: absolute;
        }
</style>