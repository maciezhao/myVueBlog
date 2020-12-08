<template>
<div>
    <el-row :gutter="20">
    
    <template v-for="category in categories">
      <el-col :span="6" :key="category.categoryId">
    <router-link :to="{name:'CategoryOrTag',params:{type:'category', id:category.categoryName}}" >
        <el-card class="box-card">
          <h1>{{category.categoryName}}</h1>
      </el-card>
    </router-link>
    </el-col>
    </template>
  </el-row>
</div>
</template>

<script>
import {getAllCategories} from '@/api/article'
export default {
  data() {
    return {
      categories:null,
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
      })
    }
  },
}
</script>

<style lang="scss" scoped>
.el-main {
  color: #333;
  text-align: justify;
  /* line-height: 60px; */
  // max-width: 730px;
  /* margin:0 auto; 垂直居中，必须与width搭配使用 */
}
  .el-row {
    
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    min-width: 200px;
    margin:20px;
    border-radius: 4px;
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
   min-height: 200px;
  border-radius: 8px;
  margin-top: 15px;
}
</style>