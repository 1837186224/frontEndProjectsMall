<template>
  <scroll class="CartList" ref="scroll">
    <div>
      <cart-list-item
        v-for="item in cartList"
        :key="item.iid"
        :item-info="item"
      ></cart-list-item>
    </div>
  </scroll>
</template>

<script>
import Scroll from 'components/common/scroll/Scroll.vue'
import CartListItem from './CartListItem'

import { mapGetters } from 'vuex'

export default {
  name: 'CartList',
  components: {
    Scroll,
    CartListItem,
  },
  // 不从父级获取数据 从mapGetters 获取数据
  // props: {
  //   cartList: {
  //     type: Array,
  //     default () {
  //       return []
  //     },
  //   },
  // },
  computed: {
    ...mapGetters(['cartList']),
  },
  activated() {
    this.$refs.scroll.refresh()
  },
}
</script>

<style scoped></style>
