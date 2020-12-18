<template>
  <div class="code">
    <label for="code" v-if="title">验证码：</label>
    <el-row>
      <el-col :span="17"> 
        <el-input id="code" v-model="sum" placeholder="验证码" autocomplete="off"></el-input>
      </el-col>
      <el-col :span="6">
        <el-button @click="getEmailCode">获取验证码</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { GetSms, PhoneCode } from "@/api/user";

export default {
  props: {
    title: {
      type: Boolean,
      default: true,
    },
    code: {
      type: String,
      default: "",
    },
    isPass: {
      type: Boolean,
      default: false,
    },
    mode: {
      type: String,
      default: "",
    },
    username: {
      type: String,
      default: "",
    },
    email: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      sum: "",
    };
  },
  mounted() {
    this.sum = this.code;
  },
  watch: {
    // 监听 sum 的变化
    sum: {
      handler(newVal) {
        this.$emit("update:code", this.sum);
      },
    }
  },
  methods: {
    // 点击发送验证码
    handlerSendCode() {
      if (this.isPass) {
        this.mode === "email" ? this.getEmailCode() : this.getPhoneCode();
      }
    },
    /**
     * 邮箱短信验证
     */
    getEmailCode() {
      const data = {
        email: this.email,
        username: this.username
      }
      GetSms(data).then((res) => {
        this.$message("发送成功");
      });
    },
    /**
     * 手机短信验证
     */
    getPhoneCode() {
      PhoneCode({
        phone: +this.username,
        mode: this.mode,
      }).then((res) => {
        this.$message("发送成功");
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
