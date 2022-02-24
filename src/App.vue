<template>
  <router-view></router-view>
</template>

<script lang="ts" setup>
const name = 'App'
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}
html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
}
.el-table__body-wrapper::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}
.el-table__body-wrapper::-webkit-scrollbar-thumb {
  background-color: rgba(160, 160, 160, 0.2);
  border-radius: 10px;
  transition: all 0.2s ease-in-out;
}
</style>