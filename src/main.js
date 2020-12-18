import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'
import router from './router'
import store from './store'

import './styles/main.scss'
import './assets/icon/iconfont.css'

// import VueAwesomeSwiper from 'vue-awesome-swiper'
// import "swiper/swiper-bundle.css";
// Vue.use(VueAwesomeSwiper, /* { default options with global component } */)
Vue.use(ElementUI);
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
