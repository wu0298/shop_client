<template>
  <div class="main">
    <!-- 推荐商品 -->
    <div class="recommend">
      <h3 class="title">推荐商品</h3>
      <swiper class="swiper" ref="mySwiper" :options="swiperOption">
        <swiper-slide
          v-for="(item, index) in randGoodList"
          :key="index"
          class="recommend_item"
        >
          <img class="shop" @click="pushDetail(item.id)" :src="item.picture" alt="" width="199.99" height="199.99" />
          <div class="item_conetent">
            <p class="title t_1">{{ item.name }}</p>
            <span class="tip t_1">{{ item.autograph }}</span>
            <p class="price">
              <span class="primary">{{ item.price }}元</span>
              <s>{{ item.price }}元</s>
            </p>
          </div>
        </swiper-slide>
      </swiper>
    </div>

    <!-- AD  -->
    <div class="ad">
      <img width="1226" height="120" src="https://www.hualigs.cn/image/6082c6fc8e97a.jpg" />
    </div>

    <!-- 米类 -->
    <div class="phone">
      <div class="top_title">
        <h3 class="title">米类</h3>
        <div class="more" @click="handlerChange(1)">查看全部<i class="iconfont icon-you"></i></div>
      </div>

      <div class="phone_show">
        <div
          @click="pushDetail(item.id)"
          class="recommend_item phone_item"
          v-for="(item, index) in cerealsAndOils"
          :key="index"
        >
          <img class="shop" :src="item.picture" alt="" width="199.99" height="199.99" />
          <div class="item_conetent">
            <p class="title t_1">{{ item.name }}</p>
            <span class="tip t_1">{{ item.autograph }}</span>
            <p class="price">
              <span class="primary">{{ item.price }}元</span>
              <s>{{ item.price }}元</s>
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- AD  -->
    <div class="ad">
      <img width="1226" height="120" src="https://ae01.alicdn.com/kf/Uac3cb82b58cc4fc98f2b2a8ae93deafa6.jpg" />
    </div>

    <!-- 蔬菜 -->
    <div class="phone">
      <div class="top_title">
        <h3 class="title">蔬菜</h3>
        <div class="more" @click="handlerChange(2)">查看全部<i class="iconfont icon-you"></i></div>
      </div>
      <div class="phone_show">
        <div
          @click="pushDetail(item.id)"
          class="recommend_item phone_item"
          v-for="(item, index) in fruitsAndVegetables"
          :key="index"
        >
          <img class="shop" :src="item.picture" alt="" width="199.99" height="199.99" />
          <div class="item_conetent">
            <p class="title t_1">{{ item.name }}</p>
            <span class="tip t_1">{{ item.autograph }}</span>
            <p class="price">
              <span class="primary">{{ item.price }}元</span>
              <s>{{ item.price }}元</s>
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- AD  -->
    <div class="ad">
      <img width="1226" height="120" src="https://s3.ax1x.com/2020/12/09/rCAJIK.jpg" />
    </div>

    <!-- 禽类 -->
    <div class="phone">
      <div class="top_title">
        <h3 class="title">禽类</h3>
        <div class="more" @click="handlerChange(3)">查看全部<i class="iconfont icon-you"></i></div>
      </div>
      <div class="phone_show">
        <div
          @click="pushDetail(item.id)"
          class="recommend_item phone_item"
          v-for="(item, index) in fresh"
          :key="index"
        >
          <img class="shop" :src="item.picture" alt="" width="199.99" height="199.99" />
          <div class="item_conetent">
            <p class="title t_1">{{ item.name }}</p>
            <span class="tip t_1">{{ item.autograph }}</span>
            <p class="price">
              <span class="primary">{{ item.price }}元</span>
              <s>{{ item.price }}元</s>
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- AD  -->
    <div class="ad">
      <img width="1226" height="120" src="https://s3.ax1x.com/2020/12/09/rCFVLq.jpg" />
    </div>

    <!-- 水果 -->
    <div class="phone">
      <div class="top_title">
        <h3 class="title">水果</h3>
        <div class="more" @click="handlerChange(4)">查看全部<i class="iconfont icon-you"></i></div>
      </div>
      <div class="phone_show">
        <div
          @click="pushDetail(item.id)"
          class="recommend_item phone_item"
          v-for="(item, index) in tablePoultry"
          :key="index"
        >
          <img class="shop" :src="item.picture" alt="" width="199.99" height="199.99" />
          <div class="item_conetent">
            <p class="title t_1">{{ item.name }}</p>
            <span class="tip t_1">{{ item.autograph }}</span>
            <p class="price">
              <span class="primary">{{ item.price }}元</span>
              <s>{{ item.price }}元</s>
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- AD  -->
    <div class="ad">
      <img width="1226" height="120" src="https://www.hualigs.cn/image/6082cae428fe3.jpg" />
    </div>

    <!-- 渔产 -->
    <div class="phone">
      <div class="top_title">
        <h3 class="title">渔产</h3>
        <div class="more" @click="handlerChange(5)">查看全部<i class="iconfont icon-you"></i></div>
      </div>
      <div class="phone_show">
        <div
          @click="pushDetail(item.id)"
          class="recommend_item phone_item"
          v-for="(item, index) in tea"
          :key="index"
        >
          <img class="shop" :src="item.picture" alt="" width="199.99" height="199.99" />
          <div class="item_conetent">
            <p class="title t_1">{{ item.name }}</p>
            <span class="tip t_1">{{ item.autograph }}</span>
            <p class="price">
              <span class="primary">{{ item.price }}元</span>
              <s>{{ item.price }}元</s>
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- AD  -->
    <div class="ad">
      <img
        width="1226"
        height="120"
        src="https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/1615d1842fe85914a545297836a44271.jpg?thumb=1&w=1226&h=120&f=webp&q=90"
      />
    </div>
  </div>
