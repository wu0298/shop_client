<template>
  <el-cascader
    size="large"
    class="cascader"
    :options="options"
    v-model="selectedOptions"
    @change="handleChange"
  />
</template>

<script>
import { regionData } from "element-china-area-data";
export default {
  props: {
    address: {
      type: Array,
      default: () => []
    },
  },
  data() {
    return {
      options: regionData,
      selectedOptions: [],
    };
  },
  watch: {
    // 监听地址变化
    address: {
      handler(newVal) {
        this.initAddress()
      }
    }
  },
  methods: {
    /* 初始化地址 */
    initAddress() {
      this.selectedOptions = this.address
    },
    /* 切换地址 */
    handleChange(value) {
      this.$emit('update:address', value)
    },
  },
};
</script>

<style lang="scss" scoped>
.cascader {
  width: 300px;
  margin: 0 10px;
}
</style>
