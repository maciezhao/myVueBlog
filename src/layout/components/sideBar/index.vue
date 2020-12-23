<template>
  <el-scrollbar wrap-class="scrollbar-wrapper">
    <myCard />
    <tags />
    <categories />
  </el-scrollbar>
</template>

<script>
import categories from './categories'
import myCard from './myCard'
import tags from './tags'
export default {
  name: 'sideBar',
  components: {
    myCard,
    tags,
    categories,
  }
}
</script>

<style lang="scss" scope>
</style>