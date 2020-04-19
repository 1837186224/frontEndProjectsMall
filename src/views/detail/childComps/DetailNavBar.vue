<template>
  <!-- 导航 -->
  <div id="detailnavbar">
    <nav-bar>
      <div slot="left" @click="backClick">
        <img src="~assets/img/common/back.svg" alt="" class="title-img" />
      </div>
      <div slot="center" class="title">
        <div
          v-for="(item, index) in titles"
          :key="index"
          class="title-item"
          :class="{ active: index === currentIndex }"
          @click="titleClick(index)"
        >
          {{ item }}
        </div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar.vue'

export default {
  name: 'DetailNavBar',
  data() {
    return {
      titles: ['商品', '参数', '评论', '推荐'],
      currentIndex: 0
    }
  },
  components: {
    NavBar
  },
  methods: {
    titleClick(index) {
      this.currentIndex = index
      this.$emit('titleclick', index)
    },
    backClick() {
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped>
.title-img {
  position: relative;
  top: 0;
  left: 20px;
  width: 11px;
  height: 11px;
}
.title {
  display: flex;
  font-size: 12px;
  color: var(--color-text);
}
.title-item {
  flex: 1;
}
.active {
  color: var(--color-tint);
}
</style>
