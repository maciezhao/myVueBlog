<template>
  <el-main v-loading="listLoading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading">
    <h1>{{this.$route.params.id}}</h1>
    <el-divider></el-divider>
      <el-card class="box-card" v-for="article in articles" :key="article.articleId">
        <div class="item">
          
            <el-link style="font-weight: 600;font-size:20px" @click="viewArticleDetail(article.articleId, article.articleSlug)">{{ article.articleTitle }}</el-link>
          <more-action :articleId="article.articleId" :articleAuthor="article.articleAuthor" style="float:right"/>
        </div>
        <div class=" item">
           <other-blog-info 
           :articleCreateTime="article.articleCreateTime.time" 
           :categoryName="article.categoryName"
           :tags="articleIdTagsMap[article.articleId]">
           </other-blog-info>
        </div>
        <div class="text item">
          {{article.articleSummary}}
        </div>
        <el-divider></el-divider>
        <div>
          <span class="articleActivitiesClass"> <i class="el-icon-view"></i>{{ "&nbsp;" + article.articleViewCount }} </span>
          <span class="articleActivitiesClass"><i class="el-icon-s-comment"></i>{{ "&nbsp;" + article.articleCommentsCount}} </span>
        </div>
      </el-card>
            <div class="block my-el-pagination">
            <el-pagination @size-change="handleSizeChange" 
                           @current-change="handleCurrentChange" 
                           :current-page="currentPage" 
                           :total="totalCount"
                           hide-on-single-page
                           prev-text="上一页"
                           next-text="下一页"
                           :page-size="pageSize" layout="total, prev, pager, next" >
              </el-pagination>
      </div>
  </el-main>
</template>

<script>
import {getArticlesInfo} from '@/api/article'
import moreAction from '@/components/moreAction'
import otherBlogInfo from '@/components/otherBlogInfo'
export default {
  data() {
    return {
      listLoading: false,
      articles:null,
      articleIdTagsMap:null,
      pageSize:2,
      currentPage:1,
      // 总条数，根据接口获取数据长度(注意：这里不能为空)
      totalCount:1,
    }
  },
    components: {
    'other-blog-info':otherBlogInfo,
    moreAction,
  },
    created() {
    this.getArticles(this.pageSize, this.currentPage)
  },
  methods: {
    viewArticleDetail(id, slug) {
      this.$router.push({name: 'articleDetail', params:{articleId:id,slug:slug}})
    },
    getArticles(pageSize, pageNumber) {
      let that = this
      that.listLoading = true
      let queryData = {
        queryType:that.$route.params.type,
        [that.$route.params.type]:that.$route.params.id,
        queryPage:pageNumber,
        pageSize:pageSize,
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
        this.PageSize=val
        this.getArticles(val,1)
        this.currentPage=1  
    },
    handleCurrentChange(val) {
        this.currentPage=val
        this.getArticles(this.pageSize, val)
    },
  },
}
</script>

<style lang="scss" scoped>
.el-main {
  color: #333;
  text-align: justify;
  /* line-height: 60px; */
  max-width: 730px;
  /* margin:0 auto; 垂直居中，必须与width搭配使用 */
}
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}
.box-card {
  width: 100%;
  border-radius: 8px;
  margin-top: 15px;
}
.articleActivitiesClass {
  padding-right: 0 !important;
  font-size: 16px;
  font-weight: 400;
  line-height: 20px;
  margin-right: 15px;
  margin-top:15px;
  color:#a6a6a6;
}

.el-tag {
  margin-right:10px;
}
.my-el-pagination {
  text-align: center;
  margin:10px;
}
</style>


