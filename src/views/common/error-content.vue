<template>
  <div class="error-page">
    <div class="content-con">

      <div class="text-con">
        <h4>{{ code }}</h4>
        <h5>{{ desc }}</h5>
      </div>
      <img :src="src" :alt="code">
      <back-btn-group class="back-btn-group"></back-btn-group>
    </div>
  </div>
</template>

<script>
import backBtnGroup from './back-btn-group.vue'
export default {
  name: 'error_content',
  components: {
    backBtnGroup
  },
  props: {
    code: String,
    desc: String,
    src: String
  }
}
</script>
<style scoped>
.error-page{
  width: 100%;
  height: 100%;
  /* position: relative; */
  /* background: #f8f8f9; */
}
  .content-con{
    width: 500px;
    margin: 0 auto;
    /* position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,0); */
  }
  .content-con  img{
      display: block;
      width: 100%;
      height: 100%;
  }
  .content-con  .text-con{
      /* position: absolute;
      left: 0px;
      top: 0px; */
  }
  .content-con h4{
        /* position: absolute;
        left: 0px;
        top: 0px; */
        font-size: 80px;
        font-weight: 700;
        color: #348EED;
  }
  .content-con h5{
        /* position: absolute; */
        width: 700px;
        /* left: 0px;
        top: 100px; */
        font-size: 20px;
        font-weight: 700;
        color: #67647D;
  }
  .content-con .back-btn-group{
    /* position: absolute;
    right: 0px;
    bottom: 20px; */
  }
</style>
