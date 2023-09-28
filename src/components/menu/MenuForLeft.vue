<template>
  <el-menu
    active-text-color="#ffd04b"
    background-color="#545c64"
    class="el-menu-vertical-demo"
    default-active="1"
    text-color="#fff"
    @open="handleOpen"
    @close="handleClose"
  >  
    
    
    <template v-for="item in leftMenu" :key="item.value">
      <template v-if="leftMenu.children && leftMenu.children.length">

      </template>
      <template v-else>
        <el-menu-item :index="item.value.toString()" @click="router.push('/BlogMain')">
          <el-icon><component :is="item.icon"/></el-icon>
          <span>{{ item.label }}</span>
        </el-menu-item>
      </template>

    </template>

    <!-- <el-menu-item  index="2" @click="router.push('/UserEdit')">
      <el-icon><icon-menu /></el-icon>
      <span>用户管理</span>
    </el-menu-item> -->


    

    <el-sub-menu index="1">
      <template #title>
        <el-icon><location /></el-icon>
        <span>Navigator One</span>
      </template>
      <!-- <el-menu-item-group>
        <el-menu-item index="1-1">item one</el-menu-item>
        <el-menu-item index="1-2">item two</el-menu-item>
      </el-menu-item-group>
      <el-menu-item-group title="Group Two">
        <el-menu-item index="1-3">item three</el-menu-item>
      </el-menu-item-group>
      <el-sub-menu index="1-4">
        <template #title>item four</template>
        <el-menu-item index="1-4-1">item one</el-menu-item>
      </el-sub-menu> -->
    </el-sub-menu>


  </el-menu>
</template>
  
  <script lang="js" setup>
    import { menu_left_config } from '@/common/config/menu_left_config'
    import { useRouter } from 'vue-router';
    import { ref, reactive } from 'vue';
    const router = useRouter();

   
    const topMenuValue = ref(1)
    let leftMenu = reactive([])

    const useMenu = () => {
      console.log(topMenuValue.value,menu_left_config,'topMenuValue')
      menu_left_config.map(i=>{
        if(i.pid == topMenuValue.value){
          i.children && (leftMenu = i.children)
        }
      })
      console.log(leftMenu,'leftMenu')
    }
    useMenu()

    

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
  