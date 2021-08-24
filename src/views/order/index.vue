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
          <img width="100" :src="getUrl(item.picture)" />
          <div class="content_top_right">
            <p>{{ item.name }}</p>
            <p class="business">
              <img width="28" :src="getUrl(item.admin.avatar)" />
              {{ item.admin.name }}
            </p>
          </div>
          <div v-if="item.orderStatus == 0 || item.orderStatus == 7" class="refund" @click.stop="paymentGood()"><span>去支付</span></div>
          <div class="bbb" v-else-if="item.orderStatus == 2">
            <div  class="refund" @click.stop="ackGood(item.orderId)"><span>确认收货</span></div>
            <div  class="refun" @click.stop="handleRefun(item.orderId, item.orderStatus)"><span>申请退款</span></div>
          </div>
          <div v-else-if="item.orderStatus == 5 || item.orderStatus == 6" @click.stop="" class="refund"><span>订单关闭</span></div>
          <div v-else class="refund" @click.stop="handleRefun(item.orderId, item.orderStatus)">申请退款</div>
          <div class="price">￥ {{ item.price }}</div>

          <div
            :class="[
              'yes_refund',
              { refund_bg: item.orderStatus === 1 },
              { refund_bg_3: item.orderStatus === 3 },
            ]"
            v-if="item.orderStatus !== 0||1||2||7"
          >
            {{ item.orderStatus | filtersRefund }}
          </div>

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
    <!-- 退款申请 -->
    <el-dialog title="申请退款" :visible.sync="deleteVisible" width="300px" center>
      <div align="center">确认申请退款吗</div>
      <span slot="footer">
        <el-button size="mini" @click="deleteVisible = false">取消</el-button>
        <el-button size="mini" @click="refund">确定</el-button>
      </span>
    </el-dialog>

    <!-- 确认收货 -->
    <el-dialog title="确认收货" :visible.sync="ackVisible" width="300px" center>
      <div align="center">确认收货吗？</div>
      <span slot="footer">
        <el-button size="mini" @click="ackVisible = false">取消</el-button>
        <el-button size="mini" @click="reallyAck">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { GetOrder, editOrderStatu } from '@/api/order';
import { initAddress } from '@u/address';
import { mixin } from '@/utils/mixin.js'

export default {
  mixins: [mixin],
  data() {
    return {
      idx: '',
      deleteVisible: false,
      orders: [],
      ackVisible: false
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
    /* 格式化文字 */
    filtersRefund(val) {
      console.log(val);
      switch (val) {
        case '0': return '未支付'
        case '1': return '已支付'
        case '2': return '已发货'
        case '3': return '申请退款中...';
        case '4': return '申请退款中...';
        case '5': return '退款成功';
        case '6': return '交易完成';
        case '7': return '支付失败'
        default: return '有点小问题'
      }
    },
  },
  mounted() {
    this.getOrder();
  },
  methods: {
    getOrder() {
      GetOrder().then((res) => {
        this.orders = res.data;
        console.log(this.orders);
      });
    },
    handleRefun(id, status){
      if(status == 0){
        this.message("还未支付的订单，无法退款","error");
        return
      }
      this.idx = id
      this.deleteVisible = true
    },
    refund(){
      editOrderStatu(this.idx, 3).then( res => {
        this.message("以向商家发送申请", "success");
        this.deleteVisible = false
        this.getOrder()
      })
    },
    //确认收货前的操作
    ackGood(id){
      this.idx = id
      this.ackVisible = true
    },
    reallyAck(){
      editOrderStatu(this.idx, 6).then( res => {
        this.message("确认收货成功", "success");
        this.ackVisible = false
        this.getOrder()
      })
    }
  },
};
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
