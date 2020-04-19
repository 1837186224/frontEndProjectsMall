<template>
  <div class="goods">
    <goods-list-item v-for="item in goods" :key="item.iid" :goodsitem="item"></goods-list-item>
  </div>
</template>

<script>
import GoodsListItem from './GoodsListItem.vue'

export default {
  name: "GoodsList",
  components: {
    GoodsListItem
  },
  props: {
    goods: {
      type: Array,
      default () {
        return []
      }
    }
  }
}
</script>

<style scoped>
.goods {
  display: flex;
  /* 包裹 */
  flex-wrap: wrap;
  /* 均等分 */
  justify-content: space-around;

  padding: 2px;
}
</style>
