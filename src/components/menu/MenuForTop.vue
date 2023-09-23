<template>
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      @select="handleSelect"
    >
      <el-menu-item index="1">Processing Center</el-menu-item>
      <el-sub-menu index="2">
        <template #title>Workspace</template>
        <el-menu-item index="2-1">item one</el-menu-item>
        <el-menu-item index="2-2">item two</el-menu-item>
        <el-menu-item index="2-3">item three</el-menu-item>
      </el-sub-menu>
      <el-menu-item index="3" disabled>Info</el-menu-item>
      <el-menu-item index="4">Orders</el-menu-item>
      <el-sub-menu index="5" class="position-left">
        <template #title><el-icon><UserFilled /></el-icon>{{username}}</template>
        <el-menu-item index="5-1" @click="loginOut">login out</el-menu-item>
      </el-sub-menu>

    </el-menu>
</template>
  
<script lang="js" setup>
    import { useStore } from 'vuex'
    import { useRouter } from 'vue-router';
    import { ref } from 'vue'
    import {
        UserFilled
    } from '@element-plus/icons-vue'
    const store = useStore()
    const router = useRouter()

    const activeIndex = ref('1')
    const username = store.state.userInfo.username


    const handleSelect = (key, keyPath) => {
        console.log(key, keyPath)
    }

    
    const loginOut = () => {
        store.commit('updateLoginStatus')
        router.push('/login')
    }

</script>

<style lang="scss">
.el-menu-demo{
    position: relative;
    .position-left{
        position: absolute;
        right: 0;
    }
}
</style>
  