<template>
  <div class="view">
    <div class="container">
      <div class="login-wrapper">
        <div class="header">Login</div>
        <div>
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
              <Button style="border-color: #fff;background-image: linear-gradient(to right,#a6c1ee,#fbc2eb);" type="primary" long @click="handleSubmit('formInline')">登 录</Button>
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
            userName: this.formInline.user.trim(),
            password: md5(this.formInline.password.trim())
          }
          this.loginHandle(params).then(res => {
            if (this.toPath) {
              this.$router.push(this.toPath)
            } else {
              this.$router.push({
                path: '/home'
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
.container{
  height: 100vh;
  background-image: linear-gradient(to right,#fbc2eb,#a6c1ee);
}
.login-wrapper{
  background-color: #fff;
  width: 350px;
  height: 500px;
  border-radius: 15px;
  padding: 0 20px;
  position: relative;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
}
.login-wrapper .header{
  font-size: 30px;
  font-weight: bold;
  text-align: center;
  line-height: 200px;
}
</style>
