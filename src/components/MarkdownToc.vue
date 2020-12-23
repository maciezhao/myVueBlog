<template>
  
</template>

<script>
import MarkdownToc from 'markdown-toc'

export default {
  name:MarkdownToc,
  props: {
    mdContent:String,
  },
  watched: {
    MarkdownToc() {
      this.getToc()
    }
  },
  methods: {
    getToc() {
      var toc = require('markdown-toc');
      let json
      toc(mdContent).content;
    }
  }
}
</script>

<style lang="scss" scoped>

</style>