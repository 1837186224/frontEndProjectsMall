<template>
  <div class="home-swiper">
    <swiper>
      <swiper-item v-for="item in banners" :key="item.title">
        <a :href="item.link">
          <img :src="item.image" alt="" @load="imageLoad" />
        </a>
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
import { Swiper, SwiperItem } from 'components/common/swiper'
export default {
  name: 'home-swiper',
  props: {
    banners: {
      type: Array,
      default () {
        return []
      },
    },
  },
  data () {
    return {
      isLoad: false
    }
  },
  components: {
    Swiper,
    SwiperItem,
  },
  methods: {
    imageLoad () {
      if (!this.isLoad) {
        this.$emit('swiperImageLoad')
        this.isLoad = true
      }
    }
  }
}
</script>
