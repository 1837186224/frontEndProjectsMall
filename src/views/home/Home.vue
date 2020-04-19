<template>
  <div id="home">
    <!-- 标题导航 -->
    <nav-bar class="home-nav">
      <div slot="center">W-SHOPPING</div>
    </nav-bar>
    <tab-control :titles="['流行', '新款', '精选']" @itemClick="tabClick" ref="tabControl1" class="tab-control"
      v-show="isTabFixed">
    </tab-control>

    <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll" :pull-up-load="true"
      @pullingUp="loadMore">
      <!-- 轮播图 -->
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>
      <!-- 推荐窗口 -->
      <recommend-View :recommends="recommends"></recommend-View>
      <!-- FeatureView 本周流行-->
      <feature-view></feature-view>
      <tab-control :titles="['流行', '新款', '精选']" @itemClick="tabClick" ref="tabControl2">
      </tab-control>

      <goods-list :goods="showGoods"></goods-list>
    </scroll>
    <!-- 到顶部 -->
    <!-- .native 监听组件根元素的原生事件 
    组件默认不生效 需要用.native修饰符-->
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
import HomeSwiper from './childComps/HomeSwiper'
import RecommendView from './childComps/RecommendView'
import FeatureView from './childComps/FeatureView'

import NavBar from 'components/common/navbar/NavBar.vue'
import TabControl from 'components/content/tabControl/TabControl.vue'
import GoodsList from 'components/content/goods/GoodsList.vue'
import Scroll from 'components/common/scroll/Scroll.vue'
import BackTop from 'components/content/backTop/backTop.vue'

import { getHomeMultidata, getHomeGoods } from 'network/home.js'
// import { debounce } from 'common/utils.js'

// mixin 混入
import { itemListenerMixin } from 'common/mixin'

// import Swiper from 'components/common/swiper/Swiper.vue'
// import SwiperItem from 'components/common/swiper/SwiperItem.vue'

export default {
  name: 'Home',
  // 注册
  components: {
    HomeSwiper,
    RecommendView,
    FeatureView,

    NavBar,
    TabControl,
    GoodsList,
    Scroll,
    BackTop
  },
  mixins: [itemListenerMixin],
  data () {
    return {
      banners: [],
      recommends: [],
      // tab-control 请求商品数据
      // '流行','新款','精选'
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] }
      },
      currentType: 'pop',
      isShowBackTop: false,
      tabOffsetTop: 0,
      isTabFixed: false,
      saveY: 0
    }
  },
  // 计算属性
  computed: {
    showGoods () {
      return this.goods[this.currentType].list
    }
  },
  // 勾子函数  *********还是有问题
  // 进入
  activated () {
    this.$refs.scroll.scrollTo(0, this.saveY, 0)
    this.$refs.scroll.refresh() //刷新
  },
  // 离开
  deactivated () {
    this.saveY = this.$refs.scroll.scroll.y
  },
  // 生命周期函数
  created () {
    //  1 请求多个数据
    this.getHomeMultidata()

    // 2 请求商品数据
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')
  },
  mounted () {
    // // 引用防抖函数
    // const refresh = debounce(this.$refs.scroll.refresh, 500)
    // // 监听item中图片加载完成
    // this.$bus.$on('itemImageLoad', () => {
    //   // this.$refs.scroll.refresh()
    //   // console.log(this.$refs.scroll.refresh)
    //   refresh()
    // })
  },
  // 方法
  methods: {
    /**
     * 事件监听相关放法
     */

    //  防抖函数 迁移到 common/utils.js
    // debounce (func, delay) {
    //   let timer = null
    //   return function (...args) {
    //     if (timer) clearTimeout(timer)
    //     timer = setTimeout(() => {
    //       func.apply(this, args)
    //     }, delay)
    //   }
    // },

    tabClick (index) {
      // console.log(index)
      switch (index) {
        case 0:
          this.currentType = 'pop'
          break
        case 1:
          this.currentType = 'new'
          break
        case 2:
          this.currentType = 'sell'
          break
      }
      // 让两个TabControl的currentIndex保持一致
      this.$refs.tabControl1.currentIndex = index
      this.$refs.tabControl2.currentIndex = index
    },
    // 点击回到顶部
    backClick () {
      // console.log('backClick')
      this.$refs.scroll.scrollTo(0, 0)
    },
    // 调用 Scroll 监听滚动位置
    contentScroll (position) {
      // console.log(position)
      // 判断BackTop是否显示，回到顶部的小图标
      this.isShowBackTop = position.y < -1000
      // 判断tabControl是否吸顶
      this.isTabFixed = -position.y > this.tabOffsetTop
    },
    // / 监听上拉事件
    loadMore () {
      this.getHomeGoods(this.currentType)
    },
    swiperImageLoad () {
      // 赋值 tabControl吸顶效果
      // 拿到轮播图的高度
      // console.log(this.$refs.tabControl2.$el.offsetTop)
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
    },

    /**
     * 网络请求相关方法
     */
    getHomeMultidata () {
      getHomeMultidata().then(res => {
        // console.log(res)
        this.banners = res.data.banner.list
        this.recommends = res.data.recommend.list
      })
    },
    getHomeGoods (type) {
      const page = this.goods[type].page + 1
      getHomeGoods(type, page).then(res => {
        // console.log(res.data.list)
        this.goods[type].list.push(...res.data.list)
        this.goods[type].page += 1
        // finishPullUp 当上拉加载数据加载完毕后，需要调用此方法告诉 better-scroll 数据已加载。
        // this.$refs.scroll.scroll.finishPullUp()    这不美观 Scroll.vue中封装方法
        this.$refs.scroll.finishPullUp()
      })
    }
  }
}
</script>

<style scoped>
.home-nav {
  /* position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10; */
  background-color: var(--color-tint);
  color: var(--color-background);
}
#home {
  position: relative;
  /* vh视口像素 */
  height: 100vh;
  /* padding-top: 44px; */
}
/* .tab-control {
  position: sticky;
  top: 44px;
  z-index: 9;
} */
.content {
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
  overflow: hidden;
}

.tab-control {
  position: relative;
  z-index: 9;
}
</style>
