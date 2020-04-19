<template >
  <div class="tab-control">
    <div v-for="(item,index) in titles" :key="item" class="tab-control-item" :class="{active: index === currentIndex}"
      @click="itemClick(index)">
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TabControl',
  // props 父传子
  props: {
    titles: {
      type: Array,
      defaule () {
        return []
      }
    }
  },
  data () {
    return {
      currentIndex: 0
    }
  },
  methods: {
    // 点击事件
    itemClick (index) {
      this.currentIndex = index
      // 1、父组件可以使用 props 把数据传给子组件 写子上。
      // 2、子组件可以使用 $emit 触发父组件的自定义事件。
      this.$emit('itemClick', index)
    }
  }
}
</script>

<style scoped>
.tab-control {
  display: flex;
  text-align: center;
  height: 40px;
  line-height: 40px;
  font-size: 14px;
  background-color: #fff;
}
.tab-control-item {
  flex: 1;
}
.tab-control-item span {
  padding: 5px;
}
.active {
  color: var(--color-high-text);
}
.active span {
  border-bottom: 2px solid var(--color-tint);
}
</style> 