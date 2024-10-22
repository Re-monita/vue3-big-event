<template>
  <el-row class="login-page">
    <el-col :span="12" class="bg"></el-col>
    <el-col :span="6" :offset="3" class="form">
      <el-form v-if="isRegister" :model="formModel" :rules="rules" ref="form">
        <el-form-item> <h1>注册</h1> </el-form-item>
        <el-form-item prop="username">
          <el-input
            v-model="formModel.username"
            :prefix-icon="User"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="formModel.password"
            :prefix-icon="Lock"
            placeholder="请输入密码"
            type="password"
          ></el-input>
        </el-form-item>
        <el-form-item prop="repassword">
          <el-input
            v-model="formModel.repassword"
            :prefix-icon="Lock"
            placeholder="请再次输入密码"
            type="password"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            auto-insert-space
            class="button"
            @click="register"
            >注册</el-button
          >
        </el-form-item>
        <el-form-item>
          <el-link :underline="false" type="info" @click="isRegister = false"
            >← 返回</el-link
          >
        </el-form-item>
      </el-form>
      <el-form v-else ref="form" :model="formModel" :rules="rules">
        <el-form-item> <h1>登录</h1> </el-form-item>
        <el-form-item prop="username">
          <el-input
            :prefix-icon="User"
            placeholder="请输入用户名"
            v-model="formModel.username"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            :prefix-icon="Lock"
            placeholder="请输入密码"
            type="password"
            v-model="formModel.password"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <div class="flex">
            <el-checkbox value="记住我" name="remember"> 记住我 </el-checkbox>
            <el-link type="primary" :underline="false">忘记密码?</el-link>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            auto-insert-space
            class="button"
            @click="login"
            >登录</el-button
          >
        </el-form-item>
        <el-form-item class="flex">
          <el-link type="info" :underline="false" @click="isRegister = true"
            >注册 →</el-link
          >
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<script setup>
import { User, Lock } from '@element-plus/icons-vue'
import { ref, watch } from 'vue'
import { userRegisterService, userLoginService } from '@/api/user'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores'

const isRegister = ref(false)
const formModel = ref({
  username: '',
  password: '',
  repassword: ''
})
const form = ref()
const router = useRouter()
const userStore = useUserStore()

const rules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 5, max: 10, message: '用户名必须是5-10位的字符', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    {
      pattern: /^\S{6,15}$/,
      message: '密码必须是6-15的非空字符',
      trigger: 'blur'
    }
  ],
  repassword: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    {
      pattern: /^\S{6,15}$/,
      message: '密码必须是6-15的非空字符',
      trigger: 'blur'
    },
    {
      validator: (rule, value, callback) => {
        if (value !== formModel.value.password) {
          callback(new Error('两次输入的密码不一致'))
        } else {
          callback()
        }
      },
      trigger: 'blur'
    }
  ]
}

const register = async () => {
  await form.value.validate()
  await userRegisterService(formModel.value)
  ElMessage.success('注册成功')
  // 切换到登录
  isRegister.value = false
}

const login = async () => {
  await form.value.validate()
  const res = await userLoginService(formModel.value)
  userStore.setToken(res.data.token)
  router.push('/')
  console.log('开始登录', res)
}

watch(isRegister, () => {
  formModel.value = {
    username: '',
    password: '',
    repassword: ''
  }
})
</script>

<style scoped>
.login-page {
  height: 100vh;
  background-color: #fff;
}
.bg {
  background:
    url('@/assets/logo2.png') no-repeat 60% center / 240px auto,
    url('@/assets/login_bg.jpg') no-repeat center / cover;
  border-radius: 0 20px 20px 0;
}
.form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  user-select: none;
}
.button {
  width: 100%;
}
.flex {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
</style>
