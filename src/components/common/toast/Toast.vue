<template>

  <div class="toast" v-show="isShow">
    <div>{{message}}</div>
  </div>
</template>

<script>
export default {
  name: 'Toast',
  // props: {
  //   message: {
  //     type: String,
  //     default: ''
  //   }
  // }
  data () {
    return {
      message: '',
      isShow: false
    }
  },
  methods: {
    show (message, duration = 2000) {
      this.isShow = true;
      this.message = message

      setTimeout(() => {
        this.isShow = false;
        this.message = ''
      }, duration)
    }
  }

}
</script>


<style scoped>
.toast {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%);
  border-radius: 10%;
  padding: 8px 10px;
  color: #fff;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 999;
}
</style>