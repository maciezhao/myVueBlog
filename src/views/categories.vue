<template>
  <div class="category-class" v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading">
    <h1 style="text-align: center"><i class="icon-class iconfont icon-folder" /> 分类</h1>
    <div v-for="category in categories" :key="category.categoryId">
      <router-link :to="{ name: 'CategoryOrTag', params: { type: 'category', name: category.categoryName } }">
        <i class="iconfont icon-folder-open" /><el-link :underline="false" style="font-size: 16px" class="category-link">{{
          category.categoryName + ' [' + articlesCount[category.categoryName] + '] '
        }}</el-link>
      </router-link>
    </div>
  </div>
</template>

<script>
import { getAllCategories } from '@/api/article'
export default {
  data() {
    return {
      categories: null,
      articlesCount: {},
      loading: false,
    }
  },
  created() {
    this.getCategories()
  },
  methods: {
    getCategories() {
      let that = this
      that.loading = true
      getAllCategories().then(response => {
        that.categories = response.categories
        that.articlesCount = response.articlesCount
        that.loading = false
      })
    }
  },
}
</script>

<style lang="scss" scoped>
.category-class {
  min-height: 300px;
  padding: 0 50px;
}
.category-link {
  padding: 10px;
}
.icon-class {
  font-size: 30px;
}
</style>