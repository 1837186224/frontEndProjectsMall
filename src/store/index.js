import Vue from 'vue'
import Vuex from 'vuex'

import getters from './getter'

// 1 安装插件
Vue.use(Vuex)

// 2 创建Store对象
const store = new Vuex.Store({
  // 未抽离的写法
  state: {
    // cartList:[商品1，商品2，商品3...]
    cartList: []
  },
  mutations: {
    //唯一的目的就是修改state中的状态
    // 每个方法尽可能完成的事件比较单一

    //方便跟踪
    addCounter(state, payload) {
      payload.count++
    },
    addToCart(state, payload) {
      payload.checked = true
      state.cartList.push(payload)
    }
  },
  actions: {
    addCart(context, payload) {
      // reject
      return new Promise((resolve) => {
        // state.cartList.push(payload)
        // 1 查找之前数组中是否有该商品
        let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)

        // 2 判断 oldProduct 
        if (oldProduct) {
          // oldProduct.count += 1
          context.commit('addCounter', oldProduct)
          resolve('当前的商品数量加1')
        } else {
          payload.count = 1
          // context.state.cartList.push(payload)
          context.commit('addToCart', payload)
          resolve('添加了新的商品')
        }
      })

    }
  },

  // 抽离写法
  getters
})


// 3 挂载Vue实例上
export default store