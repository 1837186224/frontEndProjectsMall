<template>
  <!-- 详情页 -->
  <div id="detail">
    <detail-nav-bar class="detail-nav-bar" @titleclick="titleClick" ref="nav">
      <!-- <div slot="center">商品 参数 评论 推荐</div> -->
    </detail-nav-bar>

    <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll">
      <!-- 轮播图 -->
      <detail-swiper :top-images="topImages"></detail-swiper>
      <!-- 商品基本信息 -->
      <detail-base-info :goods="goods"></detail-base-info>
      <!-- 商店信息 -->
      <detail-shop-info :shop="shop"></detail-shop-info>
      <!-- 商品信息 -->
      <detail-goods-info :detail-info="detailInfo" @imageload="imageLoad"></detail-goods-info>
      <!-- 参数信息 -->
      <detail-param-info :param-info="paramInfo" ref="params"></detail-param-info>
      <!-- 评论 -->
      <detail-comment-info :comment-info="commentInfo" ref="comment"></detail-comment-info>
      <Goods-list :goods="recommends" ref="recommend"></Goods-list>
    </scroll>

    <!-- 底部导航栏 -->
    <detail-bottom-bar @addCart="addToCart"></detail-bottom-bar>
    <!-- 到顶部 -->
    <!-- .native 监听组件根元素的原生事件 
    组件默认不生效 需要用.native修饰符-->
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
    <!-- <toast message='123123'></toast> -->
  </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar'
import DetailSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShopInfo from './childComps/DetailShopInfo'
import DetailGoodsInfo from './childComps/DetailGoodsInfo'
import DetailParamInfo from './childComps/DetailParamInfo'
import DetailCommentInfo from './childComps/DetailCommentInfo'
import DetailBottomBar from './childComps/DetailBottomBar'
import BackTop from 'components/content/backTop/backTop.vue'

// 引用 better-scroll 滚动插件
import Scroll from 'components/common/scroll/Scroll'
// 引用GoodsList  用于 推荐 数据 展示
import GoodsList from 'components/content/goods/GoodsList.vue'
// \src\network\detail.js  详情相关页面请求后端数据
import {
  getDetail,
  Goods,
  Shop,
  GoodsParam,
  getRecommend,
} from 'network/detail.js'
import { debounce } from 'common/utils'

// mixin 混入
import { itemListenerMixin } from 'common/mixin'


// import Toast from 'components/common/toast/Toast.vue'

export default {
  name: 'Detail',
  mixins: [itemListenerMixin],
  data () {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      thenmeTopYs: [],
      getThemeTopY: null,
      currentIndex: 0,
      isShowBackTop: false,
    }
  },
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailBottomBar,

    Scroll,
    GoodsList,
    BackTop,
    // Toast

  },
  created () {
    // 1获取商品id
    this.iid = this.$route.params.id
    // 2根据iid请求详情数据
    getDetail(this.iid).then((res) => {
      // console.log(res)
      // 1.获取顶部的图片 轮播数据
      const data = res.result
      this.topImages = data.itemInfo.topImages

      // 2.获取商品信息
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      )

      // 3.创建店铺信息的对象
      this.shop = new Shop(data.shopInfo)

      // 4.保存商品的详情数据
      this.detailInfo = data.detailInfo
      // 5 获取参数的信息
      this.paramInfo = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      )
      // 6.获取评论的信息
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0]
      }
    })
    // 3请求推荐数据
    getRecommend().then((res) => {
      // console.log(res)
      this.recommends = res.data.list
    })
    // 4给getThemeTopY 赋值 (防抖操作debounce)
    this.getThemeTopY = debounce(() => {
      this.thenmeTopYs = []
      this.thenmeTopYs.push(0)
      this.thenmeTopYs.push(this.$refs.params.$el.offsetTop)
      this.thenmeTopYs.push(this.$refs.comment.$el.offsetTop)
      this.thenmeTopYs.push(this.$refs.recommend.$el.offsetTop)
      // console.log(this.thenmeTopYs)
    }, 100)
  },
  mounted () {
    // console.log('mounted')
  },
  methods: {
    imageLoad () {
      // this.$refs.scroll.refresh()
      this.refresh()
      this.getThemeTopY()
    },
    // 点击标题，滚动到对应的主题
    titleClick (index) {
      // console.log(index)
      // console.log(this.$refs.params.$el.offsetTop)
      this.$refs.scroll.scrollTo(0, -this.thenmeTopYs[index], 200)
    },
    contentScroll (position) {
      // console.log(position)
      // 1 获取Y值
      const positionY = -position.y
      // 2 positionY和主题中的值进行对比 thenmeTopYs: [],
      //thenmeTopYs值== [0, 11244, 11837, 12050]
      // positionY 在 0 和 11244 之间，index=0
      // positionY 在 11244 和 11837 之间，index=1
      // positionY 在 11837 和 12050 之间，index=2

      // positionY 在 12050 之后，index=3
      let lengthY = this.thenmeTopYs.length
      for (let i = 0; i < lengthY; i++) {
        if (
          this.currentIndex !== i &&
          ((i < lengthY - 1 &&
            positionY >= this.thenmeTopYs[i] &&
            positionY < this.thenmeTopYs[i + 1]) ||
            (i === lengthY - 1 && positionY >= this.thenmeTopYs[i]))
        ) {
          this.currentIndex = i
          // console.log(this.currentIndex)
          this.$refs.nav.currentIndex = this.currentIndex
        }
      }
      // 判断BackTop是否显示，回到顶部的小图标
      this.isShowBackTop = position.y < -1000
    },
    // 点击回到顶部
    backClick () {
      // console.log('backClick')
      this.$refs.scroll.scrollTo(0, 0)
    },
    // 添加到购物车
    addToCart () {
      // 1 获取购物车需要展示的信息
      const product = {}
      product.image = this.topImages[0]
      product.title = this.goods.title
      product.desc = this.goods.desc
      product.price = this.goods.relaPrice
      product.iid = this.iid

      // 2 将商品添加到购物车里
      // this.$store.commit('addCart', product)
      this.$store.dispatch('addCart', product).then(res => {
        // console.log(res)
        this.$toast.show(res)
      })


      // 3 添加到购物车成功
    },
  },
}
</script>

<style scoped>
#detail {
  height: 100vh;
  position: relative;
  z-index: 1;
  background-color: #fff;
}
.detail-nav-bar {
  position: relative;
  background-color: #fff;
  z-index: 1;
}
.content {
  position: absolute;
  top: 44px;
  bottom: 60px;
  overflow: hidden;
}

.back-top {
  position: fixed;
  right: 10px;
  bottom: 65px;
}
</style>
