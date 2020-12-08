<template>
  <el-container v-if="isRouterAlive" :class="classObj" class="app-wrapper">
    <el-aside class="sidebar-container">
      <side-bar />
    </el-aside>
    <el-container class="main-container">
      <el-header style="height: auto">
        <i class="sidebar-btn icon-btn iconfont icon-bars" @click="toggleSideBar"/>
        <top-nav />
      </el-header>
      <el-main>
        <div v-if="device === 'mobile' && sidebar.opened" class="drawer-bg" @click="handleClickOutside" />
        <div>
          <router-view :key="key" />
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import topNav from './components/topNav'
import sideBar from './components/sideBar/index'
import ResizeMixin from './mixin/ResizeHandler'

export default {
  name: 'Layout',
  components: {
    'top-nav': topNav,
    'side-bar': sideBar,
  },
  mixins: [ResizeMixin],
  provide() {
    return {
      reload: this.reload
    }
  },
  data() {
    return {
      isRouterAlive: true,
    }
  },
  computed: {
    key() {
      return this.$route.path
    },
    sidebar() {
      return this.$store.state.app.sidebar
    },
    device() {
      return this.$store.state.app.device
    },
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    }
  },
  methods: {
    handleClickOutside() {
      this.$store.dispatch('app/closeSideBar', { withoutAnimation: false })
    },
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    reload() {
      // 通过v-if值改变来重新渲染页面
      this.isRouterAlive = false
      this.$nextTick(function () {
        this.isRouterAlive = true
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/styles/element-variables.scss';
@import '~@/styles/variables.scss';

.sidebar-btn {
    position: fixed;
    left: 0;
    top: 0;
    color: #00A1D6;
    margin: 10px;
    z-index: 100;
}
.icon-btn {
    width: 40px;
    line-height: 40px;
    font-size: 27px;
    text-align: center;
    border: none;
    cursor: pointer;

    transition: 0.3s;
}
.icon-btn:hover {
  text-shadow: 0 0 20px;
}

.el-header {
  // padding: auto 40px;
  -webkit-box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}
// .app-wrapper {
//   // @include clearfix;
//   // position: relative;
//   // height: 100%;
//   // width: 100%;
//   &.mobile.openSidebar{
//     position: fixed;
//     top: 0;
//   }
// }
.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: fixed;
  z-index: 999;
}
</style>
