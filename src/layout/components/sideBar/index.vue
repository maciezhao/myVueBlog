<template>
  <el-scrollbar wrap-class="scrollbar-wrapper">
    <myCard />
    <tags />
  </el-scrollbar>
</template>

<script>
import myCard from './myCard'
import tags from './tags'
export default {
  name: 'sideBar',
  components: {
    myCard,
    tags,
  }
}
</script>

<style lang="scss" scope>
</style>