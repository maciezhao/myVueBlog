<template>
  <mavon-editor class="md-editor-class" :style="{ 'z-index': zindex }" ref="md" v-model="editor.value" @imgAdd="imgAdd" v-bind="editor"> </mavon-editor>
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

    }
  },
  computed: {
    zindex() {
      let sidebarOpen = this.$store.state.app.sidebar.opened
      let device = this.$store.state.app.device
      let zindex = 1500
      if (device === 'mobile' && sidebarOpen === true) {
        zindex = 6
      }
      return zindex
    }
  },
  mounted() {
    this.$set(this.editor, 'ref', this.$refs.md)
  },
  methods: {
    imgAdd(pos, $file) {
      let that = this
      let formdata = new FormData();
      formdata.append('image', $file);
      uploadImg(formdata).then(response => {
        // 将返回的url替换到文本原位置![...](./0) -> ![...](url)
        console.log(pos)
        that.$refs.md.$img2Url(pos, response.imageUrl);
      }).catch(error => {
        that.$message.error({ message: error, showClose: true });
      })
    }
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
  // background-color: #fff!important;
}
</style>
