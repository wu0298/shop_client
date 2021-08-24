<template>
  <div class="con">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ name: 'caigou' }">采购大厅</el-breadcrumb-item>
      <el-breadcrumb-item>采购详情</el-breadcrumb-item>
    </el-breadcrumb>

    <div class="d">
    <div class="t">采购品种：{{cg.name}}</div>
    <div class="m">
      <div class="l">
        <div>采购数量：{{cg.store}}</div>
        <div>品质规格：{{cg.pzgg}}</div>
        <div>期待货源地：{{cg.address}}</div>
        <div>收货地：{{cg.shdz}}</div>
        <div>补充说明：{{cg.bz}}</div>
      </div>
      <div class="r">
        <div>发布采购时间：{{cg.createTime}}</div>
        <div>浏览次数：{{cg.llcs}}</div>
        <div>联系电话：{{cg.phone}}</div>
        <div>联系邮箱：{{cg.email}}</div>
      </div>
    </div>
    <div class="f">投资有风险，交易需谨慎</div>
  </div>
  </div>
  
</template>

<script>
import {getCgInfo} from '@/api/caigou'
import {
  mixin
} from '@/utils/mixin.js'
export default {
  name: 'cgInfo',
  mixins: [mixin],
  data() {
    return {
      cg: {
        id: '',
        name: '',
        store: '',        //数量
        address: '',      //期待地址
        adminId: '',
        adminName: '',
        isDelete: '',
        email: '',
        phone: '',
        createTime: '',
        updateTime: '',
        llcs: '',         //浏览次数
        pzgg: '',         //品质规格
        shdz: '',         //收货地址
        bz: ''
      }
    }
  },
  mounted(){
    this.init()
  },
  methods: {
    init(){
      const _this = this
      const id = this.$route.query.id
      getCgInfo(id).then( res => {
        console.log(res.data);
        this.cg = {...res.data}

        // this.good = {...res.data}
        // console.log(this.good);
      })
    }
  }
}
</script>

<style scope>

.con{
  width: 1090px;
  max-height: 650px;
  margin: 0 auto;
  padding: 10px 10px;
}
.m{
  display: flex;
  flex-direction: row;
}
.d{
  min-height: 300px;
  background-color: #fff;
}
.m .l{
  width: 500px;
  padding: 10px;
}
.t{
  margin-top: 15px;
  margin-bottom: 15px;
  padding: 10px;
  font-weight: 700;
  font-size:large;
}
.l>div{
  margin: 17px 0;
}
.r>div{
  margin: 17px 0;
}
.f{
  color: red;
  font-weight: 900;
  font-size: larger;
  text-align: center;
}
</style>