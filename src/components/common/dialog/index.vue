<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogVisible"
    width="30%"
    :before-close="resetFromData"
  >
    <el-form
      :model="editForm"
      status-icon
      :rules="rules"
      ref="editForm"
      size="medium"
    >
      <!-- 用户名 -->
      <el-form-item prop="username" class="item-from">
        <label for="username">账号：</label>
        <el-input
          id="username"
          type="text"
          v-model="editForm.username"
          placeholder="邮箱/手机号码"
          autocomplete="off"
        ></el-input>
      </el-form-item>

      <!-- 验证码 -->
      <el-form-item prop="code" class="item-from">
        <MyCode
          :mode="mode"
          :isPass="isPass"
          :code.sync="editForm.code"
          :username="editForm.username"
        />
      </el-form-item>
      <!-- 密码 -->
      <el-form-item prop="password" class="item-from">
        <label for="password">密码：</label>
        <el-input
          id="password"
          type="password"
          v-model="editForm.password"
          placeholder="密码"
          autocomplete="off"
        ></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="handlerSubmit">确 定</el-button>
      <el-button @click="resetFromData">取 消</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { stripScript, validateEmail, validatePhone } from "@/utils/validate";
import MyCode from "@c/content/code";

import { EditPassword } from "@/api/user";

export default {
  components: { MyCode },
  props: {
    title: {
      type: String,
      default: "修改密码",
    },
    visible: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    // 验证用户名
    const validateUsername = (rule, value, callback) => {
      if (value === "") {
        this.isPass = false;
        callback(new Error("请输入用户名"));
      } else {
        const res1 = validatePhone(value);
        const res2 = validateEmail(value);
        if (res2 && res1) return callback(new Error("用户名格式错误"));

        if (!res1) this.mode = "phone";
        if (!res2) this.mode = "email";

        this.isPass = true;
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
      } else if (value.length < 6 || value.length > 20) {
        callback(new Error("密码长度不能小于6位和超过20位"));
      } else {
        callback();
      }
    };
    return {
      // 显示隐藏
      dialogVisible: false,
      // 修改密码表单数据
      editForm: {
        password: "",
        code: "",
        username: "",
      },
      // 表单的验证规则
      rules: {
        username: [{ validator: validateUsername, trigger: "blur" }],
        password: [{ validator: validatePassword, trigger: "blur" }],
        code: [{ required: true, trigger: "blur", message: "验证码不为空" }],
      },
      mode: "",
      isPass: false,
    };
  },
  watch: {
    visible: {
      handler(newVal) {
        this.dialogVisible = newVal;
      },
    },
  },
  methods: {
    /* 确定 */
    handlerSubmit() {
      this.$refs.editForm.validate((valid) => {
        // 表单验证通过
        if (valid) {
          // 修改密码
          EditPassword({ mode: this.mode, ...this.editForm }).then((res) => {
            console.log(res);
            if (res.statusCode === 200) {
              this.$message("修改成功");
              this.resetFromData();
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
      this.dialogVisible = false;
      this.$refs.editForm.resetFields(); // 3.0
      this.$emit("update:visible", this.dialogVisible);
    },
  },
};
</script>

<style lang="scss" scoped></style>
