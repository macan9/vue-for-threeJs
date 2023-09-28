<template>
  <el-menu
    active-text-color="#ffd04b"
    background-color="#545c64"
    class="el-menu-vertical-demo"
    default-active="2"
    text-color="#fff"
    @open="handleOpen"
    @close="handleClose"
  >  
    <el-menu-item index="3" @click="router.push('/HomeView')">
      <el-icon><document /></el-icon>
      <span>我的主页</span>
    </el-menu-item>
    <el-menu-item index="2" @click="router.push('/UserEdit')">
      <el-icon><icon-menu /></el-icon>
      <span>用户管理</span>
    </el-menu-item>

    

    <el-sub-menu index="1">
      <template #title>
        <el-icon><location /></el-icon>
        <span>Navigator One</span>
      </template>

      <el-menu-item-group title="Group One">
        <el-menu-item index="1-1">item one</el-menu-item>
        <el-menu-item index="1-2">item two</el-menu-item>
      </el-menu-item-group>
      <el-menu-item-group title="Group Two">
        <el-menu-item index="1-3">item three</el-menu-item>
      </el-menu-item-group>
      <el-sub-menu index="1-4">
        <template #title>item four</template>
        <el-menu-item index="1-4-1">item one</el-menu-item>
      </el-sub-menu>
    </el-sub-menu>

    <el-menu-item index="4">
      <el-icon><setting /></el-icon>
      <span>Navigator Four</span>
    </el-menu-item>
  </el-menu>
</template>
  
  <script lang="js" setup>
  import {
    Menu as IconMenu,
    Setting,
  } from '@element-plus/icons-vue'
  import { useRouter } from 'vue-router';
  const router = useRouter();
  const handleOpen = (key, keyPath) => {
    console.log(key, keyPath)
  }
  const handleClose = (key, keyPath) => {
    console.log(key, keyPath)
  }
  </script>
  <style lang="scss">
  .el-menu-vertical-demo{
    height: 100%;
    width: 230px;
  }
  </style>
  