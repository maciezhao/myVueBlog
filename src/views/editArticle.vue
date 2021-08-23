<template>
  <div v-if="authCheck">
    <el-form :model="articleForm" ref="articleForm" :rules="rules" label-position="top" label-width="80px">
      <div class="editor-header">
        <div class="input-title">
          <el-form-item prop="articleTitle" style="margin-bottom: 0; width: 100%">
            <el-input v-model="articleForm.articleTitle" style="border: none" placeholder="请输入标题"></el-input>
          </el-form-item>
        </div>
        <div class="publish-popover">
          <el-popover placement="bottom" width="300" trigger="click">
            <el-form-item label="英文标题" prop="articleSlug">
              <el-input v-model="articleForm.articleSlug" placeholder="请输入英文标题"></el-input>
            </el-form-item>
            <el-form-item label="一句话摘要" prop="articleSummary">
              <el-input
                v-model="articleForm.articleSummary"
                :autosize="{ minRows: 2 }"
                placeholder="请简洁的概述一下此文章的主要内容"
                type="textarea"
              ></el-input>
            </el-form-item>
            <el-form-item label="选择分类" prop="categoryName">
              <el-select v-model="articleForm.categoryName" filterable allow-create default-first-option placeholder="请新建或选择文章分类">
                <el-option v-for="item in allCategories" :key="item.categoryId" :label="item.categoryName" :value="item.categoryName"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="选择标签" prop="dynamicTags">
              <br />
              <el-autocomplete
                class="input-new-tag inline-input"
                :fetch-suggestions="querySearch"
                placeholder="请输入内容"
                v-if="inputVisible"
                v-model="inputNewTag"
                ref="saveTagInput"
                size="small"
                @keyup.enter.native="handleInputConfirm"
                @blur="handleInputConfirm"
              ></el-autocomplete>
              <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
              <el-tag :key="tag" v-for="tag in articleForm.dynamicTags" closable :disable-transitions="false" @close="handleClose(tag)">{{ tag }}</el-tag>
            </el-form-item>
            <div style="text-align: center">
              <el-button type="primary" :loading="loading" @click.native.prevent="publish">确定并发布</el-button>
            </div>
            <el-button slot="reference" type="primary">发布<i class="el-icon-arrow-down el-icon--right" /></el-button>
          </el-popover>
        </div>
      </div>
      <div class="editor-body">
        <el-form-item prop="editor">
          <markdown-editor :editor="articleForm.editor"></markdown-editor>
        </el-form-item>
      </div>
      <!-- <el-form-item prop="articleContentHtml">
        <el-input v-model="articleForm.articleContentHtml" :autosize="{ minRows: 12 }" placeholder="请输入正文" type="textarea"></el-input>
      </el-form-item> -->
    </el-form>
  </div>
</template>

<script>
import { publishArticle, getAllTags, getAllCategories, getArticleDetailById } from '@/api/article'
import MarkdownEditor from '@/components/MarkdownEditor'

