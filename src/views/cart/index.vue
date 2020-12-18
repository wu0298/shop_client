<template>
  <div class="cart">
    <!-- 面包屑 -->
    <div class="cart_title">
      <span @click="$router.push({ name: 'home' })">首页</span> >
      <span>购物车</span>
    </div>

    <!-- 未登录 -->
    <div v-if="!online" class="no_good">
      <div class="no_login">
        <img src="~@a/images/cart/not_card.png" alt="" />
        <p class="no_title">登录后才能看到购物车商品哦~</p>
      </div>
      <div @click="$router.push({ name: 'login' })" class="to_login">去登录</div>
    </div>

    <!-- 已登录 -->
    <div v-else>
      <!-- 无商品 -->
      <div v-if="cartSize > 0" class="goods">
        <div class="goods_head">
          <i
            :class="['iconfont icon-xuanze', { isSelect: checkAll }]"
            @click="handlerCheckAll"
          ></i>
          <div class="w_165">全选</div>
          <div class="w_325">商品信息</div>
          <div class="w_205">单价</div>
          <div class="w_208">数量</div>
          <div class="w_129">金额</div>
          <div class="head_item">操作</div>
        </div>
        <div class="goods_wrap">
          <div class="good_item" v-for="good in cart" :key="good.product.id">
            <i
              :class="['iconfont icon-xuanze', { isSelect: good.product.checked }]"
              @click="handlerCheck(good.product.id)"
            ></i>
            <div class="w_130 image">
              <img :src="good.product.picture" alt="" />
            </div>
            <div class="good_info">
              <div class="name">{{ good.product.name }}</div>
              <div class="business" v-if="good.business">
                <img :src="good.business.avatar" />
                <div class="business_name">{{ good.business.name }}</div>
              </div>
            </div>
            <div class="price">￥{{ good.product.price | fixedPrice }}</div>
            <div class="w_208 num">
              <el-input-number
                v-model="good.count"
                size="mini"
                @change="handleChange(good.product.id, good.count)"
                :min="1"
                :max="99"
              ></el-input-number>
            </div>
            <div class="w_129 subtotal">￥{{ good.subtotal | fixedPrice }}</div>
            <div class="del" @click="handleChange(good.product.id, 0)">
              <i class="iconfont icon-close"></i>
            </div>
          </div>
        </div>
      </div>

      <div v-else class="no_good">
        <div class="no_login">
          <img src="~@a/images/cart/not_card.png" alt="" />
          <p class="no_title">还未选购商品~</p>
        </div>
        <div @click="$router.push({ name: 'home' })" class="to_login">去选购</div>
      </div>
    </div>
    <div class="good_item">
    
    <!-- <el-table
      size="mini"
      border
      style="width: 100%"
      height="550px"
      :data="userGoods"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="40"></el-table-column>
      <el-table-column label="商品图片" width="180" align="center">
        <template slot-scope="scope">
          <div class="w_130 image">
            <img :src="scope.row[1].product.picture" style="width: 100%" />
          </div>
        </template>
      </el-table-column>
      <el-table-column label="商品信息" width="320" align="center">
        <template slot-scope="scope">
          <div class="good_info">{{scope.row[1].product.name}}</div>
        </template>
      </el-table-column>
      <el-table-column label="单价" width="120" align="center">
        <template slot-scope="scope">
          <div>{{scope.row[1].product.price | fixedPrice}}</div>
        </template>
      </el-table-column>

      <el-table-column label="数量" prop="sex" align="center" width="153">
        <template slot-scope="scope">
          <el-input-number
            v-model="scope.row[1].count"
            size="mini"
            @change="handleChange(good.product.id, good.count)"
            :min="1"
            :max="99"
          ></el-input-number>
        </template>
      </el-table-column>

      <el-table-column label="金额" width="120" align="center">
        <template slot-scope="scope">
          <div>{{scope.row[1].subtotal | fixedPrice}}</div>
        </template>
      </el-table-column>

      <el-table-column label="操作" width="125" align="center">
        <template slot-scope="scope">
          <div class="del" @click="handleChange(scope.row[1].product.id, 0)">
              <i class="iconfont icon-close"></i>
          </div>
        </template>
      </el-table-column>
    </el-table> -->
    </div>
    

    <!-- 结算 -->
    <div class="bottom-total" v-if="online">
      <div class="totol-price">
        <div class="count">
          合计: <span>￥{{ getCount }}</span>
          <div class="ico">
            已选 <span>{{ cartLength }}</span
            >件
          </div>
        </div>
        <div class="checkout" @click="pay">去结算</div>
      </div>
    </div>

    <!-- 地址弹窗 -->
    <MyAddress v-if="online" :visble.sync="visble" @cb="callback" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { getUrl } from "@/api/order";
