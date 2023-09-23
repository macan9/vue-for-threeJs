<template>
    <div class="login-page1">
        <form method="post" @submit.prevent="handleSubmit" class="box">
            <h1>Login</h1>
            <br>
            <hr>
            <input v-model="username" type="text" name="username" placeholder="Username">
            <input v-model="password" type="password" name="password" placeholder="Password">
            <input type="submit">
            <p>Forget password ?</p>
        </form>
    </div>
</template>
<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex'

import { loginReq } from "@/apis/login.js"
import { ElMessage } from 'element-plus'
export default {
    
    setup(){
        const username = ref('admin');
        const password = ref('123123');
        
        
        const store = useStore()
        const updateLoginStatus = () => {
            store.commit('updateLoginStatus')
        }

        const router = useRouter();

        async function handleSubmit(){
            const userData = { 
                username:username.value,
                password:password.value 
            }
            const { data } = await loginReq(userData)

            if(data.status == 200){

                ElMessage({
                    message: data.message,
                    type: 'success',
                })
                
                updateLoginStatus()
                router.push('/blogMain')   
            }else{
                ElMessage({
                    message: data.message,
                    type: 'error',
                })
                return
            }
        }

        return {
            username,
            password,
            handleSubmit
        };
    }
}
</script>
<style lang="scss" scope>
.title{
  color: #fff;
}
</style>