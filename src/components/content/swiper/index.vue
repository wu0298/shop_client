<template>
  <swiper class="m-50" :options="swiper_option" ref="mySwiper">
    <swiper-slide v-for="(banner, index) in banners" :key="index"
      ><img :src="banner"
    /></swiper-slide>
    <div
      v-if="swiper_option.pagination"
      class="swiper-pagination"
      slot="pagination"
    ></div>
    <div
      v-if="swiper_option.navigation"
      class="swiper-button-prev"
      slot="button-prev"
    ></div>
    <div
      v-if="swiper_option.navigation"
      class="swiper-button-next"
      slot="button-next"
    ></div>
  </swiper>
</template>

<script>
import { swiper, swiperSlide } from "vue-awesome-swiper";
import "swiper/dist/css/swiper.css";
export default {
  props: {
    options: {
      type: Object,
      default: () => {},
    },
  },
  components: {
    swiper,
    swiperSlide,
  },
  data() {
    return {
      banners: [],
      swiper_option: {
        init: false,
        loop: true,
        autoplay: {
          delay: 2000,
          stopOnLastSlide: false,
          disableOnInteraction: false,
        },
        // 显示分页
        pagination: {
          el: ".swiper-pagination",
          clickable: true, //允许分页点击跳转
        },
        // 设置点击箭头
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      },
    };
  },
  mounted() {
    this.initOptions();
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper;
    },
  },
  methods: {
    /* 初始化轮播图数据 */
    initOptions() {
      this.banners = this.options.banners || [];
      for (let key in this.options.options) {
        if (this.options.options.hasOwnProperty(key)) {
          this.swiper_option[key] = this.options.options[key];
        }
      }

      // 轮播图初始化
      this.$nextTick(() => {
        this.swiper.init();
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
