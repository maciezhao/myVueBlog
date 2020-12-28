<template>
  <div class="top-nav">
    <span class="blog-title">{{ blogTitle }}</span>
    <el-menu router :default-active="$route.path" mode="horizontal" :active-text-color="menuActiveText" @select="handleSelect">
      <!-- 顶部导航 -->
      <el-menu-item v-for="(item, i) in navList" :key="i" :index="item.name">
        {{ item.navItem }}
      </el-menu-item>
    </el-menu>
    <div class="nav-right">
      <el-button type="primary" size="medium" style="margin: 0 10px" @click="editArticle"><i class="el-icon-edit"></i>写文章</el-button>
      <template v-if="userInfo.login">
        <el-dropdown trigger="click" style="padding: 0 10px">
          <span class="el-dropdown-link" :title="userInfo.name">
            <img v-if="!userInfo.avatar" class="user-img" src="@/assets/user.jpg" alt="Macie Avatar" />
            <img v-if="userInfo.avatar" class="user-img" :src="userInfo.avatar" alt="Macie Avatar" />
            <i class="el-icon-arrow-down el-icon--right"></i
          ></span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item><router-link to="/settings">设 置</router-link></el-dropdown-item>
            <el-dropdown-item @click.native.prevent="handleLogout">登 出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </template>
      <div v-else>
        <!-- <router-link to="/login"> -->
        <el-button size="small" @click.native.prevent="openDialog" type="primary">登录</el-button>
        <login />
        <!-- </router-link> -->
        <!-- <router-link to="/register"> -->
        <el-button size="small" type="danger">注册</el-button>
        <!-- </router-link> -->
      </div>
    </div>
  </div>
</template>

<script>
import { menuActiveText } from "@/styles/variables.scss";
import login from '@/components/login'

export default {
  name: 'topNav',
  components: {
    login,
  },
  data() {
    return {
      defaultActiveIndex: '',
      blogTitle: 'Macie\'s Blog',
      navList: [
        { name: '/home', navItem: '主页' },
        { name: '/archive', navItem: '归档' },
        { name: '/category', navItem: '分类' },
        { name: '/about', navItem: '关于' },
      ],
      menuActiveText: menuActiveText,
    }
  },
  computed: {
    userInfo: function () {
      let login = false
      if (this.$store.state.user.token) {
        login = true
      }
      let avatar = this.$store.state.user.avatar
      let name = this.$store.state.user.name
      return { login, avatar, name }
    }
  },
  methods: {
    handleSelect(key, keyPath) {
      this.defaultActiveIndex = key
    },
    handleLogout() {
      this.$confirm('确认退出？', {}).then(() => {
        this.$store.dispatch('user/logout', this.loginForm).then(() => {

        }).catch((error) => {
          this.message.error({ message: error, type: 'error', showClose: true })
        })
      })

    },
    openDialog() {
      let that = this
      that.$store.dispatch('app/toggleLoginDialog')
    },
    editArticle() {
      if (!this.$store.state.user.token) {
        this.$store.dispatch('app/toggleLoginDialog').then(() => {
        })
      }
      else {
        this.$router.push('/editArticle')
      }
    }
  },
}

</script>


<style lang="scss" scoped>
@import '~@/styles/variables.scss';

.top-nav {
  display: -webkit-flex; /* Safari */
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;

  .el-menu.el-menu--horizontal {
    display: inline-flex;
    border: none;
    flex-wrap: nowrap;
    margin: 0 10px;
    line-height: $menuLineHeight;
  }

  .blog-title {
    display: inline-flex;
    flex-wrap: nowrap;
    font-size: 21px;
    font-weight: 600;
    margin: 0 $menuLineHeight/2;
    line-height: $menuLineHeight;
  }

  .nav-right {
    display: inline-flex;
    margin-left: auto;
    justify-content: flex-end;
    align-items: center;
    flex-wrap: nowrap;
    padding: 0 10px;
    line-height: $menuLineHeight;
  }
}

.user-img {
  width: 40px;
  height: 40px;
  // border: 1px solid #ddd;
  border-radius: 50%;
  vertical-align: middle;
  cursor: pointer;
}

.el-menu-item {
  border-bottom-color: #ffffff !important; /* 去掉顶部导航下划线 */
  font-size: 16px;
}

.el-menu-item:not(.is-disabled):hover {
  color: $menuHoverText;
}
</style>

