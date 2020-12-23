<template>
  <div class="other-blog-info">
    <div class="articleActivitiesClass"><i class="iconfont icon-calendar"></i>&nbsp;{{ articleCreateTime | format }}</div>
    <div class="articleActivitiesClass">
      <i class="iconfont icon-folder"></i>&nbsp;
      <a @click="showCategoryDetail(categoryName)" :underline="false">{{ '&nbsp;' + categoryName }} </a>
    </div>
    <div class="articleActivitiesClass">
      <template v-if="tags.length !== 0">
        <i class="iconfont icon-tags"></i>
        <el-tag v-for="t in tags" :key="t.tagName" @click="showTagDetail(t.tagName)" size="small">{{ t.tagName }}</el-tag>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    articleCreateTime: Number,
    categoryName: String,
    tags: Array,
  },
  methods: {
    showTagDetail(tagName) {
      this.$router.push({ name: 'CategoryOrTag', params: { type: 'tag', id: tagName } })
    },
    showCategoryDetail(categoryName) {
      this.$router.push({ name: 'CategoryOrTag', params: { type: 'category', id: categoryName } })
    },
  }
}
</script>

<style scoped>
.other-blog-info {
  /* padding: 5px 0; */
}
.articleActivitiesClass {
  padding-right: 0 !important;
  font-size: 15px;
  /* font-weight: 400; */
  line-height: 20px;
  margin-right: 15px;
  margin-top: 0px;
  color: #999;
}
div {
  display: inline-block;
}
.el-tag {
  cursor: pointer;
  margin-left: 10px;
  color: #73c9e5;
}
.el-tag:hover {
  color: #fff;
  background: #73c9e5;
  border-color: #73c9e5;
}
/* a:hover {
  color: #2196f3;
} */
</style>