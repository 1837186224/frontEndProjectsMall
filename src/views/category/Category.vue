<template>
  <div class="">
    <h2>分类 研发中...</h2>
  </div>
</template>

<script>
import BScroll from 'better-scroll'

export default {
  name: 'Category',
  mounted () {
    new BScroll(document.querySelector('.wrapper'))
  },
}
</script>

<style scoped>
.wrapper {
  height: 300px;
  background-color: pink;
  overflow: hidden;
}
</style>
