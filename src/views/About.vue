<template>
<markdown-editor :editor="about.editor"></markdown-editor>

</template>

<script>
import MarkdownEditor from '@/components/MarkdownEditor'

export default {
    components: {
    MarkdownEditor,
    },
  data() {
    return {
      about: {
        editor: {
          value: `### 关于我
+ 成电19届本科生，毕业差不多一年半，还能算是一枚刚进入社会的萌新吧:grin:
+ 刚踏入java领域不久，之前做嵌入式开发相关的工作，这个网站就是我新征程的起点，养成写博客的好习惯，总有一天我也能名震江湖:rofl:
+ 我会把我的成长记录于此，也希望我java开发之旅一切顺利！最后，来一句鸡汤：**努力是世界上最棒的才能呀**&nbsp;&nbsp;&nbsp;&nbsp;--元气囡仔
### 联系方式
+ 邮箱：<macie.zhao@outlook.com>
+ GitHub: <https://github.com/rainie19>`,
          toolbarsFlag: false,
          subfield: false,
          previewBackground: '#fff',
          defaultOpen: 'preview',
        }
      }
    };
  },
}
</script>

<style lang="scss" scoped>
// .middle-class {
//   display: inline-block;
//   float: left;
//   width: auto;
//   height: 100%;
//   // min-width: 300px;
// }
// .right-class {
//   display: inline-block;
//   float: left;
//     width: auto;
//   height: 100%;
//   // min-width: 200px;
//   vertical-align: top;
// }
// .main-class {
//   width: 800px;
//   height: 100%;
// }
.el-card {
    height: 200px;
  margin:20px 0;
  width: 100%;
}
.middle-class {
  display: inline-flex;
  flex:1 1 auto;
    flex-direction: column;
  width: 50%;
  min-width: 300px;
  height: 100%;
  padding:20px;
}
.right-class {
  display: inline-flex;
  flex:1 1 auto;
    flex-direction: column;
  width: auto;
  min-width: 200px;
  height: 100%;
  padding:20px;
}
.main-class {
  padding:20px;
  display: flex;
  flex-wrap: wrap;

}
/* .article-class {
  height: 200px;
  margin:20px 0;
  width:100%;
} */
.el-card1 {
    height: 200px;
  margin:20px 0;
  width: 100%;
}

.space a {
    display: inline-block;
    padding: .5em 1em;
    background-color: #cad5eb;
}
  .my-tag {
    //position: inherit !important;
    height: 200px !important;
    width: 300px !important;
  }

  .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    margin-top: 20px;
    min-width: 100px;
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>