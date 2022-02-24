<script setup lang="ts">
import imgs from "@/assets/401.gif";
const img = ref(`${imgs}?${new Date()}`);
</script>

<template>
  <div class="errPage-container mx-auto pt-40">
    <el-row>
      <el-col :span="12">
        <h1 class="text-jumbo text-ginormous">ViteEl后台管理系统</h1>
        <h1 class="mt-40 text-blue-400 font-bold text-2xl underline underline-offset-4 decoration-blue-200 decoration-4">你没有权限去该页面</h1>
      </el-col>
      <el-col :span="12">
        <img
          :src="img"
          width="313"
          height="428"
          alt="Girl has dropped her ice cream."
        />
      </el-col>
    </el-row>
  </div>
</template>

<style lang="scss" scoped>
.errPage-container {
  width: 800px;
  max-width: 100%;
  .pan-back-btn {
    background: #008489;
    color: #fff;
    border: none !important;
  }
  .pan-gif {
    margin: 0 auto;
    display: block;
  }
  .pan-img {
    display: block;
    margin: 0 auto;
    width: 100%;
  }
  .text-jumbo {
    font-size: 50px;
    font-weight: 700;
    color: #484848;
  }
  .list-unstyled {
    font-size: 14px;
    li {
      padding-bottom: 5px;
    }
    a {
      color: #008489;
      text-decoration: none;
      &:hover {
        text-decoration: underline;
      }
    }
  }
}
</style>