</template>

<script>
import { getRand, getZS } from "@/api/home.js";
import { swiper, swiperSlide } from "vue-awesome-swiper";
import "swiper/dist/css/swiper.css";

export default {
  components: { swiper, swiperSlide },
  created() {
    this.getRandGoods();
    this.getShow();
  },
  data() {
    return {
      swiperOption: {
        slidesPerView: 5, //能同时显示的数量
        spaceBetween: 20, //显示物品的中间间隔
        direction: "horizontal", //滑动方向
      },
      randGoodList: [], //推荐商品
      cerealsAndOils: [], //粮油
      fruitsAndVegetables: [], //果蔬
      fresh: [], //生鲜
      tablePoultry: [], //肉禽
      tea: [], //茶叶
    };
  },
  methods: {
    //调用后台返回的推荐商品
    getRandGoods() {
      getRand().then((res) => {
        this.randGoodList = res.data;
      });
    },
    //调用首页展示接口
    getShow() {
      getZS(1).then((res) => {
        this.cerealsAndOils = res.data;
      });
      getZS(2).then((res) => {
        this.fruitsAndVegetables = res.data;
      });
      getZS(3).then((res) => {
        this.fresh = res.data;
      });
      getZS(4).then((res) => {
        this.tablePoultry = res.data;
      });
      getZS(5).then((res) => {
        this.tea = res.data;
      });
    },
    pushDetail(id){
      this.$router.push({
        name: "detail",
        query: { id: id },
      });
    },
    // 选择分类并跳转
    handlerChange(value) {
      this.isActive = value;

      // 跳转到分类页面
      this.$router.push({
        name: "category",
        query: { style: value },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.main {
  width: 1226px;
  margin: 0 auto;
}
h3.title {
  font-size: 22px;
  font-weight: 200;
  color: #333;
  padding-left: 10px;
  margin: 30px 0;
  border-left: 3px solid #eb5c5c;
}
.recommend_item {
  width: 234px;
  height: 300px;
  background: #fff;
  padding: 0 20px;
  box-sizing: border-box;
  cursor: pointer;
  .item_conetent {
    text-align: center;
    .title {
      font-size: 14px;
      font-weight: 400;
      color: #212121;
      margin-bottom: 3px;
    }
    .tip {
      display: block;
      height: 20px;
      line-height: 20px;
      font-size: 12px;
      color: #b0b0b0;
    }
    .price {
      height: 40px;
      line-height: 40px;
      .primary {
        color: #ff6709;
      }
      s {
        margin-left: 10px;
        color: #b0b0b0;
      }
    }
  }
}
.ad {
  margin: 20px 0;
}
.phone_show {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  .phone_item {
    margin-bottom: 15px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    transition: all 0.8s;
    cursor: pointer;
    &:hover {
      transform: translateY(-10px);
      box-shadow: 2px 0 50px rgba(0, 0, 0, 0.2);
    }
  }
}

.top_title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .more {
    font-size: 18px;
    color: #424242;
    padding-right: 40px;
    position: relative;
    cursor: pointer;
    &:hover {
      color: #5565ee;
      font-weight: bolder;
      .iconfont {
        color: #5565ee;
      }
    }
    .iconfont {
      position: absolute;
      font-size: 28px;
      color: #c7c7c7;
      right: 0;
      top: -6px;
    }
  }
}
</style>
