<template>
  <div class="num-reduce-add">
    <div class="btn" @click="handlerReduce">-</div>
    <div class="txt">{{ good_num }}</div>
    <div class="btn" @click="handlerAdd">+</div>
  </div>
</template>

<script>
export default {
  props: {
    num: {
      type: Number,
      default: 1,
    },
  },
  data() {
    return {
      good_num: 1,
    };
  },
  mounted() {
    this.good_num = this.num;
  },
  methods: {
    handlerAdd() {
      this.good_num += 1;
      this.$emit('update:num', this.good_num)
    },
    handlerReduce() {
      if (this.good_num <= 1) return;
      this.good_num -= 1;
      this.$emit('update:num', this.good_num)
    },
  },
};
</script>

<style lang="scss" scoped>
.num-reduce-add {
  display: flex;
  align-items: center;
  text-align: center;
  box-sizing: border-box;
  height: 32px;
  width: 134px;
  border: 1px solid #b3b3b3;
  overflow: hidden;
  .btn {
    border: none;
    outline: none;
    width: 30px;
    height: 30px;
    line-height: 30px;
    cursor: pointer;
    &:hover {
      background: #f1efef;
    }
    &:active {
      background: #e6e3e3;
    }
  }
  .txt {
    flex: 1;
    border-left: 1px solid #b3b3b3;
    border-right: 1px solid #b3b3b3;
    height: 30px;
    line-height: 30px;
  }
}
</style>
