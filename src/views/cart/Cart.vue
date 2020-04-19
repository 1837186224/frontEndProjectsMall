<template>
  <!-- <h2>购物车 研发中...</h2> -->
  <!-- 导航 -->
  <div class="Cart">
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{ length }})</div>
    </nav-bar>
    <!-- 商品列表 -->
    <cart-list class="cart-list"></cart-list>

    <!-- 底部bottom -->
    <cart-bottom-bar class="cart-bottom-bar"></cart-bottom-bar>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import CartList from './childComps/CartList'
import CartBottomBar from './childComps/CartBottomBar'

// vuex的Getter 用法
import { mapGetters } from 'vuex'

export default {
  name: 'Cart',
  components: {
    NavBar,
    CartList,
    CartBottomBar,
  },
  computed: {
    // 计算属性抽离
    ...mapGetters({
      length: 'cartLength',
      // list: 'cartList',
    }),
  },
}
</script>

<style scoped>
.Cart {
  position: relative;
  height: 100vh;
}
.nav-bar {
  position: absolute;
  top: 0;
  /* bottom: 49px; */
  left: 0;
  right: 0;
  overflow: hidden;
  height: 44px;
  background-color: var(--color-tint);
  color: #fff;
}
.cart-list {
  position: absolute;
  top: 44px;
  bottom: 96px;
  width: 100%;
  overflow: hidden;
}
.cart-bottom-bar {
  position: absolute;
  bottom: 48px;
  left: 0;
  right: 0;
  height: 48px;
  overflow: hidden;
}
</style>
