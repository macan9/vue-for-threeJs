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
      <el-menu-item v-for="item in menu_top_config" :key="item.value" :index="item.value.toString()"
        @click="updateValue(item.value)" >
        <el-icon> <component :is="item.icon" style="width: 20px; height:20px;"/> </el-icon>
        <span>{{ item.label }}</span>
      </el-menu-item>

      <el-sub-menu index="99" class="position-left">
        <template #title><el-icon><UserFilled/></el-icon>{{username}}</template>
        <el-menu-item index="99-1" @click="loginOut">login out</el-menu-item>
      </el-sub-menu>

    </el-menu>
</template>
  
<script lang="js" setup>
    import { useStore } from 'vuex'
    import { useRouter } from 'vue-router';
    import { ref, defineEmits } from 'vue'

    import { menu_top_config } from '@/common/config/menu_top_config'

    
    const store = useStore()
    const router = useRouter()

    const activeIndex = ref("1")
    const username = store.state.userInfo.username

    const emit = defineEmits(['update-menu-value']);
    const updateValue = (val) => {
      emit('update-menu-value', val);
    }
    const handleSelect = () => {
        // console.log(key, keyPath)
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
  