<template>
  <div class="layout">
    <Layout style="height:100%;min-width:1350px;overflow: hidden;">
      <Header>
        <!-- <wen-header :topSelectMenuId='topSelectMenuId' :isNotError="isNotError" @sideMenuList='getSideMenuList'></wen-header> -->
        <div>
          <Menu ref="topMenu" mode="horizontal" theme="light" :active-name='topSelectMenuName'>
            <div class="layout-logo"></div>
            <div class="layout-nav">
              <div class="headerLeft">
                <!-- <img style="height:64px;" src="../../../static/img/headerlogo.png" alt="logo" srcset=""> -->
              </div>
              <div class="headerRight">
                <MenuItem ref="menuItem" v-for="(item,index) in menuList" :name="item.id" :key="index" @click.native="topMenuClick(item)">{{item.name}}</MenuItem>
                <div class="userInfo">
                  <Avatar src="https://i.loli.net/2017/08/21/599a521472424.jpg" />
                  <Dropdown>
                    <a href="javascript:void(0)">
                      {{userInfo.nickName}}
                      <Icon type="ios-arrow-down"></Icon>
                    </a>
                    <DropdownMenu slot="list">
                      <DropdownItem @click.native="handleUserInfo('info')">个人信息</DropdownItem>
                      <DropdownItem @click.native="chekout">退出</DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </div>
              </div>
            </div>
          </Menu>
          <Modal
              v-model="userInfoDiaShow"
              title="个人信息"
              footer-hide>
              <Form :model="userInfoForm" disabled :label-width="80">
                  <FormItem label="用户名:" prop="userName">
                      <Input type="text" v-model="userInfoForm.userName">
                      </Input>
                  </FormItem>
                  <FormItem label="昵称:" prop="nickName">
                      <Input v-model="userInfoForm.nickName">
                      </Input>
                  </FormItem>
                  <FormItem label="手机号:" prop="mobile">
                      <Input type="text" v-model="userInfoForm.mobile">
                      </Input>
                  </FormItem>
                  <FormItem label="注册时间:" prop="createTime">
                      <Input v-model="userInfoForm.createTime">
                      </Input>
                  </FormItem>
              </Form>
          </Modal>
        </div>
      </Header>
      <div style="display: flex;">
        <Sider v-if="sideList.children && sideList.children.length && isNotError" hide-trigger :style="{background: '#fff','min-width': '240px'}">
          <Menu @on-select="selectMenus" ref="menu" :theme="theme1" :active-name="sideSelectMenuName" :open-names="sideOpenNames">
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
        <Layout :style="{padding: '0 24px 24px',overflow:'auto'}">
          <page-content :breadcrumb='breadcrumb' :isNotError='isNotError'></page-content>
        </Layout>
      </div>
    </Layout>
  </div>
</template>

