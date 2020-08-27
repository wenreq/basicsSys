<template>
  <div style="text-align:center;margin:15px 0">
    <Page @on-change="changePage" @on-page-size-change="changePageSize" :total="totalCount" show-total show-elevator show-sizer />
  </div>
</template>

<script>
export default {
  props: ['totalCount'],
  data () {
    return {

    }
  },
  methods: {
    changePage (index) {
      this.$emit('pageIndex', index)
      // this.page = index
      // this.getParms()
    },
    changePageSize (size) {
      this.$emit('pageSize', size)
      // this.pageSize = size
      // this.getParms()
    }
  }
}
</script>

<style>

</style>