export default {
  components: {
    MarkdownEditor,
  },
  inject: ['reload'],
  data() {
    var editorValidator = (rule, value, callback) => {
      if (!value.value) {
        callback(new Error("正文不能为空"));
      }
      else {
        callback();
      }
    }
    var validateTags = (rule, value, callback) => {
      if (value.length == 0 || value.length > 3) {
        callback(new Error("请选择1-3个标签"));
      }
      for(var i in value) {
        if(value[i].length > 6) {
          callback("标签长度小于6个字符");
        }
      }
      
      callback();
    }
    return {
      articleForm: {
        articleTitle: '',
        articleSlug: '',
        articleAuthor: '',
        categoryName: '',
        articleSummary: '',
        articleContentHtml: '',
        articleContentMd: '',
        dynamicTags: [],
        editor: {
          value: '',
          // ref: '',//保存mavonEditor实例  实际不该这样
          default_open: 'edit',
          placeholder: '请输入正文',

          toolbars: {
            bold: true, // 粗体
            italic: true, // 斜体
            header: true, // 标题
            underline: true, // 下划线
            strikethrough: true, // 中划线
            mark: true, // 标记
            superscript: true, // 上角标
            subscript: true, // 下角标
            quote: true, // 引用
            ol: true, // 有序列表
            ul: true, // 无序列表
            imagelink: true, // 图片链接
            code: true, // code
            fullscreen: true, // 全屏编辑
            readmodel: true, // 沉浸式阅读
            help: true, // 帮助
            undo: true, // 上一步
            redo: true, // 下一步
            trash: true, // 清空
            navigation: true, // 导航目录
            //subfield: true, // 单双栏模式
            preview: true, // 预览
            htmlcode: true, // 展示html源码
            // save: true, // 保存（触发events中的save事件）
            alignleft: true, // 左对齐
            aligncenter: true, // 居中
            alignright: true, // 右对齐
          }
        }
      },
      loading: false,
      allCategories: [],
      allTags: [],
      publishType: 'create',

      inputVisible: false,
      inputNewTag: '',
      rules: {
        articleTitle: [
          { required: true, message: '标题不能为空', trigger: 'blur' },
          { min: 3, max: 30, message: '长度为3-30个字符', trigger: 'blur' }
        ],
        articleSlug: [
          { required: true, message: '英文标题不能为空', trigger: 'blur' },
          { min: 3, max: 40, message: '长度为3-40个字符', trigger: 'blur' }
        ],
        articleSummary: [
          { required: true, message: '请输入摘要', trigger: 'blur' },
          { max: 200, message: '不能大于 200 个字符', trigger: 'blur' }
        ],
        categoryName: [
          { required: true, message: '请选择文章分类', trigger: 'change' },
          { max: 10, message: '不能大于 10 个字符', trigger: 'change' }
        ],
        dynamicTags: [
          { required: true, type: 'array', validator: validateTags, trigger: 'change' }
        ],
        editor: [
          { required: true, validator: editorValidator, trigger: 'blur' },
        ],
      }
    }
  },
  computed: {
    authCheck() {
      //验证修改权限
      if (this.$route.params.articleId)
        return this.$store.state.user.token && this.$store.state.user.name === this.articleForm.articleAuthor
      return true
    }
  },
  created() {
    this.getCategoryAndTagInfo()
    if (this.$route.params.articleId) {
      this.getArticleInfo(this.$route.params.articleId)
    }
  },
  methods: {
    querySearch(queryString, cb) {
      var allTags = this.allTags.map(tag => { return { "value": tag } });
      var results = queryString
        ? allTags.filter(this.createFilter(queryString))
        : allTags;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString) {
      return (tag) => {
        return (
          tag.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
        );
      };
    },
    handleClose(tag) {
      this.articleForm.dynamicTags.splice(this.articleForm.dynamicTags.indexOf(tag), 1);
    },

    showInput() {
      this.inputVisible = true;
      this.$nextTick(() => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    handleInputConfirm() {
      setTimeout(() => {
        let inputNewTag = this.inputNewTag;
        if (inputNewTag && this.articleForm.dynamicTags.indexOf(inputNewTag.trim()) === -1) {
          this.articleForm.dynamicTags.push(inputNewTag);
        }
        this.inputVisible = false;
        this.inputNewTag = "";
        this.$refs.articleForm.validateField('dynamicTags');
      }, 400);
    },
    publish() {
      this.$refs.articleForm.validate(valid => {
        if (valid) {
          this.loading = true
          let article = {
            articleTitle: this.articleForm.articleTitle,
            articleSlug: this.articleForm.articleSlug,
            articleAuthor: this.$store.state.user.name,
            categoryName: this.articleForm.categoryName,
            articleSummary: this.articleForm.articleSummary,
            // articleContentHtml: '',
            dynamicTags: this.articleForm.dynamicTags,
            articleContentMd: this.articleForm.editor.value
          }
          if (this.$route.params.articleId) {
            article["articleId"] = this.$route.params.articleId;
            this.publishType = 'modify'
          }
          publishArticle(article, this.publishType).then(response => {
            this.loading = false
            this.$message.success({ message: '文章发布成功', showClose: true })

            this.$router.push({ name: 'articleDetail', params: { articleId: response.article.articleId, slug: response.article.articleSlug } })
            this.reload()
          }).catch((error) => {
            this.loading = false
            console.log(error)
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    getCategoryAndTagInfo() {
      let that = this
      getAllCategories().then(response => {
        that.allCategories = response.categories
      })
      getAllTags().then(response => {
        that.allTags = response.tags.map(tag => tag.tagName)
      })
    },
    getArticleInfo(articleId) {
      let that = this
      getArticleDetailById(articleId).then(response => {
        //  let art = {"articles":[{"articleAuthor":"","articleCategoryId":0,"articleCommentsCount":0,"articleContentHtml":"这是测试博客的第一篇文章","articleContentMd":"","articleCreateTime":{"date":25,"day":5,"hours":0,"minutes":0,"month":8,"seconds":0,"time":1600963200000,"timezoneOffset":-480,"year":120},"articleDelete":0,"articleId":1,"articleSlug":"first-blog","articleSummary":"博客demo","articleTag":"博客 测试","articleTitle":"第一篇博客","articleViewCount":0,"categoryId":0},{"articleAuthor":"","articleCategoryId":0,"articleCommentsCount":0,"articleContentHtml":"这是测试博客的第一篇文章","articleContentMd":"","articleCreateTime":{"date":26,"day":6,"hours":0,"minutes":0,"month":8,"seconds":0,"time":1601049600000,"timezoneOffset":-480,"year":120},"articleDelete":0,"articleId":2,"articleSlug":"second-blog","articleSummary":"博客demo","articleTag":"博客","articleTitle":"第二篇博客","articleViewCount":0,"categoryId":0},{"articleAuthor":"","articleCategoryId":0,"articleCommentsCount":0,"articleContentHtml":"这是测试博客的第一篇文章","articleContentMd":"","articleCreateTime":{"date":26,"day":6,"hours":0,"minutes":0,"month":8,"seconds":0,"time":1601049600000,"timezoneOffset":-480,"year":120},"articleDelete":0,"articleId":3,"articleSlug":"third-blog","articleSummary":"博客demo","articleTag":"博客 测试","articleTitle":"第三篇博客","articleViewCount":0,"categoryId":0}],"code":20000}
        let article = response.article
        that.articleForm.dynamicTags = response.tags.map(tag => tag.tagName)
        that.articleForm.articleTitle = article.articleTitle
        that.articleForm.articleAuthor = article.articleAuthor
        that.articleForm.articleSlug = article.articleSlug.replaceAll("-", " ")
        that.articleForm.articleSummary = article.articleSummary
        that.articleForm.editor.value = article.articleContentMd
        that.articleForm.articleContentHtml = article.articleContentHtml
        that.articleForm.categoryName = article.categoryName

      })
    }
  },
};
</script>

<style lang="scss" scoped>
.editor-header {
  display: flex;
  height: 60px;
  align-items: center;
  margin-bottom: 20px;
}
.input-title {
  display: flex;
  flex: 1 1 auto;
  height: 100%;
  align-items: center;
}
.publish-popover {
  display: flex;
  width: 30%;
  height: 100%;
  align-items: center;
  justify-content: center;
}
.el-tag + .el-tag {
  margin-left: 10px;
  margin-bottom: 10px;
}
.button-new-tag {
  margin: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin: 0 10px;
  vertical-align: middle;
}

.input-title ::v-deep .el-input__inner {
  font-size: 20px;
  font-weight: 700;
  border-radius: 0;
  border-top-width: 0px;
  border-left-width: 0px;
  border-right-width: 0px;
  border-bottom-width: 1px;
  /*outline: medium;*/
}
</style>
