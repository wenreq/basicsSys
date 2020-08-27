<template>
  <div>
    <Menu mode="horizontal" theme="light">
      <div class="layout-logo"></div>
      <div class="layout-nav">
        <div class="headerLeft">
          <!-- <img style="height:64px;" src="../../../static/img/headerlogo.png" alt="logo" srcset=""> -->
        </div>
        <div class="headerRight">
          <MenuItem ref="menuItem" :active-name='topSelectMenuId' v-for="(item,index) in menuList" :name="index" :key="index" @click.native="topMenuClick(item)">{{item.name}}</MenuItem>
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
</template>

<script>
import { mapState } from 'vuex'
export default {
  props: ['topSelectMenuId'],
  data () {
    return {
      theme1: 'light',
      userInfoDiaShow: false,
      userInfoForm: {
        userName: '',
        nickName: '',
        mobile: '',
        createTime: ''
      },
      sideMenuList: []
    }
  },
  computed: {
    ...mapState({
      menuList: (state) => state.user.menuList,
      userInfo: (state) => state.user.user
    })
  },
  mounted () {
    this.userInfoForm = this.userInfo
  },
  methods: {
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
      this.$emit('sideMenuList', this.sideMenuList)
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
    }
  }
}
</script>

<style scoped>
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
