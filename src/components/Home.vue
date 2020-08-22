<template>
  <div>
    <header-com></header-com>
    <side-bar></side-bar>
  </div>
</template>
<script>
import headerCom from '../common/page/header'
import sideBar from '../common/page/sideBar'
export default {
  components: {
    sideBar, headerCom
  },
  data () {
    return {
      theme1: 'dark'
    }
  }
}
</script>
