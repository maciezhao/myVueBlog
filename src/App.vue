<template>
  <div id="app">
    <layout/>
    <el-backtop target="#app"></el-backtop>
  </div>
</template>

<script>
import layout from '@/layout';
export default {
  name: 'App',
  components: {
    layout,
  }
}
</script>

<style  lang="scss">
#app {
  height: 100vh;
  overflow-x: hidden;
}
.el-backtop {
  z-index: 9999;
}
</style>