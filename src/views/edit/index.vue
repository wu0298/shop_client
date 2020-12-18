<template>
  <div class="container">
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ name: 'personal' }"
        >个人中心</el-breadcrumb-item
      >
      <el-breadcrumb-item>{{ showTitle($route.name) }}</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 主要内容 -->
    <div class="wrap">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: {
        address: "地址管理",
        mine: "修改个人信息",
        order: "订单管理",
      },
    };
  },
  methods: {
    showTitle(val) {
      return this.title[val];
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
