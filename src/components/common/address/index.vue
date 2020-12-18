<template>
  <el-dialog
    title="选择地址"
    :visible.sync="dialogVisible"
    width="50%"
    :before-close="close"
  >
    <div class="address" v-if="address.length > 0">
      <!-- 用户收货信息 -->
      <el-card
        shadow="hover"
        :class="['box-card', { isActive: address_id === item.id }]"
        v-for="(item, index) in address"
        :key="index"
        @click.native="selectAddress(item.id)"
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
          <el-col class="content" :span="18">{{ item.address | addressToString }}</el-col>
        </el-row>
        <el-row class="item">
          <el-col class="title" :span="6">详细地址：</el-col>
          <el-col class="content t_2" :span="18">{{ item.detailed }}</el-col>
        </el-row>
        <div v-if="item.default" class="default">默认</div>
      </el-card>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="onSubmit">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { GetAllAddress } from "@/api/address";
import { initAddress } from "@u/address";

export default {
  props: {
    visble: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      address: [],
      address_id: "",
      dialogVisible: false,
    };
  },
  watch: {
    visble: {
      handler(newVal) {
        this.dialogVisible = this.visble;
      },
    },
  },
  filters: {
    // 地址转换成中文
    addressToString(val) {
      return initAddress(val);
    },
  },
  mounted() {
    this.getAllAddress();
  },
  methods: {
    /* 获取所有的地址 */
    getAllAddress() {
      GetAllAddress().then((res) => {
        // 赋值给 address 数组
        this.address = res.data;
      });
    },
    /* 选择地址 */
    selectAddress(id) {
      this.address_id = id;
    },
    /* 关闭 */
    close() {
      this.$emit("update:visble", false);
      this.address_id = "";
    },
    /* 确认 */
    onSubmit() {
      if (!this.address_id) {
        this.$message("未选择地址");
      } else {
        this.$emit("cb", this.address_id);
        this.close();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.address {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

.isActive {
  border: 3px solid #e64444;
}

.box-card {
  width: 380px;
  height: 180px;
  position: relative;
  box-sizing: border-box;
  padding: 10px;
  margin: 10px 0;
  cursor: pointer;
  &:hover {
    .tip {
      display: block;
    }
  }
  .tip {
    position: absolute;
    right: 0;
    display: none;
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
