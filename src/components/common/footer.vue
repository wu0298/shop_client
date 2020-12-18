<template>
  <div class="footer">
    <div class="container">
      <div class="logo"></div>
      <div class="right">
        <p>
          © mi.com 京ICP证110507号 京ICP备10046444号 京公网安备11010802020134号
          京网文[2020]0276-042号
        </p>
        <p>
          （京）网械平台备字（2018）第00005号 互联网药品信息服务资格证
          (京)-非经营性-2014-0090 营业执照 医疗器械质量公告
        </p>
        <p>
          增值电信业务许可证 网络食品经营备案 京食药网食备202010048
          食品经营许可证
        </p>
        <p>
          违法和不良信息举报电话：171-5104-4404 知识产权侵权投诉
          本网站所列数据，除特殊说明，所有数据均出自我司实验室测试
        </p>
      </div>
      <div class="end">END</div>
    </div>
    <div class="slogan"></div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.footer {
  padding: 30px 0;
  font-size: 12px;
  background: #fafafa;
  border-top: 1px solid #e7e7e7;
}
.end {
  position: absolute;
  color: #ccccd0;
  right: 0;
  top: 20px;
  width: 84px;
  font-size: 18px;
  text-align: center;
  &::before,
  &::after {
    content: "";
    position: absolute;
    height: 0;
    line-height: 0;
    border-top: 1px solid #e6e6e6;
    width: 60px;
    top: 50%;
  }
  &::before {
    left: -70px;
  }
  &::after {
    right: -70px;
  }
}
.container {
  width: 1090px;
  margin: 0 auto;
  display: flex;
  position: relative;
  .logo {
    width: 80px;
    height: 57px;
    margin-right: 10px;
    background: url(~@a/logo1.png) no-repeat;
    background-size: 100% 100%;
  }
  .right {
    margin-left: 40px;
    color: #b0b0b0;
    line-height: 17px;
  }
}

.slogan {
  clear: both;
  margin: 30px auto 0;
  width: 100%;
  height: 19px;
  background: url(~@a/images/common/slogan2020.png) no-repeat center 0;
}
</style>
