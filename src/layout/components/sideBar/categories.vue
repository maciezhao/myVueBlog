<template>
  <el-card>
    <div class="card-item">
      <span style="font-weight:800">分类</span>
    </div>
    <div v-for="category in categories" :key="category.categoryId">
    <router-link :to="{name:'CategoryOrTag',params:{type:'category', id:category.categoryName}}" >
          <i class="iconfont icon-folder"/><el-link :underline="false" style="font-size: 16px" class="each-category">{{category.categoryName+" ["+articlesCount[category.categoryName]+"] "}}</el-link>
    </router-link>
    </div>
  </el-card>
</template>

<script>
import {getAllCategories} from '@/api/article'
export default {
  data() {
    return {
      categories:null,
      articlesCount: {},
    }
  },
  created() {
    this.getCategories()
  },
  methods: {
    getCategories() {
      let that = this
      getAllCategories().then(response => {
        that.categories = response.categories
        that.articlesCount = response.articlesCount
      })
    }
  },
}
</script>

<style lang="scss" scoped>
.each-category {
  margin:5px;
}
</style>