<template>
    <div class="login-page1">
        <form method="post" class="box">
            <h1>Login</h1>
            <br>
            <hr>
            <input v-model="username" type="text" name="username" placeholder="Username">
            <input v-model="password" type="password" name="password" placeholder="Password">
            <el-button @click="handleSubmit">登录</el-button>
            <el-button @click="openRigsterPage">注册</el-button>
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
                
                store.commit('updateLoginStatus')
                store.commit('updateUserInfo',data)
                router.push('/blogMain')   
            }else{
                ElMessage({
                    message: data.message,
                    type: 'error',
                })
                return
            }
        }

        const openRigsterPage = () => {
            // console.log('111')
        }

        return {
            username,
            password,
            handleSubmit,
            openRigsterPage
        };
    }
}
</script>
<style lang="scss" scope>
.title{
  color: #fff;
}
</style>