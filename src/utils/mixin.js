export const mixin = {
  computed: {
    headers(){
      return{
        'Authorization': localStorage.getItem('Authorization')
      }
    }
  },
  methods: {
    //提示信息
    notify(title,type){
      this.$notify({
        title: title,
        type: type
      })
    },
    //
    message(message,type){
      this.$message({
        message: message,
        type: type
      })
    },
    //根据相对链接获取服务器地址
    getUrl(url){
      if(!url) return null
      const str = url.substr(0, 5)
      if(str == "//img") return url
      return `${this.$store.state.HOST}${url}`
    },
    //获取类型中文
    changeStyle(value){
      if(value == 1){
        return '水果'
      }
      if(value == 2){
        return '蔬菜'
      }
      return value
    },
    //获取性别中文
    changeSex(value){
      if(value == 1){
        return '女'
      }
      if(value == 2){
        return '男'
      }
      return value
    },
    //将日期转化为yyyy-mm-dd HH:mm:ss
    fmDate(d){
      d = new Date(d)
      const year = d.getFullYear()
      const month = d.getMonth()<9?'0'+(d.getMonth()+1):(d.getMonth()+1)
      const day = d.getDate()<10?'0'+d.getDate():d.getDate()
      const hour = d.getHours()<10?'0'+d.getHours():d.getHours()
      const minutes = d.getMinutes()<10?'0'+d.getMinutes():d.getMinutes()
      const seconds = d.getSeconds()<10?'0'+d.getSeconds():d.getSeconds()
      return year + '-' + month + '-' + day + ' ' + hour + ':' + minutes + ':' + seconds
    },
    //获取生日 yyyy-mm-dd
    attachBirth(val){
      return String(val).substr(0,10)
    },
    attachTime(val){
      return String(val).substr(11)
    },
    //上传图片之前的校验
    beforeAvatarUpload(file){
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
    },
    //上传图片成功后执行
    handleAvatarSuccess(res,file){
      let _this = this //保存父对象的this指向
      if (res.code == 200) {
        _this.getData()
        _this.$notify({
          title: '上传成功',
          type: 'success'
        })
      }else{
        _this.$notify({
          title: '上传失败',
          type: 'error'
        })
      }
    },
    //点击弹出删除框
    handleDelete(id){
      this.idx = id
      this.deleteVisible = true
    },
    //把已经选择的项赋值给multipleSelection
    handleSelectionChange(val){
      this.multipleSelection = val
    },
    getStatus(val){
        switch(val){
        case 0: return '未支付'
        case 1: return '已支付'
        case 2: return '已发货'
        case 3: return '申请退款'
        case 4: return '退款中'
        case 5: return '退款成功'
        case 6: return '交易完成'
        case 7: return '支付失败'
        default: return '出现了问题'
      }
    }
  }
}