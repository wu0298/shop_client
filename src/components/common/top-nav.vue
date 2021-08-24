<template>
  <div class="header">
    <!-- 导航栏 -->
    <div class="nav">
      <div class="nav-main">
        <div class="nav-l">
          <marquee class="nav-marquee" width="280"
            >【源绿】的宗旨就是让每个人都能享受绿色健康的美好食物</marquee
          >
        </div>
        <router-link :to="{ name: 'goodRegister' }" tag="a" class="nav-good">成为商家</router-link>/
        <div class="nav-r">
          <!-- 已登录 -->
          <div v-if="user" class="user">
            <div class="user_info">
              <img width="30" class="avatar" :src="getUrl(us.avatar)" alt="" />
              <span class="name">{{ us.name }}</span>

              <div class="info_hover">
                <div class="hover_item" @click="logout">退出登录</div>
              </div>
            </div>
            <router-link tag="div" :to="{ name: 'personal' }" class="op"
              >个人中心</router-link
            >
            <router-link tag="div" :to="{ name: 'order' }" class="op"
              >我的订单</router-link
            >
            <router-link tag="div" :to="{ name: 'caigou' }" class="op"
              >采购大厅</router-link
            >
          </div>
          <!-- 未登录 -->
          <div v-else>
            <router-link :to="{ name: 'login' }" tag="a" class="sign">登录</router-link>/
            <router-link :to="{ name: 'register' }" tag="a" class="sign"
              >注册</router-link
            >
          </div>
        </div>
      </div>
    </div>
    <!-- logo 搜索框 购物车 -->
    <div class="header_center">
      <router-link class="logo" tag="div" :to="{ name: 'home' }">
        <img src="~@a/logo.png" alt="" />
      </router-link>
      <!-- <div class="logo" @click="$router.push({ name: 'home' })">
      </div> -->
      <MySearch />

      <div class="cart" @click="$router.push({ name: 'cart' })">
        <i class="iconfont icon-gouwuche"></i>
        购物车
        <div :class="['tip', { scale_2: animated }]" v-if="cartLength > 0">
          {{ cartLength }}
        </div>
      </div>
    </div>

    <!-- tabs -->
    <TopTabs />
  </div>
</template>

<script>
import TopTabs from "./top-tabs";
import MySearch from "@c/content/search";
import { mixin } from '@/utils/mixin.js'

import { mapGetters } from "vuex";

export default {
  components: { TopTabs, MySearch },
  computed: {
    ...mapGetters({
      cartLength: "cart/cartLength",
      us: "user/getUser"
    }),
  },
  mixins: [mixin],
  data() {
    return {
      user: null,
      animated: false,
    };
  },
  mounted() {
    this.isUser();
  },
  watch: {
    cartLength: {
      handler(newVal) {
        if (!this.animated) {
          this.animated = true;
          setTimeout(() => {
            this.animated = false;
          }, 300);
        }
      },
      immediate: true,
    },
  },
  methods: {
    // 获取 user 用户
    isUser() {
      this.user = this.$store.state.user.user;
      console.log(this.user);
    },
    /* 退出登录 */
    logout() {
      this.$store.dispatch("user/remove_user").then((res) => {
        if (res.status) {
          // this.user = null;
          this.$router.go(0);
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.scale_2 {
  transform: scale(1.2) !important;
}

.nav {
  height: 36px;
  width: 100%;
  font-size: 12px;
  line-height: 36px;
  background-color: #333;
  &-main {
    width: 1226px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
  }
  &-marquee {
    color: #b4a078;
    text-decoration: underline;
  }
  &-good {
    position: relative;
    color: gainsboro;
    left: -180px;
  }
  &-r {
    color: gainsboro;
  }
}
.sign {
  color: gainsboro;
  &:hover {
    color: #fff;
  }
}
.header_center {
  width: 1090px;
  height: 140px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .logo img {
    height: 84px;
    cursor: pointer;
  }

  .cart {
    width: 100px;
    height: 32px;
    border: 1px solid #5565ee;
    border-radius: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    box-sizing: border-box;
    color: #5565ee;
    position: relative;
    &:hover {
      border: 1px solid #4859f0;
      color: #fff;
      background: #5565ee;
      box-shadow: 1px 0 20px rgba(0, 0, 0, 0.3);
    }
    .tip {
      position: absolute;
      right: -8px;
      top: -10px;
      font-size: 13px;
      background: #e45050;
      color: #fff;
      padding: 3px 10px;
      border-radius: 10px;
      transform: scale(0.8);
      transition: all 0.3s;
    }
  }
}

.user {
  display: flex;
  align-items: center;
  color: #fff;
  font-size: 14px;
  .info_hover {
    display: none;
    position: absolute;
    bottom: -45px;
    left: 20px;
    padding: 4px 20px;
    border-radius: 10px;
    color: #000;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
    transition: all 0.5s;
    &:hover {
      background: #eeebeb;
    }
    &::before {
      content: "";
      position: absolute;
      top: -8px;
      left: 0;
      width: 100%;
      height: 8px;
    }
    &::after {
      content: "";
      position: absolute;
      top: -15px;
      left: 10px;
      background: transparent;
      height: 0;
      border-width: 8px;
      border-style: solid;
      border-color: transparent transparent rgb(253, 253, 253) transparent;
    }
  }
  .user_info {
    display: flex;
    align-items: center;
    position: relative;
    padding: 0 20px;
    cursor: pointer;

    &:hover {
      background: #000;
      .info_hover {
        display: block;
      }
    }
    .avatar {
      border-radius: 50%;
      width: 30px;
      height: 30px;
    }
    .name {
      margin-left: 10px;
    }
  }
  .op {
    min-width: 90px;
    text-align: center;
    cursor: pointer;
    &:hover {
      background: #000;
    }
  }
}
</style>
