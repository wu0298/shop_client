<template>
  <div class="wrap">
    <!-- 添加 -->
    <el-button type="primary" @click="add" class="add_address">添加地址</el-button>
    <div class="address" v-if="address.length > 0">
      <!-- 用户收货信息 -->
      <el-card
        shadow="hover"
        class="box-card"
        v-for="(item, index) in address"
        :key="index"
      >
        <el-row class="item">
          <el-col class="title" :span="6">收件人：</el-col>
          <el-col class="content" :span="18">{{ item.name }}</el-col>
        </el-row>
        <el-row class="item">
          <el-col class="title" :span="6">电话：</el-col>
          <el-col class="content" :span="18">{{ item.phone }}</el-col>
        </el-row>
        <el-row class="item">
          <el-col class="title" :span="6">地址：</el-col>
          <el-col class="content" :span="18">{{
            item.address | addressToString
          }}</el-col>
        </el-row>
        <el-row class="item">
          <el-col class="title" :span="6">详细地址：</el-col>
          <el-col class="content t_2" :span="18">{{ item.detailed }}</el-col>
        </el-row>
        <div v-if="item.defa" class="default">默认</div>
        <div class="tip">
          <span class="edit" @click="edit(item.id)">修改</span>
          <span class="del" @click="del(item.id, index)">删除</span>
        </div>
      </el-card>
    </div>

    <div v-else class="not_address">
      <img src="~@a/images/cart/not_card.png" alt="" />
      <p class="tip">无收货地址</p>
    </div>
    <!-- 弹出层 -->
    <AddressDialog
      ref="dialog"
      v-if="visible"
      @cb="getAllAddress"
      :visible.sync="visible"
      :id.sync="address_id"
    />
  </div>
</template>

<script>
import { initAddress } from "@/utils/address";
import AddressDialog from "@c/common/dialog/addressDialog";

import { GetAllAddress, DelAddress } from "@/api/address";

export default {
  components: { AddressDialog },
  mounted() {
    this.getAllAddress();
  },
  data() {
    return {
      address_id: "",
      visible: false,
      address: [],
    };
  },
  filters: {
    // 地址转换成中文
    addressToString(val) {
      return initAddress(val);
    },
  },
  methods: {
    /* 获取所有的地址 */
    getAllAddress() {
      console.log("==========");
      GetAllAddress().then((res) => {
        // 赋值给 address 数组
        this.address = res.data;
        console.log(this.address);
      });
    },
    /* 显示弹窗修改地址 */
    edit(id) {
      this.address_id = id;
      this.visible = true;
    },
    /* 删除地址 */
    del(id, index) {
      /*
        根据 id 删除地址 
        删除成功的话可以重新请求或者直接修改数据不重新请求
      */
      this.$confirm("此操作将删除该地址, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          DelAddress({ id }).then((res) => {
            if (res.code === 200) {
              this.$message("删除成功");
              this.address.splice(index, 1);
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    /* 添加 */
    add() {
      this.visible = true;
    },
    /* 地址增加修改方法 */
    callback(res) {
      /*
          可以重新请求收货地址也可以不重新请求直接修改数据
          （虚假数据，下次刷新或者重进页面会再次请求数据）
       */
      //解构，type为 add或edit， data为传输的数据
      const { type, data } = res;

      if (type === "add") {
        this.address.unshift(data);
      } else {
        this.address.map((item) => {
          if (item._id === this.address_id) {
            item = Object.assign(item, data);
          }
        });
      }

      this.$refs.dialog.handleClose();
    },
  },
};
</script>

<style lang="scss" scoped>
.wrap {
  position: relative;
  .not_address {
    display: flex;
    flex-direction: column;
    align-items: center;
    .tip {
      margin-top: 30px;
      font-size: 24px;
      color: #a19999;
    }
  }

  .add_address {
    position: absolute;
    right: 0;
    top: -20px;
  }
  .address {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
}
.box-card {
  width: 380px;
  height: 180px;
  position: relative;
  box-sizing: border-box;
  padding: 10px;
  margin: 10px 0;
  .tip {
    position: absolute;
    right: 0;
    top: 10px;
    span {
      padding: 0 10px;
      cursor: pointer;
      &:hover {
        color: #e64444;
      }
    }
  }
}
.title {
  font-size: 14px;
  height: 30px;
}

.default {
  position: absolute;
  width: 75px;
  text-align: center;
  color: #fff;
  background: #cf3333;
  top: 5px;
  left: -10px;
  transform: rotate(-30deg);
}
</style>
