<template>
  <div class="layout">
    <TopNav class="header"/>
    <router-view class="content"></router-view>
    <MyFooter />
  </div>
</template>

<script>
import MyFooter from "@c/common/footer";
import TopNav from "@c/common/top-nav";
export default {
  components: { TopNav, MyFooter },
};
</script>

<style lang="scss" scoped>
.layout {
  min-height: 100vh;
  min-width: 1263px;
  display: flex;
  flex-direction: column;
  .header {
    background: #fff;
  }
  .content {
    flex: 1;
  }
}
</style>
