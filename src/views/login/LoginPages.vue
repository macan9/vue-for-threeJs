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
            <p style="margin-top: 10px;">Forget password ?</p>
        </form>
        <UserRegister :dialogVisible="dialogVisible_"></UserRegister>
    </div>
</template>
<script> 
import { ref, reactive} from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex'

import { loginReq } from "@/apis/login.js"
import { ElMessage } from 'element-plus'
import UserRegister from '@/components/user/UserRegister.vue'
export default {
    components: { UserRegister },
    setup(){
        const username = ref('admin');
        const password = ref('123123');
        let dialogVisible_ = reactive({attr:false})
        
        
        const store = useStore()
        const router = useRouter();

        const openRigsterPage = () => {
            console.log(dialogVisible_.attr,'dialogVisible_')
            dialogVisible_.attr = true
        }

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

        return {
            username,
            password,
            dialogVisible_,
            handleSubmit,
            openRigsterPage,
        };
    }
}
</script>
<style lang="scss" scope>
.title{
  color: #fff;
}
</style>