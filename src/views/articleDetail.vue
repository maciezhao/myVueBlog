<template>
  <div>
    <div style="min-height: 500px">
      <el-card :style="{'margin' : device === 'mobile' ? '0px' : '0 100px' }" v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" v-if="article">
        <div class="item">
          <span style="font-weight: 700; font-size: 24px">{{ article.articleTitle }}</span>
          <more-action :articleId="article.articleId" :articleAuthor="article.articleAuthor" style="float: right" />
        </div>
        <div class="item">
          <other-blog-info :articleCreateTime="article.articleCreateTime.time" :categoryName="article.categoryName" :tags="tags"> </other-blog-info>
        </div>
        <!-- <div class="text item">
          {{ article.articleSummary }}
        </div> -->
        <div class="text-body">
          <markdown-editor :editor="article.editor"></markdown-editor>
        </div>
        <el-divider></el-divider>
        <div>
          <span class="articleActivitiesClass"> <i class="iconfont icon-eye"></i>{{ '&nbsp;' + article.articleViewCount }} </span>
          <span class="articleActivitiesClass"><i class="iconfont icon-commenting"></i>{{ '&nbsp;' + article.articleCommentsCount }} </span>
        </div>
      </el-card>
    </div>
    <div class="post-nav">
      <div class="post-nav-item">
        <template v-if="prevArticle !== null && prevArticle.articleId !== 0">
          <i class="iconfont icon-angle-left"></i>
          <el-link :underline="false" @click="viewArticleDetail(prevArticle)">{{ prevArticle.articleTitle }}</el-link>
        </template>
      </div>
      <div class="post-nav-item">
        <template v-if="nextArticle !== null && nextArticle.articleId !== 0">
          <el-link :underline="false" @click="viewArticleDetail(nextArticle)">{{ nextArticle.articleTitle }}</el-link>
          <i class="iconfont icon-angle-right"></i>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import { getArticleDetailById } from '@/api/article'
import moreAction from '@/components/moreAction'
import otherBlogInfo from '@/components/otherBlogInfo'
import MarkdownEditor from '@/components/MarkdownEditor'
export default {
  data() {
    return {
      article: null,
      tags: null,
      prevArticle: null,
      nextArticle: null,
      loading: false,
    }
  },
  inject: ['reload'],
  computed: {
    device() {
      return this.$store.state.app.device
    },
  },
    created() {
      this.getArticleDetail()
    },
    methods: {
      getArticleDetail() {
        let that = this
        that.loading = true
        let id = that.$route.params.articleId
        getArticleDetailById(id).then(response => {
          //  let art = {"articles":[{"articleAuthor":"","articleCategoryId":0,"articleCommentsCount":0,"articleContentHtml":"这是测试博客的第一篇文章","articleContentMd":"","articleCreateTime":{"date":25,"day":5,"hours":0,"minutes":0,"month":8,"seconds":0,"time":1600963200000,"timezoneOffset":-480,"year":120},"articleDelete":0,"articleId":1,"articleSlug":"first-blog","articleSummary":"博客demo","articleTag":"博客 测试","articleTitle":"第一篇博客","articleViewCount":0,"categoryId":0},{"articleAuthor":"","articleCategoryId":0,"articleCommentsCount":0,"articleContentHtml":"这是测试博客的第一篇文章","articleContentMd":"","articleCreateTime":{"date":26,"day":6,"hours":0,"minutes":0,"month":8,"seconds":0,"time":1601049600000,"timezoneOffset":-480,"year":120},"articleDelete":0,"articleId":2,"articleSlug":"second-blog","articleSummary":"博客demo","articleTag":"博客","articleTitle":"第二篇博客","articleViewCount":0,"categoryId":0},{"articleAuthor":"","articleCategoryId":0,"articleCommentsCount":0,"articleContentHtml":"这是测试博客的第一篇文章","articleContentMd":"","articleCreateTime":{"date":26,"day":6,"hours":0,"minutes":0,"month":8,"seconds":0,"time":1601049600000,"timezoneOffset":-480,"year":120},"articleDelete":0,"articleId":3,"articleSlug":"third-blog","articleSummary":"博客demo","articleTag":"博客 测试","articleTitle":"第三篇博客","articleViewCount":0,"categoryId":0}],"code":20000}
          that.article = response.article
          console.log(that.article.articleCreateTime.time)
          let editor = {
            value: response.article.articleContentMd,
            toolbarsFlag: false,
            subfield: false,
            previewBackground: '#fff',
            defaultOpen: 'preview',
          }
          this.article['editor'] = editor
          that.prevArticle = response.prevArticle
          that.nextArticle = response.nextArticle
          that.tags = response.tags
          that.loading = false
        })
      },
      viewArticleDetail(article) {
        this.$router.push({ name: 'articleDetail', params: { articleId: article.articleId, slug: article.articleSlug } })
        this.reload()
      }
    },
    components: {
      'more-action': moreAction,
      'other-blog-info': otherBlogInfo,
      MarkdownEditor,
    },
  }

</script>

<style scoped lang="scss">
.text-body {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
  text-align: center;
}

.el-card.is-always-shadow {
  box-shadow: none;
  border: none;
}
// .el-card__body {
//   padding: 5px;
// }
.el-card ::v-deep .el-card__body {
  padding: 5px !important;
}

.articleActivitiesClass {
  padding-right: 0 !important;
  font-size: 16px;
  font-weight: 400;
  line-height: 20px;
  margin-right: 15px;
  margin-top: 15px;
  color: #999;
}

.post-nav {
  display: flex;
  justify-content: space-between;
  // margin: 0 1rem;
  background-color: rgba(0, 136, 204, 0.1);
  box-shadow: 20px 0 rgba(0, 136, 204, 0.1), -20px 0 rgba(0, 136, 204, 0.1);
}

.post-nav-item {
  display: inline-flex;
  align-items: center;
  height: 3rem;

  transition: 0.4s;
  .el-link {
    font-size: 20px;
    font-weight: 700;
  }
  .iconfont {
    font-size: 20px;
    color: #00a1d6;
  }
}
</style>




