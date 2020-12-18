<template>
  <div class="container">
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>个人中心</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 用户模块 -->
    <div class="personal">
      <div class="user_info">
        <div class="avatar">
          <img :src="user.avatar" alt="" />
        </div>
        <div class="info">
          <div class="info_left">
            <div class="name">{{ user.name }}</div>
            <div class="timer">上午好~</div>
            <div @click="edit" class="edit_password">修改密码</div>
          </div>
          <div class="info_right">
            <div class="right_item">绑定手机：{{ user.phone | filterVal }}</div>
            <div class="right_item">
              绑定邮箱：{{ user.email ? user.email : "未绑定" }}
            </div>
          </div>
        </div>
      </div>
      <!-- 分割线 -->
      <div class="line" />

      <div class="info-list">
        <div class="list_item" v-for="(item, index) in tabs" :key="index">
          <div :class="['item_left', item.color]">
            <i :class="['iconfont', item.icon]"></i>
          </div>
          <div class="item_right">
            <div class="title">{{ item.title }}</div>
            <div class="go" @click="$router.push({ name: item.link })">
              去查看{{ item.title }} <i class="iconfont icon-you1"></i>
            </div>
          </div>
        </div>
      </div>
    </div>

    <MyDialog :user="user" :visible.sync="dialogVisible" />
  </div>
</template>

<script>
import MyDialog from "@c/common/dialog/passwordDialog";

export default {
  components: { MyDialog },
  data() {
    return {
      user: {},
      tabs: [
        {
          title: "我的订单",
          icon: "icon-qianbao",
          color: "bg_orange",
          link: "order",
        },
        {
          title: "地址管理",
          icon: "icon-huochedong",
          color: "bg_blue",
          link: "address",
        },
        {
          title: "我的个人信息",
          icon: "icon-edit-1-copy",
          color: "bg_black",
          link: "mine",
        },
        {
          title: "我的购物车",
          icon: "icon-gouwuchekong",
          color: "bg_red",
          link: "cart",
        },
      ],
      // 弹窗显示
      dialogVisible: false,
    };
  },
  filters: {
    /* 过滤手机 */
    filterVal(val) {
      if (!val) return "未绑定";
      val = val + ""; // 转换成字符串
      return val.replace(/^(\d{3})\d{4}@?(\d+)/, "$1****$2");
    },
  },
  mounted() {
    this.getUserInfo();
  },
  methods: {
    // 获取用户信息
    getUserInfo() {
      this.user = this.$store.state.user.user;

      // if (!this.user) this.$router.push({ name: "login" };
    },
    // 显示弹窗
    edit() {
      this.dialogVisible = true;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
