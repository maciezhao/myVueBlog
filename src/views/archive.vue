<template>
  <div class="block" v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading">
    <el-timeline>
      <template v-for="year in years">
        <el-timeline-item color="#00a1d6" :key="year" icon="iconfont icon-calendar" class="timeline-year-class">{{ year }} </el-timeline-item>
        <el-timeline-item color="#00a1d6" v-for="article in articles[year]" :key="article.articleId">
          <el-card :body-style="{ padding: 0 }" style="margin: 0">
            <el-link :underline="false" style="font-size: 20px; padding: 10px" @click="viewArticleDetail(article.articleId, article.articleSlug)">{{
              article.articleTitle
            }}</el-link>

            <more-actions :articleId="article.articleId" :articleAuthor="article.articleAuthor" style="float: right" />
            <div>
              <other-blog-info
                style="padding: 10px"
                :articleCreateTime="article.articleCreateTime.time"
                :categoryName="article.categoryName"
                :tags="articleIdTagsMap[article.articleId]"
              >
              </other-blog-info>
            </div>
          </el-card>
        </el-timeline-item>
      </template>
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
  components: {
    'other-blog-info': otherBlogInfo,
    'more-actions': moreAction,
  },
  data() {
    return {
      reverse: true,
      years: [],
      articles: {},
      articleIdTagsMap: {},
      loading: false,
      pageSize: 12,
      currentPage: 1,
      totalCount: 1,
    };
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
        that.articles = this.sortArticlesByYear(response.articles)
        // that.articles = response.articles
        that.articleIdTagsMap = response.articleIdTagsMap
        that.totalCount = response.articleTotalCount
        that.loading = false
      }).catch(() => {
        that.loading = false
        that.$message.error({ message: "加载文章失败", showClose: true })
      })
    },
    sortArticlesByYear(articles) {
      let sortedArticles = {}
      let years = []
      let articlesInOneYear = []
      for (var index in articles) {
        let time = articles[index].articleCreateTime.time
        let year = new Date(time).getFullYear()
        if (years.indexOf(year) === -1) {
          years.push(year)
        }
      }
      //年份按降序排列
      years = years.sort(function (a, b) { return b - a })
      this.years = years
      for (var y in years) {
        for (var i in articles) {
          let time = articles[i].articleCreateTime.time
          let year = new Date(time).getFullYear()
          if (year == years[y]) {
            articlesInOneYear.push(articles[i])
          }
        }
        //文章按时间降序排列
        articlesInOneYear.sort((a, b) => b.articleCreateTime.time - a.articleCreateTime.time)
        sortedArticles[years[y]] = articlesInOneYear
        articlesInOneYear = []
      }
      return sortedArticles
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
}
</script>

<style scoped>
.my-el-pagination {
  text-align: center;
  margin: 10px;
}
.timeline-year-class {
  font-size: 22px;
}
.timeline-year-class /deep/ .el-timeline-item__node--normal {
  left: -5px;
  width: 20px;
  height: 20px;
}
.timeline-year-class /deep/ .iconfont {
  font-size: 12px !important;
}
</style>
