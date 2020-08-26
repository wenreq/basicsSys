<template>
  <div class="layout">
    <Layout>
      <Header>
        <wen-header @sideMenuList='getSideMenuList'></wen-header>
      </Header>
      <div style="display: flex;">
        <Sider v-if="sideList.children && sideList.children.length" hide-trigger :style="{background: '#fff','min-width': '240px'}">
          <Menu :theme="theme1">
            <template>
              <div v-for="(item,index) in sideList.children" :key="index">
                <Submenu v-if="item.mType === 0 && item.children" :name="item.id">
                    <template slot="title">
                        <i :class="'iconfont ' + item.mIcon"></i>
                        {{item.name}}
                    </template>
                    <template>
                      <MenuItem v-for="(i,_index) in item.children" :name="i.id" :key="_index">{{i.name}}</MenuItem>
                    </template>
                </Submenu>
                <MenuItem v-else :name="item.id"><i style="margin-right:8px;" :class="'iconfont ' + item.mIcon"></i>{{item.name}}</MenuItem>
              </div>
            </template>
          </Menu>
        </Sider>
        <Layout :style="{padding: '0 24px 24px'}">
          <page-content></page-content>
        </Layout>
      </div>
    </Layout>
  </div>
</template>

<script>
import wenHeader from '../common/page/header'
import pageContent from '../common/page/pageContent'
export default {
  components: {
    wenHeader, pageContent
  },
  data () {
    return {
      theme1: 'light',
      userInfoDiaShow: false,
      sideList: []
    }
  },
  watch: {// 监听路由发生变化
    $route: 'routeHandle'
  },
  computed: {

  },
  methods: {
    getSideMenuList (data) {
      this.sideList = data
    },
    routeHandle (route) {
      debugger
      const path = (route && route.path) || this.$route.path
      if (path !== 'error') {
        const { menuId, pId, title } =
          (route && route.meta) || this.$route.meta
        const parentItem = this.handleRefreshMenu(pId)
      }
    },
    handleRefreshMenu (id) {
      /*
        keepAlive: false
        menuId: "5515aa7ada6d4c8aa1c990d0da73697e"
        pId: "424ab24964734998943262ea6bd49b89"
        title: "用户列表"
      */
    }
  }
}
</script>

<style scoped>
.ivu-layout-header{
  padding: 0;
}
.ivu-menu-submenu{
  text-align: left;
}
</style>
