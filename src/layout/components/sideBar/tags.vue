<template>
  <el-card>
    <div class="card-item">
      <span style="font-weight:800">标签云</span>
    </div>
    <div class="each-tag" v-for="t in tags" :key="t.tagName">
      <a @click="showTagDetail(t.tagName)" :style="{ color: t.color, 'font-size': t.fontSize }">{{t.tagName }}</a>
    </div>
  </el-card>
</template>

<script>
import { getAllTags } from '@/api/article'

export default {
  data() {
    return {
      tags: [],
      words: [],
    }
  },
  created() {
    this.getTags()
  },
  methods: {
    getTags() {
      let that = this
      getAllTags().then(response => {
        //that.tags = response.tags
        //that.words = response.tags.map(tag=>tag.tagName)
        let tagObjs = response.tags
        for (let tag in tagObjs) {
          let tagItem = {}
          tagItem['tagName'] = tagObjs[tag].tagName
          let weight = tagObjs[tag].tagCount
          tagItem['fontSize'] = weight > 20 ? '25px' : weight > 10 ? '22px' : weight > 5 ? '19px' : weight > 2 ? '16px' : weight === 0 ? '0' : '13px'
          tagItem['color'] = weight > 20 ? '#0078e7' : weight > 10 ? '#2680d4' : weight > 5 ? '#4d89c0' : weight > 2 ? '#668eb3' : weight === 0 ? '#909399' : '#999'
          that.tags.push(tagItem)
        }
        that.tags.sort((a, b) => (a.tagName.toLowerCase() > b.tagName.toLowerCase()) ? 1 : -1)
      }).catch(() => {
        that.$message.error({ message: '标签加载失败', showClose: true })
      })
    },
    showTagDetail(tagName) {
      this.$router.push({ name: 'CategoryOrTag', params: { type: 'tag', name: tagName } })
    },
  }
}
</script>

<style lang="scss" scoped>
.each-tag {
  display: inline-block;
  margin: 5px;
  // border-radius: 15px;
}
</style>