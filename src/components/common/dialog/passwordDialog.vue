<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogVisible"
    width="30%"
    :before-close="handlerClose"
  >
    <el-form
      :model="editForm"
      status-icon
      :rules="rules"
      ref="editForm"
      size="medium"
    >
      <el-form-item label="发送至" prop="mode">
        <el-radio-group v-model="editForm.mode" @change="handlerChange">
          <el-radio-button label="phone">手机</el-radio-button>
          <el-radio-button label="email">邮箱</el-radio-button>
        </el-radio-group>
      </el-form-item>

      <!-- 验证码 -->
      <el-form-item prop="code" class="item-from">
        <MyCode
          :mode="editForm.mode"
          :username="username"
          :isPass="isPass"
          :code.sync="editForm.code"
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
      <el-button @click="handlerSubmit">确 定</el-button>
      <el-button type="primary" @click="handlerClose">取 消</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { stripScript, validateEmail, validatePhone } from "@/utils/validate";
import MyCode from "@c/content/code";

import { EditAccount } from "@/api/user";

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
    user: {
      type: Object,
      default: () => {},
    },
  },
  data() {
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
        mode: "",
      },
      username: "",
      // 表单的验证规则
      rules: {
        password: [{ validator: validatePassword, trigger: "blur" }],
        code: [{ required: true, trigger: "blur", message: "验证码不为空" }],
        mode: [{ required: true, trigger: "blur", message: "验证码不为空" }],
      },
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
    /* 关闭事件 */
    handlerClose() {
      this.dialogVisible = false;
      this.resetFromData();
      this.$emit("update:visible", this.dialogVisible);
    },
    /* 确定 */
    handlerSubmit() {
      this.$refs.editForm.validate((valid) => {
        // 表单验证通过
        if (valid) {
          // 修改密码
          const requestData = {
            code: this.editForm.code,
            mode: this.editForm.mode,
            data: { password: this.editForm.password },
          };

          EditAccount(requestData).then((res) => {
            this.$message({
              type: "success",
              message: "修改成功",
            });

            this.$alert("重新登录", "提示", {
              confirmButtonText: "确定",
              callback: (action) => {
                this.$store.dispatch("user/remove_user");
                this.$router.push({ name: "login" });
              },
            });
          });

          this.resetFromData();
        } else {
          return false;
        }
      });
    },
    /* 切换模式 */
    handlerChange(val) {
      val = this.user[val];
      this.username = val + "";
      this.isPass = val ? true : false;
    },
    /**
     * 清除表单数据
     */
    resetFromData() {
      this.$refs.editForm.resetFields(); // 3.0
    },
  },
};
</script>

<style lang="scss" scoped></style>
