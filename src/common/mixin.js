import {
  debounce
} from 'common/utils'

export const itemListenerMixin = {
  data() {
    return {
      itemImgListener: null,
      refresh: null,
    }
  },
  mounted() {
    // 防抖函数
    this.refresh = debounce(this.$refs.scroll.refresh, 500)
    // 监听item中图片加载完成
    this.itemImgListener = () => {
      this.refresh()
    }
    this.$bus.$on('itemImageLoad', this.itemImgListener)
    // console.log('混入内容')

  }
}