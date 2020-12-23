<template>
  <div v-loading="listLoading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading">
    <template v-if="this.$route.params.type === 'category'">
    <h1 class="post-header"><i class="icon-class iconfont icon-folder-open"/>  {{ this.$route.params.id }}</h1>
    </template>
    <template v-else-if="this.$route.params.type === 'tag'">
          <h1 class="post-header"><i class="icon-class iconfont icon-tag"/>  {{ this.$route.params.id }}</h1>

    </template>
    <el-timeline>
      <el-timeline-item color="#00a1d6" v-for="article in articles" :key="article.articleId">
        <el-card :body-style="{ padding: 0 }" style="margin: 0; bord-radius:none">
          <el-link :underline="false" style="font-size: 20px; padding: 10px" @click="viewArticleDetail(article.articleId, article.articleSlug)">{{
            article.articleTitle
          }}</el-link>
          <more-actions :articleId="article.articleId" :articleAuthor="article.articleAuthor" style="float: right" />
          <br />
          <other-blog-info
            style="padding: 10px"
            :articleCreateTime="article.articleCreateTime.time"
            :categoryName="article.categoryName"
            :tags="articleIdTagsMap[article.articleId]"
          >
          </other-blog-info>
        </el-card>
      </el-timeline-item>
    </el-timeline>
    <div class="block my-el-pagination">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :total="totalCount"
        hide-on-single-page
        prev-text="上一页"
        next-text="下一页"
        :page-size="pageSize"
        layout="total, prev, pager, next"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { getArticlesInfo } from '@/api/article'
import moreAction from '@/components/moreAction'
import otherBlogInfo from '@/components/otherBlogInfo'
export default {
  data() {
    return {
      listLoading: false,
      articles: null,
      articleIdTagsMap: null,
      pageSize: 8,
      currentPage: 1,
      // 总条数，根据接口获取数据长度(注意：这里不能为空)
      totalCount: 1,
    }
  },
  components: {
    'other-blog-info': otherBlogInfo,
    'more-actions': moreAction,
  },
  created() {
    this.getArticles(this.pageSize, this.currentPage)
  },
  methods: {
    viewArticleDetail(id, slug) {
      this.$router.push({ name: 'articleDetail', params: { articleId: id, slug: slug } })
    },
    getArticles(pageSize, pageNumber) {
      let that = this
      that.listLoading = true
      let queryData = {
        queryType: that.$route.params.type,
        [that.$route.params.type]: that.$route.params.id,
        queryPage: pageNumber,
        pageSize: pageSize,
      };
      getArticlesInfo(queryData).then(response => {
        //  let art = {"articles":[{"articleAuthor":"","articleCategoryId":0,"articleCommentsCount":0,"articleContentHtml":"这是测试博客的第一篇文章","articleContentMd":"","articleCreateTime":{"date":25,"day":5,"hours":0,"minutes":0,"month":8,"seconds":0,"time":1600963200000,"timezoneOffset":-480,"year":120},"articleDelete":0,"articleId":1,"articleSlug":"first-blog","articleSummary":"博客demo","articleTag":"博客 测试","articleTitle":"第一篇博客","articleViewCount":0,"categoryId":0},{"articleAuthor":"","articleCategoryId":0,"articleCommentsCount":0,"articleContentHtml":"这是测试博客的第一篇文章","articleContentMd":"","articleCreateTime":{"date":26,"day":6,"hours":0,"minutes":0,"month":8,"seconds":0,"time":1601049600000,"timezoneOffset":-480,"year":120},"articleDelete":0,"articleId":2,"articleSlug":"second-blog","articleSummary":"博客demo","articleTag":"博客","articleTitle":"第二篇博客","articleViewCount":0,"categoryId":0},{"articleAuthor":"","articleCategoryId":0,"articleCommentsCount":0,"articleContentHtml":"这是测试博客的第一篇文章","articleContentMd":"","articleCreateTime":{"date":26,"day":6,"hours":0,"minutes":0,"month":8,"seconds":0,"time":1601049600000,"timezoneOffset":-480,"year":120},"articleDelete":0,"articleId":3,"articleSlug":"third-blog","articleSummary":"博客demo","articleTag":"博客 测试","articleTitle":"第三篇博客","articleViewCount":0,"categoryId":0}],"code":20000}
        that.articles = response.articles
        that.articleIdTagsMap = response.articleIdTagsMap
        that.totalCount = response.articleTotalCount
        that.listLoading = false
      })
    },
    handleSizeChange(val) {
      this.PageSize = val
      this.getArticles(val, 1)
      this.currentPage = 1
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.getArticles(this.pageSize, val)
    },
  },
}
</script>

<style lang="scss" scoped>
.post-header {
  text-align: center;
  margin-bottom: 40px;
}
.icon-class {
  font-size: 30px;
}
.my-el-pagination {
  text-align: center;
  margin: 10px;
}
</style>


