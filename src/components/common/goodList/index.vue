<template>
  <div class="goodList">
    <div v-if="goods.length > 0">
      <div class="container goods-list">
        <div @click="pushDetail(item.id)" class="goods-item" v-for="(item, index) in goods" :key="index">
          <div class="figure-img">
            <img height="200" width="200" :src="getUrl(item.picture)" alt="" />
          </div>
          <div class="title t_1">{{ item.name }}</div>
          <div class="price">{{ item.price }}元</div>
        </div>
      </div>

      <!-- 分页 -->
      <el-pagination
        v-if="options.pagination"
        class="category-pagination"
        background
        layout="prev, pager, next"
        :total="total"
        :page-size="20"
        :current-page="page"
        @current-change="currentChange"
      />
    </div>
    <div class="no_data" v-else>
      <img src="~@a/images/search/nodata.png" alt="" />
      <div class="btn" @click="$router.push({ name: 'home' })">继续逛</div>
    </div>
  </div>
</template>

<script>
import { getCategory } from "@/api/base";
import { mixin } from '@/utils/mixin.js'

export default {
  props: {
    good_options: {
      type: Object,
      default: () => {},
    },
  },
  mixins: [mixin],
  data() {
    return {
      options: {
        isRequest: true,
        pagination: true,
        query: "id",
      },
      page: 1,
      goods: [],
      total: 0,
    };
  },
  watch: {
    $route: {
      handler(newVal) {
        this.requestData();
      },
    },
  },
  mounted() {
    this.initOption();
  },
  methods: {
    // 初始化配置 {a=2,b} {a=3,c,d} => {a,b,c,d}
    initOption() {
      this.options = Object.assign({}, this.options, this.good_options);

      //如果 true && 才会执行后面的代码
      this.options.isRequest && this.requestData();
    },
    // 请求数据
    requestData() {
      const key = this.options.query; // c
      // 请求参数

  /**
   *  this.$route.query  = {c: 1}
   */
      console.log();
      const queryData = {
        url: `${this.options.requestUrl}?${key}=${this.$route.query[key]}&page=${this.page}`,
        data: {
          page: this.page,
          [key]: this.$route.query[key], // style: 3
        },
      };

      /**
       * 请求列表数据
       */
      getCategory(queryData).then((res) => {
        const { data, total } = res.data;
        this.goods = data;
        this.total = total;
      });
    },

    /* 换页 */
    currentChange(page) {
      this.page = page;

      // 再次请求数据
      this.requestData();
    },
    pushDetail(id){
      this.$router.push({
        name: "detail",
        query: { id: id },
      });
    }
  },
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
