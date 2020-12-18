<template>
  <div class="order">
    <div class="order_item" v-for="order in orders" :key="order.id">
      <div class="item_top">订单号：{{ order.goods[0].outTradeNo }}</div>
      <div class="item_content">
        <div
          class="content_top"
          v-for="item in order.goods"
          :key="item.id"
          @click="
            $router.push({ name: 'detail', query: { id: item.id } })
          "
        >
          <img width="100" :src="item.picture" />
          <div class="content_top_right">
            <p>{{ item.name }}</p>
            <p class="business">
              <img width="28" :src="item.admin.avatar" />
              {{ item.admin.name }}
            </p>
          </div>
          <div class="price">￥ {{ item.price }}</div>

          <div class="num">
            x <span>{{ item.count }}</span>
          </div>
        </div>
        <div class="content_bottom" v-if="order.address.id">
          <div>
            地址：{{ order.address.address | addressToString }}
            {{ order.address.detailed }}
          </div>
          <div>时间：{{ order.updateTime | updateDatetime }}</div>
          <div>
            支付金额：
            <span>{{ order.totalPrice | totalAmountToFix }} 元</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { GetOrder } from '@/api/order';
import { initAddress } from '@u/address';

export default {
  data() {
    return {
      orders: [],
    };
  },
  filters: {
    // 地址转换成中文
    addressToString(val) {
      return initAddress(val);
    },
    // 保留两位数字
    totalAmountToFix(val) {
      return val.toFixed(2);
    },
    // 转换时间
    updateDatetime(val) {
      return new Date(val).toLocaleDateString();
    },
  },
  mounted() {
    this.getOrder();
  },
  methods: {
    getOrder() {
      GetOrder().then((res) => {
        this.orders = res.data;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
