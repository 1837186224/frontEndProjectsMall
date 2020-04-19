<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
// 封装滚动插件 BScroll
export default {
  name: 'Scroll',
  props: {
    probeType: {
      type: Number,
      default: 0
    },
    // 上拉事件参数
    pullUpLoad: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      scroll: null
    }
  },
  component: {
    BScroll
  },
  mounted() {
    // 封装  BScroll
    // this.scroll = new.BScroll(document.querySelector('.wrapper'))   不是最理想的方法
    this.scroll = new BScroll(this.$refs.wrapper, {
      click: true,
      // 滚动的位置 0 1 2 3
      probeType: this.probeType,
      // 做上拉加载功能
      pullUpLoad: this.pullUpLoad
    })

    // 监听滚动位置
    if (this.probeType === 2 || this.probeType === 3) {
      this.scroll.on('scroll', position => {
        // console.log(position)
        // 自定义事件
        // 1、父组件可以使用 props 把数据传给子组件 写子上。
        // 2、子组件可以使用 $emit 触发父组件的自定义事件。
        this.$emit('scroll', position)
      })
    }
    // 监听上拉事件
    //  pullimgUp 触发时机：在一次上拉加载的动作后，这个时机一般用来去后端请求数据。
    if (this.pullUpLoad) {
      this.scroll.on('pullingUp', () => {
        // console.log('上拉加载更多')
        // 传出去，让调用者确定是否使用这个事件
        this.$emit('pullingUp')
      })
    }
  },
  methods: {
    // 移动位置
    scrollTo(x, y, time = 1000) {
      this.scroll && this.scroll.scrollTo(x, y, time)
    },
    finishPullUp() {
      this.scroll && this.scroll.finishPullUp()
    },
    refresh() {
      this.scroll.refresh()
    }
  }
}
</script>
<style scoped></style>
