<template>
<div class="table">
  <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ name: 'caigou' }">采购大厅</el-breadcrumb-item>
      <!-- <el-breadcrumb-item>{{ showTitle($route.name) }}</el-breadcrumb-item> -->
    </el-breadcrumb>
    <div class="caigou">
      <el-table size="mini" border style="" height="450px" :data="tableData" @selection-change="handleSelectionChange">
        <el-table-column type="index" align="center" width="50"></el-table-column>
        <el-table-column prop="name" label="采购商品名称" width="300" align="center"></el-table-column>
        <el-table-column prop="store" label="采购单位" width="120px" align="center"></el-table-column>
        <el-table-column prop="address" label="期望货源地" width="120px" align="center"></el-table-column>
        <el-table-column prop="adminName" label="发布人" width="120px" align="center"></el-table-column>
        <el-table-column prop="updateTime" label="上次更新" width="120" align="center">
          <template slot-scope="scope">
            {{attachBirth(scope.row.updateTime)}}<br>
            {{attachTime(scope.row.updateTime)}}
          </template>
        </el-table-column>

        <el-table-column label="" width="240" align="center">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="getInfo(scope.row.id)">查看详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  

  <!-- 分页 -->
  <div class="pagination">
    <el-pagination background layout="total,prev,pager,next" :current-page="currentPage" :page-size="pageSize" :total="total" @current-change="handleCurrentChange">

    </el-pagination>
  </div>


</div>
</template>

<script>
import {getCg, delCg, updateCg,
        addCg, changeStatus} from '@/api/caigou'
import {
  mixin
} from '@/utils/mixin.js'
export default {
  name: 'UserInfo',
  mixins: [mixin],
  data() {
    return {
      idx: '', //删除时用到的临时商家id值
      deleteVisible: false, //是否显示删除
      resetVisible: false, //是否显示重置密码框
      multipleSelection: [], //选中框
      tableData: [],
      //分页参数
      currentPage: 1, //当前页数
      pageSize: 7, //页数大小
      total: 0, //总数
      //搜索
      search: '',
    }
  },
  computed: {},
  watch: {},
  created() {
    this.getData()
  },
  methods: {
    //获取当前页
    handleCurrentChange(val) {
      this.currentPage = val
      this.getData()
    },
    getData() {
      getCg(this.currentPage, this.pageSize)
        .then(res => {
          this.tableData = res.data.data
          this.total = res.data.total
        })
    },
    //逻辑删除，禁用账号
    deletedUser(id) {
      apiBesiness.changeFlag(id)
        .then(res => {
          this.message(res.msg, 'success')
          this.getAdmin()
        })
    },
    //删除商家
    deleteUser() {
      apiBesiness.deleteAdmin(this.idx)
        .then(res => {
          this.message(res.msg, 'success')
          this.deleteVisible = false
          const size = this.total % this.pageSize
          if (size === 1 && this.currentPage > 1) {
            this.currentPage -= 1
          }
          this.getAdmin()
        })
    },
    //显示重置密码框
    handleReset(id) {
      this.idx = id
      this.resetVisible = true
    },
    getInfo(id){
      this.$router.push({
        name: 'cgInfo',
        query: {id:id}
      })
    },
    deAll() {
      let ids = []
      let paths = []
      for (let item of this.multipleSelection) {
        ids.push(item.id)
        paths.push(item.avatar)
      }
      const data = {
        "ids": ids,
        "paths": paths
      }
      apiBesiness.deleteAll(data)
        .then(res => {
          this.message(res.msg, 'success')
          //求取总页数
          const size = Math.ceil(this.total / this.pageSize)
          if (this.currentPage > 1 && this.currentPage == size) {
            this.currentPage = this.currentPage - 1
          }
          this.getAdmin()
        })
    },
    //搜索
    searchInput() {
      this.getAdmin()
    }
  }
}
</script>

<style scope>
.table{
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 1090px;
    max-height: 650px;
    padding: 20px 10px;
    margin: 0 auto;
}

.caigou{
  display: flex;
  justify-content: center;
  margin-top: 10px;
}

.pagination {
  display: flex;
  justify-content: center;
}
</style>
