<template>
  <el-dialog
    title="收货地址"
    :visible.sync="dialogVisible"
    width="30%"
    :before-close="handleClose"
  >
    <el-form :model="form" ref="form" :rules="rules" label-width="90px">
      <el-form-item label="收件人" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="电话" prop="phone">
        <el-input v-model.number="form.phone"></el-input>
      </el-form-item>
      <el-form-item label="收货地址" prop="address">
        <MyDistpickedr :address.sync="form.address" />
      </el-form-item>
      <el-form-item label="详细地址" prop="detailed">
        <el-input v-model="form.detailed"></el-input>
      </el-form-item>
      <el-form-item label="默认">
        <el-radio-group v-model="form.defa">
          <el-radio-button :label="false">否</el-radio-button>
          <el-radio-button :label="true">是</el-radio-button>
        </el-radio-group>
      </el-form-item>
    </el-form>

    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary" @click="onSubmit">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import MyDistpickedr from "@c/content/distpickedr";
import { validatePhone } from "@/utils/validate";

import { GetAddress, EditAddress, CreateAddress } from "@/api/address";

export default {
  components: { MyDistpickedr },
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    id: {
      type: String,
      default: "",
    },
  },
  data() {
    // 验证用户名
    const validePhone = (rule, value, callback) => {
      if (value === "") {
        this.isPass = false;
        callback(new Error("请输入用户名"));
      } else if (validatePhone(value)) {
        callback(new Error("手机号码格式错误"));
      } else {
        callback(); //true
      }
    };

    return {
      dialogVisible: false,
      editId: "",
      form: {
        name: "",
        address: [],
        phone: "",
        detailed: "",
        defa: false,
      },
      rules: {
        name: [{ required: true, trigger: "blur", message: "收件人不为空" }],
        address: [{ required: true, trigger: "blur", message: "地址不为空" }],
        phone: [{ validator: validePhone, trigger: "blur" }],
        detailed: [
          { required: true, trigger: "blur", message: "详细地址不为空" },
        ],
      },
    };
  },
  mounted() {
    console.log("进入dialog");
    this.initOptions();
  },
  methods: {
    /* 初始化配置 */
    initOptions() {
      this.dialogVisible = this.visible;
      if (this.id) {
        this.editId = this.id;
        this.getAddress();
      }
    },
    /* 请求数据 */
    async getAddress() {
      /*
          根据传过来的 id 获取对应的信息
       */
      console.log("请求数据");
      const {data: res} = await GetAddress({id: this.editId})
      this.form = Object.assign({}, this.form, res);
      console.log(this.form);
    },
    /* 确认提交 */
    onSubmit() {
      // 表单验证通过
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.editId ? this.edit() : this.add();
        } else {
          return false;
        }
      });
    },
    /* 添加 */
    add() {
      /*
          请求添加接口
          添加完成返回回调函数
       */
      console.log(this.form);
      const data = JSON.parse(JSON.stringify(this.form))
      // 添加地址请求方法
      CreateAddress(data).then((res) => {
        if (res.code === 200) {
          this.$message("添加成功");
          this.$emit('cb')
          this.handleClose()
        }
      });
    },
    /* 修改 */
    edit() {
      /*
        发送请求修改地址 判断状态码是否为 200
        然后通过 $emit('cb', this.form) 修改父组件的数据
      */
      EditAddress({ data: this.form }).then((res) => {
        if (res.code === 200) {
          this.$message('修改成功')
          this.$emit('cb')
          this.handleClose()
        }
      });
    },
    /* 关闭之前 */
    handleClose() {
      this.dialogVisible = false;
      this.$refs.form.resetFields();
      this.$emit("update:visible", false);
      this.$emit("update:id", "");
      this.editId = "";
    },
  },
};
</script>

<style lang="scss" scoped>
.cascader {
  margin: 0;
}
</style>
