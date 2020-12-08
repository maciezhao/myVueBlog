<template>
<div>
<el-row :gutter="20">
  <el-col :span="24"><div class="grid-content bg-purple-dark"></div></el-col>
</el-row>
<el-row>
  <el-col :span="12"><div class="grid-content bg-purple"></div></el-col>
  <el-col :span="12"><div class="grid-content bg-purple-light"></div></el-col>
</el-row>
<el-row :gutter="20">
  <el-col :span="8"><div class="grid-content bg-purple"></div></el-col>
  <el-col :span="8"><div class="grid-content bg-purple-light"></div></el-col>
  <el-col :span="8"><div class="grid-content bg-purple"></div></el-col>
  <el-col :span="8"><div class="grid-content bg-purple"></div></el-col>
  <el-col :span="8"><div class="grid-content bg-purple"></div></el-col>
</el-row>
<el-row>
  <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
  <el-col :span="6"><div class="grid-content bg-purple-light"></div></el-col>
  <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
  <el-col :span="6"><div class="grid-content bg-purple-light"></div></el-col>
</el-row>
<el-row type='flex' justify="center">
  <el-button type="primary">fabu</el-button>
</el-row>

<el-form :rules="rules" :model="aform">
  <el-form-item label="" prop="input">
    <el-input v-model="aform.input" placeholder=""></el-input>
  </el-form-item>
</el-form>
<div > yoyoyo
  <vue-word-cloud
    class="my-tag"
    :words="words"
    :animation-overlap="3"
    :font-size-ratio="3"
    rotation-unit="deg"
    :rotation="0"
    :spacing="0.618"
    :color="([, weight]) => weight > 20 ? 'rgb(255, 78, 105)': weight > 15 ? 'rgb(49, 165, 13)' : weight > 10 ? 'rgb(255, 208, 119)' : weight > 5 ? 'rgb(58, 158, 234)' : weight === 0 ? '#909399' :'rgb(59, 196, 199)'"
    font-family="Roboto"
  >
  <template slot-scope="{text, weight, word}">
    <div :title="weight" style="cursor: pointer;" @click="onWordClick(word)">
      {{ text }}
    </div>
  </template>
</vue-word-cloud>
</div>
<div class="space">
<a>fjkd</a>
<a>fjkd</a>
<a>fjkd</a>
<a>fjkd</a>
</div>
<!-- <el-button>fjkd</el-button>
<el-button>fjkd</el-button>
<el-button>fjkd</el-button> -->
<el-divider/>
<div class="main-class">
<div class="middle-class"><el-card class="article-class"/><el-card class="article-class"/><el-card class="article-class"/></div>
<div class="right-class"><el-card class="article-class"/><el-card class="article-class"/><el-card class="article-class"/></div>

<!-- <div class="middle-class" style="background:yellow">yellow</div> -->
<!-- <div class="right-class" style="background:red">{{red}}</div> -->
<!-- <div class="right-class"><p style="display:block">封装一个流水号ID生成器：id-spring-boot-starter,封装一个流水号ID生成器：id-spring</p></div> -->

</div>
</div>

</template>

<script>
import VueWordCloud from 'vuewordcloud'; 
export default {
    components: {
    'vue-word-cloud': VueWordCloud,
    },
  data() {
    return {
      words:[['romance', 19], ['horror', 3], ['fantasy', 7], ['adventure', 3]],
      input:'',
      red:!!1,
      aform: {
        input: '',
      },
      rules: {
        input: [
          {required: true, message: '标题不能为空', trigger: 'blur'},
        ],
      },
    };
  },
}
</script>

<style lang="scss" scoped>
// .middle-class {
//   display: inline-block;
//   float: left;
//   width: auto;
//   height: 100%;
//   // min-width: 300px;
// }
// .right-class {
//   display: inline-block;
//   float: left;
//     width: auto;
//   height: 100%;
//   // min-width: 200px;
//   vertical-align: top;
// }
// .main-class {
//   width: 800px;
//   height: 100%;
// }
.el-card {
    height: 200px;
  margin:20px 0;
  width: 100%;
}
.middle-class {
  display: inline-flex;
  flex:1 1 auto;
    flex-direction: column;
  width: 50%;
  min-width: 300px;
  height: 100%;
  padding:20px;
}
.right-class {
  display: inline-flex;
  flex:1 1 auto;
    flex-direction: column;
  width: auto;
  min-width: 200px;
  height: 100%;
  padding:20px;
}
.main-class {
  padding:20px;
  display: flex;
  flex-wrap: wrap;

}
/* .article-class {
  height: 200px;
  margin:20px 0;
  width:100%;
} */
.el-card1 {
    height: 200px;
  margin:20px 0;
  width: 100%;
}

.space a {
    display: inline-block;
    padding: .5em 1em;
    background-color: #cad5eb;
}
  .my-tag {
    //position: inherit !important;
    height: 200px !important;
    width: 300px !important;
  }

  .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    margin-top: 20px;
    min-width: 100px;
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>