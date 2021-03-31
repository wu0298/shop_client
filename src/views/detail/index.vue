<template>
  <div class="detail">
    <!-- <div class="tip container">
      为方便您购买，请提前登录<router-link class="login" to="/login"
        >立即登录</router-link
      >
    </div> -->

    <div class="product-box container">
      <div class="img-left">
        <img
          width="499.99px"
          height="499.99px"
          style="width: 100%"
          :src="getUrl(good.picture)"
          alt=""
        />
      </div>

      <div class="product-con">
        <!-- 商品详情 -->
        <h2>{{good.name}}</h2>
        <p class="sale-desc">
          {{good.autograph}}
        </p>
        <p class="business">{{good.adminName}}</p>
        <p class="price">{{good.price}} 元</p>
        <div class="line"></div>

        <!-- 地址栏 start -->
        <div class="address-box">
          <i class="iconfont icon-dizhi"></i>
          <div class="address-info" v-if="isShow">
            <span>北京</span>
            <span>北京市</span>
            <span>海淀区</span>
            <span>清河街道</span>
          </div>
          <MyDistpickedr v-else />

          <div class="edit" @click="editAddress">
            {{ isShow ? "修改" : "确定" }}
          </div>
        </div>
        <!-- 地址栏 end -->

        <!--  -->
        <div class="selected-list">
          <div class="list_top">
            <div class="top_left">{{good.name}}</div>
            <div class="top_right">{{good.price}}元</div>
          </div>
          <div class="list_bottom">总计：{{good.price}}元</div>
        </div>

        <!-- 购买 and 收藏 -->
        <div class="btn-box">
          <div class="sale-btn" @click="addCart()">添加至购物车</div>
          <div class="favorite-btn">收藏</div>
        </div>
      </div>
    </div>

    <div class="product-detail">
      <div class="section-plain_view container">
        <div class="title">价格说明</div>
        <div class="img-box">
          <img src="~@a/images/detail/detail_ad.jpeg" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MyDistpickedr from "@c/content/distpickedr";
import MyData from "china-area-data/data";
import {getDetail} from "@/api/base.js"
import { apiAddCart } from "@/api/cart.js"
import { setCart } from '@/utils/storage';
import { mixin } from '@/utils/mixin.js'

export default {
  components: { MyDistpickedr },
  mixins: [mixin],
  data() {
    return {
      isShow: true,
      address: {
        province: "",
        city: "",
        area: "",
      },
      good: {
        name: "",
        price: "",
        autograph: "",
        picture: "",
        amdinId: "",
        stock: "",
        adminName: "",
        style: "",
        createTime: "",
        updateTime: "",
      }
    };
  },
  created(){
    this.initGood()
  },
  mounted() {
    this.initAddress();
  },
  methods: {
    //获取商品信息
    initGood(){
      const _this = this
      const id = this.$route.query.id
      getDetail(id).then( res => {
        this.good.name = res.data.name
        this.good.price = res.data.price
        this.good.autograph = res.data.autograph
        this.good.picture = res.data.picture
        this.good.amdinId = res.data.amdinId
        this.good.stock = res.data.stock
        this.good.adminName = res.data.adminName
        this.good.style = res.data.style
        this.good.createTime = res.data.createTime
        this.good.updateTime = res.data.updateTime

        // this.good = {...res.data}
        // console.log(this.good);
      })
    },
    initAddress() {
      const ad = ["430000", "430100", "430103"];
      this.address.province = MyData[86][ad[0]];
      this.address.city = MyData[ad[0]][ad[1]];
      this.address.area = MyData[ad[1]][ad[2]];
    },
    editAddress() {
      this.isShow = !this.isShow;
    },
    //添加进购物车
    addCart(){
      const obj = this.$store.state.user.user
      if (obj == undefined || obj == ""){
        this.$message({
          message: "请先登录",
          type: "warn;"
        })
        return
      }
      const data = new URLSearchParams()

      data.set('userId', obj.id)
      data.set('goodId', this.$route.query.id)
      apiAddCart(data).then( res => {
        if(res.code == 200) {
          this.$message('加入购物车成功')
        }
        setCart(res.data)
        this.$store.state.cart.cart = res.data
      })
    }
  },
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>