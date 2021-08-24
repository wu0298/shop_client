<template>
  <div class="login">
    <div class="login_top">
      <div class="container" @click="$router.push({ name: 'home' })">
        <img width="250" height="98" src="~@a/logo.png" alt="" />
      </div>
    </div>
    <div class="login_main">
      <video class="login_video" autoplay muted loop src="~@a/video/login_ad.mp4"></video>
      <el-form :model="loginForm" status-icon :rules="rules" ref="loginForm" class="login_form" size="medium">
        <div class="form_top">登录</div>
        <!-- 用户名 -->
        <el-form-item v-if="model === 'login'" prop="username" class="item-from">
          <label for="username">账号：</label>
          <el-input id="username" type="text" v-model="loginForm.username" placeholder="用户名" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item v-if="model === 'login'" prop="password" class="item-from">
          <label for="password">密码：</label>
          <el-input id="password" type="password" v-model="loginForm.password" placeholder="密码" autocomplete="off"></el-input>
        </el-form-item>

        <!-- 电话 -->
        <!-- <el-form-item v-if="model === 'phone'" prop="username" class="item-from">
          <el-col :span="22"
            ><el-input placeholder="手机号码" v-model="loginForm.username">
              <template slot="prepend">+86</template>
            </el-input></el-col
          >
        </el-form-item> -->

        <!-- 验证码 -->
        <!-- <el-form-item v-if="model === 'phone'" prop="code" class="item-from">
          <MyCode :username="loginForm.username" :mode="mode" :isPass="isPass" :code.sync="loginForm.code" />
        </el-form-item> -->

        <!-- 登录 -->
        <el-form-item>
          <el-button class="login-btn" @click="onSubmit">登录</el-button>
          <!-- <p class="login-phone" v-if="model === 'login'" @click="handlerSelect('phone')">手机短信登录/注册</p>
          <p class="login-phone" v-if="model === 'phone'" @click="handlerSelect('login')">用户名密码登录</p> -->
        </el-form-item>

        <!-- 去注册 -->
        <div class="to-singin">
          <span @click="$router.push('/register')">立即注册</span> |
          <span @click="showDialog">忘记密码?</span>
        </div>
      </el-form>
    </div>

    <!-- 修改密码弹窗 -->
    <MyDialog title="修改密码" :visible.sync="visible" />
    <MyFooter />
  </div>
</template>

<script>
import { stripScript, validateEmail, validatePhone } from "@/utils/validate";

import MyFooter from "@c/common/footer";
import MyDialog from "@c/common/dialog";
import MyCode from "@c/content/code";

import { mapActions } from "vuex";

export default {
  components: { MyFooter, MyDialog, MyCode },
  data() {
    // 验证用户名
    const validateUsername = (rule, value, callback) => {
      if (value === "") {
        this.isPass = false;
        return callback(new Error("请输入用户名"));
      } else {
        //自定义验证规则
        // const res1 = validatePhone(value);
        // const res2 = validateEmail(value);
        // if (this.model === "phone") {
        //   if (res1) return callback(new Error("手机号码格式错误"));
        // } else if (this.model === "login") {
        //   if (res2 && res1) return callback(new Error("用户名格式错误"));
        // }

        // if (!res1) this.mode = "phone";
        // if (!res2) this.mode = "email";
        // this.isPass = true;
        //正确放回true
        callback(); //true
      }
    };

    // 验证密码
    let validatePassword = (rule, value, callback) => {
      // 过滤后的数据
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (stripScript(value)) {
        callback(new Error("只能是数字、字母和中文组成"));
      } else if (value.length < 3 || value.length > 20) {
        callback(new Error("密码长度不能小于3位和超过20位"));
      } else {
        callback();
      }
    };

    return {
      // 模式
      model: "login", // login phone
      // 登录表单数据
      loginForm: {
        username: "",
        password: "",
        code: "",
      },
      // 表单的验证规则
      rules: {
        username: [{ validator: validateUsername, trigger: "blur" }],
        password: [{ validator: validatePassword, trigger: "blur" }],
        code: [{ required: true, trigger: "blur", message: "验证码不为空" }],
      },
      /* 是否通过 */
      isPass: false,
      mode: "",
      /* 显示弹窗 */
      visible: false,
    };
  },
  methods: {
    ...mapActions({
      setUser: "user/set_user",
      setCart: "cart/getCart",
    }),
    /**
     * 提交表单
     */
    onSubmit() {
      this.$refs.loginForm.validate((valid) => {
        // 表单验证通过
        if (valid) {
          this.model === "login" ? this.login() : this.phoneCode();
        } else {
          return false;
        }
      });
    },
    /**
     * 账号登录
     */
    login() {
      // 登录
      const data = {
        username: this.loginForm.username,
        password: this.loginForm.password,
      };

      // 调用 vuex 的账号登录方法
      this.$store.dispatch("user/set_user", { data }).then(async (res) => {
        console.log(res);
        if (res.status) {
          await this.setCart()
          this.$router.push({ name: "home" });
        }else{

        }
      }).catch( res => {
        this.$message({
        message: res.msg,
        type: 'error'
      })
      });
    },
    /**
     * 验证码登录
     */
    // phoneCode() {
    //   const data = {
    //     [this.mode]: this.loginForm.username,
    //     code: this.loginForm.code,
    //   };

    //   // 调用 vuex 的账号登录方法
    //   this.$store.dispatch("user/set_user", { mode: this.model, data }).then((res) => {
    //     if (res.status) this.$router.push({ name: "home" });
    //   });
    // },
    /**
     * 清除表单数据
     */
    resetFromData() {
      this.$refs.loginForm.resetFields(); // 3.0
    },
    /**
     * 切换模式
     */
    // handlerSelect(model) {
    //   this.model = model;

    //   this.resetFromData();
    // },
    /**
     * 显示弹窗
     */
    showDialog() {
      this.visible = true;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
