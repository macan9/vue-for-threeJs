<template>
  <div class="home">
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </nav>
    <!-- <img alt="Vue logo" src="@/assets/logo.png"> -->
    <button @click="loginOut"> 退出 </button>
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router';
export default {
  name: 'HomeView',
  components: {
    HelloWorld
  },
  setup(){
    const store = useStore()
    const router = useRouter();
    const loginOut = () => {
        store.commit('updateLoginStatus')
        router.push('/login')
    }
    return {
      loginOut
    };
  }
}
</script>
