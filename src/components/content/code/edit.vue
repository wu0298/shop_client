<template>
  <el-row>
    <el-col :span="12">
      <div v-if="show">
        <el-input v-model="val"></el-input>
        <MyCode
          style="margin-top: 10px"
          :username="val"
          :email.sync="val"
          :mode="edit_options.mode"
          :isPass="edit_options.isPass"
          :code.sync="edit_options.code"
          :title="false"
        />
      </div>

      <el-input v-else :value="value" disabled></el-input>
    </el-col>
    <el-col :span="show ? 10 : 6">
      <div v-if="show">
        <el-button @click="edit" :disabled="!edit_options.code">确定</el-button>
        <el-button @click="restForm">取消</el-button>
      </div>

      <el-button v-else @click="show = true"
        >修改{{
          edit_options.mode === "email" ? "邮箱" : "手机号码"
        }}</el-button
      >
    </el-col>
  </el-row>
</template>

<script>
import MyCode from "@c/content/code";
import { validateEmail, validatePhone } from "@/utils/validate";
import { EditAccount } from "@/api/user";

export default {
  components: { MyCode },
  props: {
    isShow: {
      type: Boolean,
      default: false,
    },
    options: {
      type: Object,
      default: () => {},
    },
    value: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      edit_options: {
        isPass: false, // 通过
        val: "", // 值
        code: "", // 验证码
      },
      val: "",
      show: false,
    };
  },
  watch: {
    val: {
      handler(newVal) {
        this.$emit('update:value', newVal)
        if (this.edit_options.mode === "email") {
          this.edit_options.isPass = validateEmail(newVal) ? false : true;
        } else {
          this.edit_options.isPass = validatePhone(newVal) ? false : true;
        }
      },
    },
  },
  mounted() {
    this.initOptions();
  },
  methods: {
    /* 初始化配置 */
    initOptions() {
      this.edit_options = Object.assign({}, this.edit_options, this.options);
      this.val = this.edit_options.val;
      this.show = this.isShow;
    },
    /*
    编辑这里

      判断类型  如果是 email phone

    */
    edit() {
      // 如果他的配置的 isPass 不通过或者验证码的长度为 0 则直接返回
      const pass = !this.edit_options.isPass || !this.edit_options.code.length;
      if (pass) return;

      // 请求参数
      const mode = this.edit_options.mode;
      const data = {
        mode,
        code: this.edit_options.code,
        data: {
          [mode]: mode === "phone" ? +this.val : this.val,
        },
      };

      // 修改信息
      EditAccount(data).then((res) => {
        if (res.statusCode !== 200) return;
        this.$message("修改成功");

        // 触发回调函数 触发父级方法同步修改值
        this.$emit("cb", {
          mode: this.edit_options.mode,
          val: this.val,
        });

        // 清除表单
        this.restForm();
      });
    },
    // 清除表单
    restForm() {
      this.val = "";
      this.edit_options.code = "";
      this.show = false;
      this.$emit("update:isShow", false);
    },
  },
};
</script>

<style lang="scss" scoped></style>
