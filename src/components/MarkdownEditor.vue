<template>
  <mavon-editor
    class="md-editor-class"
    :style="{ 'z-index': zindex }"
    ref="md"
    v-model="editor.value"
    @imgAdd="imgAdd"
    @imgDel="imgDel"
    @fullScreen="fullScreen"
    v-bind="editor"
  >
  </mavon-editor>
</template>


<script>

import { mavonEditor } from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import { uploadImg } from '@/api/article'

export default {
  name: 'MarkdownEditor',
  props: {
    editor: Object
  },
  data() {
    return {
      zindex: 6,
    }
  },
  // computed: {
  //   zindex() {
  //     // 修改全屏编辑z-index
  //     let sidebarOpen = this.$store.state.app.sidebar.opened
  //     let device = this.$store.state.app.device
  //     let zindex = 6
  //     if (device === 'mobile' && sidebarOpen === true) {
  //       zindex = 6
  //     }
  //     return zindex
  //   }
  // },
  mounted() {
    this.$set(this.editor, 'ref', this.$refs.md)
  },
  methods: {
    fullScreen(status, value) {
      if (status === true) {
        this.zindex = 1500
      }
      else {
        this.zindex = 10
      }
    },
    imgAdd(pos, $file) {
      let that = this
      let formData = new FormData();
      formData.append('image', $file);
      uploadImg(formData).then(response => {
        // 将返回的url替换到文本原位置![...](./0) -> ![...](url)
        that.$refs.md.$img2Url(pos, response.imageUrl.replace(/\\/g,"/"));
      }).catch(error => {
        that.$message.error({ message: error, showClose: true });
      })
    },
    imgDel(pos) {
      console.log("imgDel:", pos[0])
      // deleteImg(pos[0])


    },
  },
  components: {
    mavonEditor
  }
}
</script>
<style lang="scss" scoped>
.md-editor-class {
  min-height: 500px;
  border: none !important;
  box-shadow: none !important;
  .v-show-content {
    padding: 0 !important;
    width: 100%;
    height: 100%;
    // padding: 8px 25px 15px 25px;
    overflow-y: auto;
    box-sizing: border-box;
    overflow-x: hidden;
  }
}
</style>

<style>
.v-note-wrapper .v-note-panel .v-note-show .v-show-content {
  padding: 6px !important;
}
</style>
