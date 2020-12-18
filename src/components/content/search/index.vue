<template>
  <div class="search">
    <i class="iconfont icon-sousuokuang"></i>
    <input type="text" v-model="keyword" placeholder="迷彩服" />
    <div class="search-btn" @click="search">搜索</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      keyword: "",
    };
  },
  methods: {
    /* 搜索 */
    search() {
      if (!this.keyword) return;

      /* 跳转搜索页面 */
      this.$router.push({
        path: "/search",
        query: {
          q: this.keyword
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.search {
  height: 32px;
  border: 1px solid #5565ee;
  width: 438px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-radius: 16px;
  .iconfont {
    width: 40px;
    text-align: center;
    color: #5565ee;
  }
  input {
    border: none;
    outline: none;
    height: 100%;
    flex: 1;
    box-sizing: border-box;
    &::placeholder {
      color: #b4afaf;
    }
  }
  &-btn {
    width: 90px;
    height: 32px;
    line-height: 32px;
    text-align: center;
    color: #fff;
    font-size: 15px;
    background: #5565ee;
    border-top-right-radius: 19px;
    border-bottom-right-radius: 19px;
    cursor: pointer;
    &:hover {
      background: #4859f0;
    }
    &:active {
      background: #4859f0;
    }
  }
}
</style>
