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
          :action="avatarUrl(form.id)"
          :show-file-list="false"
          :before-upload="beforeAvatarUpload" :on-success="uploadAvatarSuccess"
        >
          <img :src="getUrl(form.avatar)" class="avatar" />
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
import { getUser, setUser } from "@/utils/storage";
import { Upload, EditAccount, getUserByToken } from "@/api/user";
import { mixin } from '@/utils/mixin.js'

import EditCode from "@c/content/code/edit";

export default {
  components: { EditCode },
  mixins: [mixin],
  data() {
    return {
      that: "",
      // 表单数据
      form: {
        id: "",
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
    avatarUrl(id) {
      return `${process.env.VUE_APP_API}/user/uploadAvatar?id=${id}`;
    },
    //上传图片成功后执行
    async uploadAvatarSuccess(res,file){
      const _this = this //保存父对象的this指向
      if (res.code == 200) {
        await getUserByToken().then( res => {
          setUser(res.data)
          _this.$store.state.user.user = res.data
        })
        _this.initUser()
      }else{
        _this.$notify({
          title: '上传失败',
          type: 'error'
        })
      }
    },
    /* 修改邮箱 */
    editEmail() {},
    // 数据提交
    onSumbit() {
      if (!this.form.name) return;

      // 只获取昵称和性别、头像
      const data = {
        id: this.form.id,
        name: this.form.name,
        sex: this.form.sex,
        phone: this.form.phone,
        email: this.form.email,
        autograph: this.form.autograph
      };

      EditAccount(data).then((res) => {
        if (res.code === 200) {
          this.$message("修改成功");
          this.$store.commit("user/SET_USER", res.data);
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
