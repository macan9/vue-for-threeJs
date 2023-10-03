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
    
    
    <template v-for="item in leftMenu.leftMenuVal" :key="item.value">

      <!-- 存在子路由 -->
      <template v-if="item.children && item.children.length">
        <el-sub-menu :index="item.value.toString()">
          <template #title>
            <el-icon><location /></el-icon>
            <span>{{ item.label }}</span>
          </template>
          <el-menu-item v-for="child in item.children" :key="child.value" :index="item.value.toString()"
           @click="router.push(child.path)">
            {{ child.label }}
          </el-menu-item>
        </el-sub-menu>
      </template>
      <!-- 不存在子路由 -->
      <template v-else>
        <el-menu-item :index="item.value.toString()" @click="router.push(item.path)">
          <el-icon><component :is="item.icon"/></el-icon>
          <span>{{ item.label }}</span>
        </el-menu-item>
      </template>

    </template>

  </el-menu>
</template>
  
  <script lang="js" setup>
    import { menu_left_config } from '@/common/config/menu_left_config'
    import { useRouter } from 'vue-router';
    import { reactive , watch } from 'vue';
    import {  defineProps, toRef } from 'vue'
    const router = useRouter();

   
    const props = defineProps({
      topMenuValue: {
        type: String,
        default: '1',
      },
    });
    const topMenuValue  = toRef(props,'topMenuValue')

    const leftMenu = reactive({
      leftMenuVal:[]
    })

    watch(() => topMenuValue.value, () => {
        useMenu()
    });

    const useMenu = () => {
      console.log(topMenuValue.value,menu_left_config,'topMenuValue')
      menu_left_config.map(i=>{
        if(i.pid == topMenuValue.value){
          i.children && (leftMenu.leftMenuVal = i.children)
        }
      })

      // 将 proxy 数组对象转化为 可读数组
      const target = Array.from(leftMenu.leftMenuVal);
      if(target.length){
        console.log(leftMenu.leftMenuVal,'leftMenu.leftMenuVal')
        router.push(target[0].path)
      }
      // console.log(leftMenu.value,'leftMenu')
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
  