<script>
import wenHeader from '../common/page/header'
import pageContent from '../common/page/pageContent'
import {mapState} from 'vuex'
function handleFilter (items, value, key = 'path') {
  let _item = null
  function filters (list) {
    for (let i = 0; i < list.length; i++) {
      if (list[i][key] === value) {
        _item = list[i]
        break
      } else {
        if (list[i].children && list[i].children.length) {
          filters(list[i].children)
        }
      }
    }
  }
  filters(items)
  return _item
}
export default {
  components: {
    wenHeader, pageContent
  },
  data () {
    return {
      theme1: 'light',
      userInfoDiaShow: false,
      sideList: {},
      openName: '',
      initSideOpenNames: '',
      topSelectMenuId: '',
      breadcrumb: [],
      isNotError: false,

      userInfoForm: {
        userName: '',
        nickName: '',
        mobile: '',
        createTime: ''
      },
      sideMenuList: []
    }
  },
  watch: {// 监听路由发生变化
    $route: 'routeHandle'
  },
  computed: {
    ...mapState({
      menuList: (state) => state.user.menuList,
      userInfo: (state) => state.user.user
    }),
    // 侧边选中的name
    sideSelectMenuName () {
      return `${this.openName}`
    },
    // 侧边栏打开的name
    sideOpenNames () {
      return [`${this.initSideOpenNames}`]
    },
    // 顶部菜单选中的name
    topSelectMenuName () {
      return `${this.topSelectMenuId}`
    }
  },
  created () {
    this.routeHandle()
  },
  mounted () {
    this.userInfoForm = this.userInfo
  },
  methods: {
    selectMenus (name) {
      console.log(name)
      const item = handleFilter(this.menuList, name, 'id')// 选中的当前二级菜单对象
      console.log(item)
      this.$router.push({
        path: item.routeUrl
      })
    },
    handleUserInfo (flag) {
      this.userInfoDiaShow = (flag === 'info')
    },
    chekout () {
      localStorage.clear()
      this.$router.push({path: '/login'})
    },
    topMenuClick (item) {
      // 获取点击的一级菜单的对象
      let sideMenuList = this.menuList.find(i => i.id === item.id)
      this.topSelectMenuId = sideMenuList.id
      // 如果一级菜单不是工作台，获取二级菜单的列表且默认跳转二级菜单第一个
      if (sideMenuList.name !== '工作台') {
        this.sideMenuList = sideMenuList
        let sideChildren = this.sideMenuList.children
        if (sideChildren && sideChildren.length) {
          const _item = this.setSelectMenu(sideChildren[0])
          this.$router.push(
            {path: _item.routeUrl}
          )
        }
      } else {
        this.sideMenuList = []
        this.$router.push({
          path: '/home'
        })
      }
      // this.$emit('sideMenuList', this.sideMenuList)
      this.sideList = this.sideMenuList
    },
    setSelectMenu (data) {
      let _item = null
      function filters (firstMenu) {
        if (firstMenu.mType === 0 && firstMenu.children && firstMenu.children.length) {
          filters(firstMenu.children[0])
        } else {
          _item = firstMenu
        }
      }
      filters(data)
      return _item
    },
    // getSideMenuList (data) {
    //   this.sideList = data
    // },
    // 处理路由的变化
    routeHandle (route) {
      const path = (route && route.path) || this.$route.path
      // 路由的路径不为error页面时，1要确保左侧菜单对应的显示，2默认选择第一个菜单。3处理面包屑，4一级菜单的选中。
      if (path !== '/error') {
        this.isNotError = true
        const { menuId, pId, title } =
          (route && route.meta) || this.$route.meta
        // 判断是从哪一级菜单跳转的路由
        if (pId === '0') {
          // 工作台中。一级菜单跳转,赋值选中。
          this.sideList = []
          this.topSelectMenuId = menuId
          this.$nextTick(() => {
            this.$refs.topMenu.updateActiveName()
          })
        } else {
          // 二级菜单跳转；过滤sidelist，一级菜单选中设置
          const parentItem = this.handleRefreshMenu(pId)// 一级菜单对应的二级菜单list
          const item = handleFilter(this.menuList, menuId, 'id')// 二级菜单第一个menuItem
          this.sideList = parentItem// 给查到的二级菜单赋值
          this.topSelectMenuId = parentItem.id// 选中一级菜单
          this.openName = item.mType === 2 ? item.pId : item.id// 选中二级菜单
          this.initSideOpenNames = item.mType === 2 ? handleFilter(this.menuList, item.pId, 'id').id : item.pId
          this.$nextTick(() => {
            this.$refs.menu.updateOpened()
            this.$refs.menu.updateActiveName()
          })
        }
        this.handleBreadcrumb(title)
      } else {
        this.isNotError = false
      }
    },
    handleBreadcrumb (title) {
      let list = []
      const lable1 = this.topSelectMenuId && handleFilter(this.menuList, this.topSelectMenuId, 'id')
      const lable2 = this.initSideOpenNames && handleFilter(this.menuList, this.initSideOpenNames, 'id')
      const lable3 = this.openName && this.initSideOpenNames !== this.openName && handleFilter(this.menuList, this.openName, 'id')
      lable1 && list.push(lable1.name)
      if (lable1.name === '工作台') {
        title === '系统消息' && list.push(title)
      } else {
        lable2 && list.push(lable2.name)
        lable3 && list.push(lable3.name)
      }
      this.breadcrumb = list
    },
    handleRefreshMenu (id) {
      /*
        keepAlive: false
        menuId: "5515aa7ada6d4c8aa1c990d0da73697e"
        pId: "424ab24964734998943262ea6bd49b89"
        title: "用户列表"
      */
      const menuList = this.menuList
      let item = null
      function filter (id) {
        const _item = handleFilter(menuList, id, 'id')
        if (_item.pId === '0') {
          item = _item
        } else {
          filter(_item.pId)
        }
      }
      filter(id)
      return item
    }
  }
}
</script>

<style scoped>
.layout{
  overflow-y: hidden;
  min-width: 1035px;
}
.ivu-layout-header{
  padding: 0;
}
.ivu-menu-submenu{
  text-align: left;
}
.ivu-layout.ivu-layout-has-sider{
  flex-direction: column;
}
.layout-nav {
  height: 64px;
  line-height: 64px;
  display: flex;
  flex-direction: row;
  padding: 0 20px;
}
.headerRight {
  margin-left: auto;
  display: flex;
}
.ivu-menu-horizontal {
  height: 64px;
  line-height: 64px;
}
.userInfo {
  margin-left: 15px;
}
</style>