import MyAddress from "@c/common/address";

export default {
  components: { MyAddress },
  data() {
    return {
      userGoods: [],
      checkAll: false,
      visble: false,
      select: {
        goods: [],
        address_id: "",
        total_amount: 0.0,
      },
      online: this.$store.state.user.user,
    };
  },
  created() {
    this.getUserCart();
  },
  computed: {
    ...mapGetters({
      cart: "cart/cartList",
    }),
    cartSize() {
      return Object.keys(this.$store.state.cart.cart.cartMap).length;
    },
    cartLength() {
      const arr = Object.entries(this.cart)
      return arr.reduce((pre, cur) => {
        if (cur[1].product.checked) {
          pre += cur[1].count;
        }
        return pre;
      }, 0);
    },
    // 总共金额
    getCount() {
      const arr = Object.entries(this.cart)
      
      // return 999
      return arr.reduce((pre, cur) => {
          if (cur[1].product.checked) {
            pre += cur[1].product.price * cur[1].count;
          }
          return pre;
        }, 0).toFixed(2);
    },
  },
  filters: {
    // 保留两位小数
    fixedPrice(val) {
      return val.toFixed(2);
    },
  },
  mounted() {
    this.checkAll = this.valiteAll();
    this.online && this.getUserCart();
    const data = this.$store.state.cart.cart.cartMap;
    this.userGoods = Object.entries(data);
    this.getUserCart();
  },
  methods: {
    ...mapActions({
      setGoodCart: "cart/setGoodCart",
      clearGood: "cart/clearGood",
      setGood: "cart/setGood",
      getCart: "cart/getCart",
      changeGoodChecked: "cart/changeGood",
    }),
    // 获取购物车
    getUserCart() {
      this.getCart();
    },
    // 单个商品点击
    async handlerCheck(id) {
      // vuex 设置 Good
      await this.changeGoodChecked({
        id: id,
      });

      // 判断全选
      this.checkAll = this.valiteAll();
    },
    // 全选点击
    handlerCheckAll() {
      this.checkAll = !this.checkAll;
      this.cart.map((item) => {
        item.checked = this.checkAll;
      });

      this.setGoodCart(this.cart);
    },
    // 数量改变
    handleChange(goodId, count) {
      this.setGood({
        goodId,
        count,
      });
    },
    // 判断全选
    valiteAll() {
      const ck = Object.entries(this.cart)
      let res = true;
      for (let i = 0; i < ck.length; i++) {
        if (!ck[i][1].product.checked) {
          res = false;
          break;
        }
      }
      return res;
    },
    // 结算
    pay() {
      this.visble = true;
    },
    //选择地址后进行的回调
    async callback(id) {
      this.select.address_id = id;

      this.select.goods = [];
      const arr = Object.entries(this.cart)
      arr.map((good) => {
        if (good[1].product.checked) {
          //这里的stock表示为我们要购买的数量，传入后台使用
          this.select.goods.push({ id: good[1].product.id, stock: good[1].count});
        }
      });

      this.select.total_amount = this.getCount;

      if (this.select.goods.length < 1) return this.$message("未选择商品!");
      
      await getUrl(this.select).then((res) => {
        if(res.code == 200){
          document.querySelector('body').innerHTML = res.data; //查找到当前页面的body，将后台返回的form替换掉他的内容
          document.forms[0].submit(); //执行submit表单提交，让页面重定向，跳转到支付宝页面
        }else{
          this.$message("系统出错!")
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
