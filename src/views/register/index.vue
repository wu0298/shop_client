<template>
  <div class="register">
    <div class="register-box">
      <img class="logo" @click="$router.push({ name: 'home' })" src="~@a/logo1.png" alt="" />
      <h3 class="title">注册源绿帐号</h3>
      <el-form :model="registerForm" status-icon :rules="rules" ref="registerForm" class="login_form" size="medium">
        <!-- 账号 -->
        <el-form-item prop="name" class="item-from">
          <label for="name">昵称：</label>
          <el-input id="name" type="text" v-model="registerForm.name" placeholder="输入您的昵称" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 账号 -->
        <el-form-item prop="username" class="item-from">
          <label for="username">账号：</label>
          <el-input id="username" type="text" v-model="registerForm.username" placeholder="用户名" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 账号 -->
        <el-form-item prop="email" class="item-from">
          <label for="email">邮箱</label>
          <el-input id="email" type="text" v-model="registerForm.email" placeholder="邮箱" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password" class="item-from">
          <label for="password">密码：</label>
          <el-input id="password" type="password" v-model="registerForm.password" placeholder="密码" autocomplete="off"></el-input>
        </el-form-item>

        <!-- 验证码 -->
        <el-form-item prop="code" class="item-from">
          <SendCode :email="registerForm.email" :username="registerForm.username" :mode="mode" :isPass="isPass" :code.sync="registerForm.code" />
        </el-form-item>

        <!-- 登录 -->
        <el-form-item>
          <el-button class="login-btn" @click="onSubmit">注册</el-button>
        </el-form-item>

        <!-- 去注册 -->
        <div class="to-singin">
          <span @click="$router.push('/login')">立即登录</span> |
          <span @click="visible = true">忘记密码?</span>
        </div>
      </el-form>
    </div>

    <!-- 修改密码弹窗 -->
    <MyDialog title="修改密码" :visible.sync="visible" />
  </div>
</template>

<script>
import { stripScript, validateEmail, validatePhone } from "@/utils/validate";
import SendCode from "@c/content/code";
import MyDialog from "@c/common/dialog";

import { Register, Verify } from "@/api/user";

export default {
  components: { SendCode, MyDialog },
  data() {
    // 验证用户名
    const validateUsername = (rule, value, callback) => {
      if (value === "") {
        this.isPass = false;
        callback(new Error("请输入用户名"));
      } else {
        // const res1 = validateEmail(value);
        // const res2 = validatePhone(value);
        // if (res1 && res2) {
        //   this.isPass = false;
        //   return callback(new Error("用户名格式错误"));
        // }

        // if (!res1) this.mode = "email";
        // if (!res2) this.mode = "phone";

        // this.isPass = true;

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
        callback(new Error("密码长度不能小于6位和超过20位"));
      } else {
        callback();
      }
    };

    return {
      // 表单数据
      registerForm: {
        name: "",
        username: "",
        password: "",
        email: "",
        code: "",
      },
      // 表单的验证规则
      rules: {
        username: [{ validator: validateUsername, trigger: "blur" }],
        password: [{ validator: validatePassword, trigger: "blur" }],
        name: [{ required: true, trigger: "blur", message: "昵称不为空" }],
        code: [{ required: true, trigger: "blur", message: "验证码不为空" }],
      },
      // 账号类型
      mode: "",
      // 账号是否通过
      isPass: false,
      // 弹窗显示隐藏
      visible: false,
    };
  },
  methods: {
    /**
     * 提交表单
     */
    onSubmit() {
      this.$refs.registerForm.validate((valid) => {
        // 表单验证通过
        if (valid) {
          // 参数
          const data = { ...this.registerForm };
          delete data.code
          // for (let key in this.registerForm) {
          // if (key === "username") data[this.mode] = this.registerForm[key];
          //   else data[key] = this.registerForm[key];
          // }
          // data.mode = this.mode;

          Verify({code: this.registerForm.code,
                  username: this.registerForm.username}).then((res) => {
            // 注册
            if (res.code == 200) {
              Register(data).then((res) => {
                // 如果状态码为 200
                if (res.code === 200) {
                  this.$message({
                    showClose: true,
                    message: "注册成功",
                    duration: 0,
                  });

                  this.resetFromData();
                }
              });
            }else{
              this.$message({
                showClose: true,
                message: "验证码有误",
                duration: 0,
              });
            }
          });
        } else {
          return false;
        }
      });
    },

    /**
     * 清除表单数据
     */
    resetFromData() {
      this.$refs.registerForm.resetFields(); // 3.0
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
