<template>
  <div class="pageView">
    <Breadcrumb v-if="isNotError" :style="{margin: '24px 0'}">
      <BreadcrumbItem v-for="(item,index) in breadcrumb" :key='index'>{{item}}</BreadcrumbItem>
    </Breadcrumb>
    <Content :style="{padding: '24px', minHeight: '280px', background: '#fff'}">
      <router-view></router-view>
    </Content>
  </div>
</template>

<script>
export default {
  props: [
    'breadcrumb', 'isNotError'
  ]
}
</script>

<style scoped>
.pageView{
  text-align: left;
}
</style>
