<template>
  <div class="pageView">
    <Breadcrumb :style="{margin: '24px 0'}">
      <BreadcrumbItem v-if='breadcrumb'></BreadcrumbItem>
    </Breadcrumb>
    <Content :style="{padding: '24px', minHeight: '280px', background: '#fff'}">
      <router-view></router-view>
    </Content>
  </div>
</template>

<script>
export default {
  props: [
    'breadcrumb'
  ]
}
</script>

<style scoped>
.pageView{
  text-align: left;
}
</style>
