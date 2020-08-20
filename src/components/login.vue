<template>
  <div class="login_bg">
    <div class="container">
      <div class="left">
        <h1 class="so-many-shadows">夜 跑 记 录 管 理 系 统</h1>
        <h2 class="gradient-text">STUDY HARD AND MAKE PROGRESS EVERY DAY</h2>
      </div>
      <div class="right">
        <div class="right_content">
          <div style="color:#ffffff;font-size:20px;margin:15px 0;font-weight: 600;">
            欢迎您登录
          </div>
          <Form ref="formInline" :model="formInline" :rules="ruleInline">
            <FormItem prop="user">
              <Input type="text" size="large" clearable  v-model="formInline.user" placeholder="用户名">
                <Icon type="ios-person-outline" slot="prepend"></Icon>
              </Input>
            </FormItem>
            <FormItem prop="password">
              <Input type="password" size="large" clearable  v-model="formInline.password" placeholder="密码">
                <Icon type="ios-lock-outline" slot="prepend"></Icon>
              </Input>
            </FormItem>
            <FormItem>
              <Button long type="default" ghost @click="handleSubmit('formInline')">登 录</Button>
            </FormItem>
          </Form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import md5 from 'js-md5'
import {mapActions} from 'vuex'
export default {
  data () {
    return {
      formInline: {
        user: '',
        password: ''
      },
      ruleInline: {
        user: [
          { required: true, message: '请填写用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请填写密码', trigger: 'blur' },
          { type: 'string', min: 5, message: '密码长度不能小于5位', trigger: 'blur' }
        ]
      },
      toPath: ''// 登录失效，重定向页面
    }
  },
  created () {
    this.toPath = this.$route.query.redirect
  },
  methods: {
    ...mapActions(['loginHandle']),
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          let params = {
            userName: this.formInline.user,
            password: md5(this.formInline.password)
          }
          this.loginHandle(params).then(res => {
            if (this.toPath) {
              this.$router.push(this.toPath)
            } else {
              this.$router.push({
                name: 'Home'
              })
            }
          })
            .catch(error => { console.log(error) })
            .finally((msg) => {
              console.log(msg)
            })
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style scoped>
.login_bg {
  min-width: 1200px;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10;
  background: url("../../static/img/login_bg.jpg") center center no-repeat;
}
.container {
  display: flex;
  align-items: center;
}
.left {
  text-align: center;
  width: 50%;
  font-size: 16px;
  margin-bottom: 150px;
}
.gradient-text{
  /* background-image: linear-gradient(90deg,red,blue);
  background-clip: text;
  color: transparent; */

  margin: 25px 0;
  color: white;
  -webkit-text-stroke:1px black;
}
.so-many-shadows{
  text-shadow: 3px 3px 0 yellow,6px 6px 0 blue,9px 9px red,12px 12px 0 black;
}
.right {
  background-color: rgb(0 0 0 / 40%);
  height: 100vh;
  width: 350px;
  z-index: 11;
  width: 30%;
  display: flex;
  align-items: center;
}
.right_content{
  width: 75%;
  vertical-align: middle;
  margin: 0 auto;
  margin-bottom: 150px;
}
</style>
