<template>
  <div class="main-class">
    <div class="article-info" v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading">
      <el-card v-for="article in articles" :key="article.articleId">
        <div class="item">
          <el-link :underline="false" style="font-size: 20px" @click="viewArticleDetail(article.articleId, article.articleSlug)">{{
            article.articleTitle
          }}</el-link>
          <more-actions :articleId="article.articleId" :articleAuthor="article.articleAuthor" style="float: right" />
        </div>
        <div class="item">
          <other-blog-info :articleCreateTime="article.articleCreateTime.time" :categoryName="article.categoryName" :tags="articleIdTagsMap[article.articleId]">
          </other-blog-info>
        </div>
        <div class="text item">
          {{ article.articleSummary }}
        </div>
        <el-divider></el-divider>
        <div>
          <span class="articleActivitiesClass"> <i class="iconfont icon-View"></i>{{ '&nbsp;' + article.articleViewCount }} </span>
          <span class="articleActivitiesClass"><i class="iconfont icon-commenting"></i>{{ '&nbsp;' + article.articleCommentsCount }} </span>
        </div>
      </el-card>
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
    <div class="right-info">
      <notification />
    </div>
  </div>
</template>

<script>
import { getArticlesInfo } from '@/api/article'
// import tags from '@/components/tags'
// import myCard from '@/components/myCard'
import moreAction from '@/components/moreAction'
import otherBlogInfo from '@/components/otherBlogInfo'
import notification from '@/components/notification';

export default {
  components: {
    'more-actions': moreAction,
    'other-blog-info': otherBlogInfo,
    notification,
  },
  data() {
    return {
      articles: {},
      articleIdTagsMap: {},
      loading: false,
      pageSize: 8,
      currentPage: 1,
      // 总条数，根据接口获取数据长度(注意：这里不能为空)
      totalCount: 1,
    }
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
      that.loading = true
      let queryData = {
        queryType: 'article',
        queryPage: pageNumber,
        pageSize: pageSize,
      };
      getArticlesInfo(queryData).then(response => {
        //  let art = {"articles":[{"articleAuthor":"","articleCategoryId":0,"articleCommentsCount":0,"articleContentHtml":"这是测试博客的第一篇文章","articleContentMd":"","articleCreateTime":{"date":25,"day":5,"hours":0,"minutes":0,"month":8,"seconds":0,"time":1600963200000,"timezoneOffset":-480,"year":120},"articleDelete":0,"articleId":1,"articleSlug":"first-blog","articleSummary":"博客demo","articleTag":"博客 测试","articleTitle":"第一篇博客","articleViewCount":0,"categoryId":0},{"articleAuthor":"","articleCategoryId":0,"articleCommentsCount":0,"articleContentHtml":"这是测试博客的第一篇文章","articleContentMd":"","articleCreateTime":{"date":26,"day":6,"hours":0,"minutes":0,"month":8,"seconds":0,"time":1601049600000,"timezoneOffset":-480,"year":120},"articleDelete":0,"articleId":2,"articleSlug":"second-blog","articleSummary":"博客demo","articleTag":"博客","articleTitle":"第二篇博客","articleViewCount":0,"categoryId":0},{"articleAuthor":"","articleCategoryId":0,"articleCommentsCount":0,"articleContentHtml":"这是测试博客的第一篇文章","articleContentMd":"","articleCreateTime":{"date":26,"day":6,"hours":0,"minutes":0,"month":8,"seconds":0,"time":1601049600000,"timezoneOffset":-480,"year":120},"articleDelete":0,"articleId":3,"articleSlug":"third-blog","articleSummary":"博客demo","articleTag":"博客 测试","articleTitle":"第三篇博客","articleViewCount":0,"categoryId":0}],"code":20000}
        that.articles = response.articles
        that.articleIdTagsMap = response.articleIdTagsMap
        that.totalCount = response.articleTotalCount
        that.loading = false
      }).catch(() => {
        that.loading = false
        that.$message.error({ message: "加载文章失败", showClose: true })
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
  }
};
</script>

<style scoped>
.article-info {
  display: inline-flex;
  flex: 1 1 auto;
  flex-direction: column;
  width: 70%;
  min-width: 300px;
  height: 100%;
  padding: 0 10px;
}
.right-info {
  display: inline-flex;
  flex: 1 1 auto;
  flex-direction: column;
  width: 30%;
  min-width: 200px;
  height: 100%;
  padding: 0 10px;
}
.main-class {
  padding: 0 10px;
  display: flex;
  flex-wrap: wrap;
}
.my-el-pagination {
  text-align: center;
  margin: 10px;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.articleActivitiesClass {
  padding-right: 0 !important;
  font-size: 15px;
  font-weight: 400;
  line-height: 20px;
  margin-right: 15px;
  margin-top: 15px;
  color: #999;
}

.el-tag {
  margin-right: 10px;
}
</style>



