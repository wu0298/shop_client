import Vue from 'vue'
import Vuex from 'vuex'

import user from './modules/user'
import cart from './modules/cart'
import config from './modules/config'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    HOST: 'http://localhost:8088/yuanlv',  //文件资源地址
  },
  modules: {
    user,
    cart,
    config
  }
})
