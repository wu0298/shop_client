<template>
  <GoodList :good_options="good_options" />
</template>

<script>
import GoodList from "@c/common/goodList";

export default {
  components: { GoodList },
  data() {
    return {
      categoryId: "",
      // 列表配置
      good_options: {
        requestUrl: '/goods/style',
        query: 'style'
      },
    };
  },
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
