<template>
  <div class="tab-bar-item" @click="itemClick">
    <!-- <img src="../../assets/img/tabbar/home.svg" alt="" />
    <div>首页</div> -->
    <div v-if="!isActive">
      <slot name="item-icon"></slot>
    </div>
    <div v-else>
      <slot name="item-icon-active"></slot>
    </div>
    <!-- <div v-bind:class="{ active: isActive }"> -->
    <div v-bind:style="activeStyle">
      <slot name="item-text"></slot>
    </div>
  </div>
  <!-- <div class="tab-bar-item">分类</div>
    <div class="tab-bar-item">购物车</div>
    <div class="tab-bar-item">我的</div> -->
</template>
<script>
export default {
  name: 'TabBarItem',
  props: {
    path: String,
    activeColor: {
      type: String,
      default: 'red',
    }
  },
  data () {
    return {
      // isActive: true,
    }
  },
  computed: {
    isActive () {
      // 动态决定 isActive 是否为true or false
      // return console.log(this.$route)
      return this.$route.path.indexOf(this.path) !== -1
    },
    activeStyle () {
      return this.isActive ? { color: this.activeColor } : {}
    }
  },
  methods: {
    itemClick () {
      this.$router.replace(this.path)
    }
  }
}
</script>

<style scoped>
.tab-bar-item {
  flex: 1;
  text-align: center;
  height: 49px;
  font-size: 14xp;
}
.tab-bar-item img {
  margin: 3px 0 1px 0;
  width: 24px;
  height: 24px;
  vertical-align: middle;
}
/* 封装  active*/
/* .active {
  color: red;
} */
</style>
