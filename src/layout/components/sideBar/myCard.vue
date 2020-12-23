<template>
  <el-card style="text-align: center">
    <div class="site-base-info">
      <a href="#/about" title="Macie">
        <img class="logo" src="@/assets/me.jpeg" alt="Macie" />
      </a>
      <div class="site-author-name card-item">
        <el-link href="#/about" title="Macie" :underline="false" style="font-size: 20px; font-weight: 200">{{ cardInfo.userName }}</el-link>
      </div>
      <div class="site-desc card-item">{{ cardInfo.desc }}</div>
      <div class="site-location card-item">
        <i class="iconfont icon-location" />
        <span>{{ cardInfo.location }}</span>
      </div>
    </div>
    <el-divider />
    <div class="site-article-info">
      <div class="site-article-info-item">
        {{ AllCount.articlesTotalCount }}<br />
        <span>文章</span>
      </div>
      <div class="site-article-info-item">
        {{ AllCount.tagsTotalCount }}<br />
        <span>标签</span>
      </div>
      <div class="site-article-info-item">
        {{ AllCount.categoriesTotalCount }}<br />
        <span>分类</span>
      </div>
    </div>
    <el-divider />
    <div class="author-links">
      <a class="author-link iconfont icon-github" style="color: #666" :href="github.link" :title="github.title" target="_blank"></a>
      <a class="author-link iconfont icon-csdn" style="color: #ce0a10" :href="csdn.link" :title="csdn.title" target="_blank"></a>
      <a class="author-link iconfont icon-douban" style="color: #4fa873" :href="douban.link" :title="douban.title" target="_blank"></a>
      <a class="author-link iconfont icon-juejin" style="color: #006ce2" :href="juejin.link" :title="juejin.title" target="_blank"></a>
      <a class="author-link iconfont icon-mail" style="color: #f59324" :href="email.link" :title="email.title"></a>
    </div>
  </el-card>
</template>

<script>
import { getAllCount } from '@/api/article'

export default {
  name: 'myCard',
  data() {
    return {
      AllCount: {
        articlesTotalCount: Number,
        tagsTotalCount: Number,
        categoriesTotalCount: Number,
      },
      cardInfo: {
        userName: 'Macie',
        desc: '初级java开发攻城狮😜',
        location: '深圳',
      },
      github: {
        title: 'Github',
        link: 'https://github.com/rainie19'
      },
      csdn: {
        title: 'CSDN',
        // link: 'https://www.zhihu.com/people/imoyao'
      },
      douban: {
        title: 'Douban',
        // link: 'https://www.douban.com/people/rainie19'
      },
      juejin: {
        title: 'Juejin',
        // link: 'https://juejin.cn/user/3254175517649629'
      },
      email: {
        title: 'Email',
        link: 'mailto:macie.zhao@outlook.com'
      }
    }
  },
  created() {
    this.getBlogOverview()
  },
  methods: {
    getBlogOverview() {
      let that = this
      getAllCount().then(response => {
        that.AllCount = response.AllCount
      })
    },

  }

}
</script>

<style scoped>
.logo {
  height: 100px;
  margin-bottom: 10px;
  border-radius: 50%;
  padding: 4px;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  transition: 0.4s;
}
.logo:hover {
  box-shadow: 0 0 30px #caeefb;
}
.site-author-name {
  color: #00A1D6;
}
.site-desc {
  color: #999;
}
.el-divider {
  background: #dcdfe6;
  /* height: .02rem; */
  margin: 20px 0;
  border-bottom: 0;
}
.site-article-info {
  border-bottom: none;
}
.site-article-info-item {
  display: inline-block;
  width: 33%;
  text-align: center;
  padding: 5px;
  font-size: 20px;
}
.site-article-info-item span {
  font-size: 16px;
}
.el-tag {
  margin: 5px;
  /* // border-radius: 15px; */
}
.author-links {
  /* color:#0088CC; */
  /* padding: 10px; */
}
.author-link {
  display: inline-block;
  padding: 0;
  width: 2.7rem;
  line-height: 2.7rem;
  border-radius: 50%;
  font-size: 25px;
  transition: 0.3s;
}
.author-link:hover {
  background-color: rgba(0, 161, 214, 0.1);
}
</style>