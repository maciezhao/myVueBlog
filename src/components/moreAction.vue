<template>
  <!-- <el-popover
    popper-class="more-action-popover"
    placement="bottom-start"
    style="min-width:30px; text-align:center"
    trigger="click">
      <el-button type="text" @click="editArticle(articleId)">编 辑</el-button><br/>
      <el-button type="text" @click="deleteArticle(articleId)">删 除</el-button>
    <el-button style="float: right; padding: 3px 0; font-size:20px" type="text" slot="reference">...</el-button>
  </el-popover> -->
  <el-dropdown trigger="click" v-if="authCheck">
    <el-button type="text" class="el-dropdown-link" style="font-size: 20px; padding: 0; margin-right: 15px">...</el-button>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item><el-button type="text" @click="editArticle(articleId)">编 辑</el-button></el-dropdown-item>
      <el-dropdown-item><el-button type="text" @click="deleteArticle(articleId)">删 除</el-button></el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
import { deleteArticle } from '@/api/article'
export default {
  props: {
    articleId: Number,
    articleAuthor: String,
  },
    inject: ['reload'],
  data() {
    return {
    }
  },
  computed: {
    authCheck() {
      return this.$store.state.user.token && this.$store.state.user.name === this.articleAuthor
    }
  },
  methods: {
    editArticle(articleId) {
      this.$router.push({ name: 'editArticle', params: { articleId: articleId } })
    },

    deleteArticle(articleId) {
      this.$confirm('此操作将永久删除该博客, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteArticle(articleId).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!',
            duration: 1000,
          });
          this.$router.push({ path: '/' })
          this.reload()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除',
          duration: 1000,
        });
      })
    },


  },
}
</script>

<style lang="scss">
.more-action-popover {
  min-width: 30px;
  text-align: center;
}
</style>