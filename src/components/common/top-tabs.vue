<template>
  <div class="tabs">
    <div class="container">
      <div
        :class="['tab-item', { active: isActive == item.value }]"
        v-for="(item, index) in tabs"
        :key="index+1"
        @click="handlerChange(item.value)"
      >
        {{ item.label }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isActive: -1,
      // tabs: ["首页", "手机", "球鞋"],
      tabs: [],
    };
  },
  watch: {
    // 监听路由参数的变化
    $route: {
      handler(newVal) {
        this.isActive = newVal.query.style;
      },
      immediate: true,
    },
  },
  mounted() {
    this.initTabs()
  },
  methods: {
    initTabs() {
      this.tabs = this.$store.state.config.category_type
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
.tabs {
  height: 40px;
  line-height: 40px;
  border-bottom: 1px solid #ececec;
  .container {
    height: 40px;
    display: flex;
    align-items: center;
  }
}

.tab-item {
  min-width: 80px;
  height: 100%;
  text-align: center;
  cursor: pointer;
  box-sizing: border-box;
  &.active,
  &:hover {
    color: #007aff;
    border-bottom: 3px solid #007aff;
  }
}
</style>
