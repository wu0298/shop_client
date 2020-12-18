<template>
  <div class="mine">
    <el-form
      :mode="form"
      size="medium"
      ref="form"
      label-width="80px"
      style="width: 600px"
    >
      <!-- 头像 -->
      <el-form-item>
        <el-upload
          class="avatar-uploader"
          :action="avatarUrl"
          :show-file-list="false"
          :http-request="uploadFile"
          :before-upload="beforeAvatarUpload" :on-success="handleAvatarSuccess"
        >
          <img :src="imgUrl" class="avatar" />
        </el-upload>
      </el-form-item>

      <!-- 昵称 -->
      <el-form-item label="昵称">
        <el-input v-model="form.name" style="width: 300px"></el-input>
      </el-form-item>

      <!-- 个人介绍 -->
      <el-form-item label="个人介绍">
        <el-input v-model="form.autograph" style="width: 300px"></el-input>
      </el-form-item>

      <!-- 手机 -->
      <el-form-item label="手机">
        <el-input v-model="form.phone" style="width: 300px"></el-input>
      </el-form-item>
      <!-- <el-form-item label="手机">
        <EditCode
          :isShow.sync="isShowPhone"
          :value="form.phone + ''"
          :options="phoneOptions"
          @cb="onCallback"
        />
      </el-form-item> -->
      
      <!-- 邮箱 -->
      <el-form-item label="邮箱">
        <EditCode
          :isShow.sync="isShowEmail"
          :value="form.email"
          :options="emailOptions"
          @cb="onCallback"
        />
      </el-form-item>

      <!-- 性别 -->
      <el-form-item label="性别" prop="sex">
        <el-radio-group v-model="form.sex">
          <el-radio-button :label="2">男</el-radio-button>
          <el-radio-button :label="1">女</el-radio-button>
          <el-radio-button :label="0">未知</el-radio-button>
        </el-radio-group>
      </el-form-item>

      <!-- 按钮 -->
      <el-form-item class="btn-grown">
        <el-button class="btn" type="primary" @click="onSumbit">确定</el-button>
        <el-button class="btn" type="danger" @click="initUser">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getUser } from "@/utils/storage";
import { Upload, EditUser } from "@/api/user";

import EditCode from "@c/content/code/edit";

export default {
  components: { EditCode },
  data() {
    return {
      // 表单数据
      form: {
        name: "",
        email: "",
        phone: "",
        sex: "",
        avatar: "",
        autograph: ""
      },
      imgUrl: "",
      // 表单的验证规则
      rules: {
        name: [{ required: true, trigger: "blur", message: "名字不为空" }],
      },
      isShowEmail: false, // 显示邮箱
      isShowPhone: false, // 显示手机
      // 邮箱配置
      emailOptions: {
        mode: "email", // 类型
      },
      // 手机配置
      phoneOptions: {
        mode: "phone",
      },
    };
  },
  computed: {
    avatarUrl() {
      return `${process.env.VUE_APP_API}/upload`;
    },
  },
  watch: {
    emailVal: {
      handler(newVal) {
        this.email.isPassEamil = validateEmail(newVal) ? false : true;
      },
    },
    phoneVal: {
      handler(newVal) {
        this.phone.isPassPhone = validatePhone(newVal) ? false : true;
      },
    },
  },
  mounted() {
    this.initUser();
  },
  methods: {
    // 初始化数据
    initUser() {
      this.form = Object.assign({}, this.form, getUser());

      this.imgUrl = this.form.avatar;
    },
    /* 上传头像 */
    uploadFile(data) {
      let formdata = new FormData();

      formdata.append("file", data.file);
      formdata.append("op", "avatar");
      formdata.append("data", JSON.stringify({}));

      Upload(formdata).then((res) => {
        this.imgUrl = res.data.imgUrl;
      });
    },
    /* 修改邮箱 */
    editEmail() {},
    // 数据提交
    onSumbit() {
      if (!this.form.name) return;

      // 只获取昵称和性别、头像
      const data = {
        name: this.form.name,
        sex: this.form.sex,
      };
      const isOther = this.imgUrl !== this.form.avatar;
      if (isOther) data.avatar = this.imgUrl;

      EditUser(data).then((res) => {
        if (res.statusCode === 200) {
          this.$message("修改成功");

          this.$store.commit("user/SET_USER", this.form);
        }
      });
    },
    // 监听回调
    onCallback(data) {
      const { mode, val } = data;

      // 更新数据
      this.form[mode] = val;
      this.$store.commit("user/SET_USER", this.form);
    },
  },
};
</script>

<style lang="scss" scoped>
.mine {
  width: 600px;
  margin: 0 auto;
  padding: 0 30px;
  // text-align: center;
}
.btn-grown {
  margin: 40px 50px;

  .btn {
    width: 100px;
  }
}

.el-upload {
  cursor: pointer;
  overflow: hidden;
  display: block !important;
}

.avatar-uploader {
  margin-left: 100px;
}

.avatar {
  width: 100px;
  height: 100px;
  display: block;
  border-radius: 50%;
  padding: 2px;
  border: 4px solid #bdc0c7;
}
</style>
