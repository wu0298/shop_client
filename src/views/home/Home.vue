<template>
  <div class="home">
    <div :class="['my_search', { op_0: isShow }]" ref="search">
      <img src="~@a/logo.png" alt="" />
      <MySearch class="search_n" />
    </div>
    <MySwiper :options="swiper" />
    <HomeContent />
  </div>
</template>

<script>
import MySwiper from "@c/content/swiper";
import HomeContent from "./child/main";
import MySearch from "@c/content/search";

export default {
  components: { MySwiper, HomeContent, MySearch},
  data() {
    return {
      isShow: true,
      swiper: {
        banners: [
          "https://s2.ax1x.com/2019/09/19/nOPHyR.jpg",
          "https://s2.ax1x.com/2019/09/19/nOP7l9.jpg",
          "https://s2.ax1x.com/2019/09/19/nOPIW4.jpg",
        ],
      },
    };
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  methods: {
    handleScroll() {
      const top = document.documentElement.scrollTop || document.body.scrollTop;
      this.isShow = top > 410 ? false : true;
    },
  },
  beforeDestroy() {
    window.removeEventListener("scroll",this.handleScroll)
  },
};
</script>

<style lang="scss" scoped>
.op_0 {
  opacity: 0;
  z-index: -1 !important;
}
.my_search {
  position: fixed;
  top: 0;
  z-index: 9;
  background: #fff;
  width: 100%;
  height: 60px;
  box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;
  img {
    width: 150px;
    height: 60px;
    margin-right: 20px;
  }
}
</style>
