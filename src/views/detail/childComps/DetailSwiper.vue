<template>
  <!-- 轮播图 -->
  <!-- swiper类名会冲突 -->
  <div>
    <swiper class="detail-swiper">
      <swiper-item v-for="item in topImages" :key="item">
        <img :src="item" alt="" class="detail-swiper-item">
      </swiper-item>
    </swiper>
  </div>

</template>

<script>
// 导入轮播图插件
import { Swiper, SwiperItem } from 'components/common/swiper'

export default {
  name: "DetailSwiper",
  components: {
    Swiper,
    SwiperItem,
  },
  props: {
    topImages: {
      type: Array,
      default () {
        return []
      }
    }
  }
}
</script>


<style scoped>
.detail-swiper {
  height: 300px;
  overflow: hidden;
}
.detail-swiper-item {
  /* height: 300px; */
}
</style>