<template>
  <el-popover placement="bottom" width="300" trigger="click">
    <h4>选择分类</h4>
    <el-select
      v-model="selectValue"
      filterable
      allow-create
      default-first-option
      placeholder="请新建或选择文章分类"
    >
      <el-option
        v-for="item in categories"
        :key="item.value"
        :label="item.address"
        :value="item.value"
      >
      </el-option>
    </el-select>

    <h4>选择标签</h4>

    <el-autocomplete
      class="input-new-tag inline-input"
      :fetch-suggestions="querySearch"
      placeholder="请输入内容"
      v-if="inputVisible"
      v-model="inputValue"
      ref="saveTagInput"
      size="small"
      @keyup.enter.native="handleInputConfirm"
      @blur="handleInputConfirm"
    >
    </el-autocomplete>

    <el-button v-else class="button-new-tag" size="small" @click="showInput"
      >+ New Tag</el-button
    >
    <el-tag
      :key="tag"
      v-for="tag in dynamicTags"
      closable
      :disable-transitions="false"
      @close="handleClose(tag)"
    >
      {{ tag }}
    </el-tag>

    <el-row type="flex" justify="center">
      <el-button type="primary" @click="publishArticle">确定并发布</el-button>
    </el-row>
    <el-button slot="reference" type="primary">发布</el-button>
  </el-popover>
</template>

<script>
export default {
  data() {
    return {
      categories: [
        { value: "三全鲜食", address: "长宁区新渔路144号" },
        { value: "Hot honey", address: "上海市长宁区淞虹路661号" },
      ],
      restaurants: [
        { value: "三全鲜食（北新泾店）", address: "长宁区新渔路144号" },
        {
          value: "Hot honey 首尔炸鸡（仙霞路）",
          address: "上海市长宁区淞虹路661号",
        },
        {
          value: "新旺角茶餐厅",
          address: "上海市普陀区真北路988号创邑金沙谷6号楼113",
        },
      ],

      dynamicTags: ["标签一", "标签二", "标签三"],
      inputVisible: false,
      selectValue: "",
      inputValue: "",
    };
  },
  methods: {
    querySearch(queryString, cb) {
      var restaurants = this.restaurants;
      var results = queryString
        ? restaurants.filter(this.createFilter(queryString))
        : restaurants;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString) {
      return (restaurant) => {
        console.log("1111111");
        return (
          restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) ===
          0
        );
      };
    },
    handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
    },

    showInput() {
      this.inputVisible = true;
      this.$nextTick(() => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    handleInputConfirm() {
      setTimeout(() => {
        let inputValue = this.inputValue;
        if (inputValue) {
          this.dynamicTags.push(inputValue);
        }
        this.inputVisible = false;
        this.inputValue = "";
      }, 400);
    },
    publishArticle() {},
  },
};
</script>

<style scoped>
.el-tag + .el-tag {
  margin-left: 10px;
  margin-bottom: 10px;
}
.button-new-tag {
  margin: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>