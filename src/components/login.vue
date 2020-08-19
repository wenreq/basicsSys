<template>
  <div class="login_bg">
    <div class="container">
      <div class="left">
        <h1>夜跑记录管理系统</h1>
        <h2>study hard and make progress every day</h2>
      </div>
      <div class="right">
        <div class="right_content">
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
          { type: 'string', min: 6, message: '密码长度不能小于6位', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.$Message.success('Success!')
        } else {
          this.$Message.error('Fail!')
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
  color: #ffffff;
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
}
</style>
