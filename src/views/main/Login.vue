<template>
  <div>
    <div class="absolute bottom-0 w-full" style="z-index: -1;">
      <svg
        height="100%"
        width="100%"
        id="svg"
        viewBox="0 0 1440 500"
        xmlns="http://www.w3.org/2000/svg"
        class="transition duration-300 ease-in-out delay-150"
      >
        <defs>
          <linearGradient id="gradient">
            <stop offset="5%" stop-color="#002bdc88" />
            <stop offset="95%" stop-color="#32ded488" />
          </linearGradient>
        </defs>
        <path
          d="M 0,500 C 0,500 0,166 0,166 C 123.55023923444975,157.94258373205741 247.1004784688995,149.88516746411483 330,138 C 412.8995215311005,126.11483253588517 455.1483253588517,110.4019138755981 547,134 C 638.8516746411483,157.5980861244019 780.3062200956937,220.5071770334928 895,223 C 1009.6937799043063,225.4928229665072 1097.6267942583734,167.56937799043064 1184,148 C 1270.3732057416266,128.43062200956936 1355.1866028708132,147.21531100478467 1440,166 C 1440,166 1440,500 1440,500 Z"
          stroke="none"
          stroke-width="0"
          fill="url(#gradient)"
          class="transition-all duration-300 ease-in-out delay-150"
        />
        <defs>
          <linearGradient id="gradient">
            <stop offset="5%" stop-color="#002bdcff" />
            <stop offset="95%" stop-color="#32ded4ff" />
          </linearGradient>
        </defs>
        <path
          d="M 0,500 C 0,500 0,333 0,333 C 81.66507177033492,319.62200956937795 163.33014354066984,306.24401913875596 266,295 C 368.66985645933016,283.75598086124404 492.3444976076555,274.64593301435406 594,273 C 695.6555023923445,271.35406698564594 775.2918660287082,277.17224880382776 852,291 C 928.7081339712918,304.82775119617224 1002.488038277512,326.6650717703349 1100,335 C 1197.511961722488,343.3349282296651 1318.755980861244,338.16746411483257 1440,333 C 1440,333 1440,500 1440,500 Z"
          stroke="none"
          stroke-width="0"
          fill="url(#gradient)"
          class="transition-all duration-300 ease-in-out delay-150"
        />
      </svg>
    </div>
    <div class="font-bold text-left text-3xl p-4 text-blue-600">欢迎使用后台管理系统</div>
    <el-card class="rounded-md mt-32 mr-96 w-96 float-right p-6" shadow="always">
      <template #header>
        <span class="text-xl text-blue-500">验证您的身份以继续</span>
      </template>
      <div class="login-content bg-white">
        <el-form :model="loginForm" ref="loginEL" label-position="top" :inline="false">
          <el-form-item label="用户名">
            <el-input class="select-all" v-model="loginForm.username" placeholder="输入用户名"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input show-password v-model="loginForm.password" placeholder="输入密码"></el-input>
          </el-form-item>
          <el-form-item>
            <div class="w-full">
              <el-button class="mx-auto" type="primary" @click="login">登录</el-button>
            </div>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>
<script lang="ts" setup>
import router from '@/router';

const loginForm = reactive({
  username: "",
  password: "",
  isRememberMe: false,
})

async function login() {
  ElMessage.info("Login")
  router.push("/")
}
</script>
<style scope>
</style>