<template>
    <el-dialog
    v-model="visible.attr"
    title="用户注册"
    width="45%"
    :before-close="handleClose"
    class="user-register-style"
  >
    <el-form :model="userForm" ref="userRuleFormRef" :rules="userRules" label-width="120px">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="userForm.username" style="width: 200px"/>
      </el-form-item>
      <el-form-item label="用户密码" prop="password">
        <el-input type="password" v-model="userForm.password" style="width: 200px" />
      </el-form-item>
      <el-form-item label="用户权限" prop="authority">
        <el-select v-model="userForm.authority" placeholder="请选择用户类型">
          <el-option v-for="item in user_authority" :label="item.label" :value="item.value" :key="item.value"/>
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closeDialog">Cancel</el-button>
        <el-button type="primary" @click="registerUser(userRuleFormRef)">
          Register
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script lang="js" setup>
  import {  defineProps,toRef, } from 'vue'
  import { ref,reactive,} from 'vue'
  // import { ref, defineExpose,defineEmits } from 'vue'
  import { ElMessage, ElMessageBox } from 'element-plus'
  import { user_authority } from '@/common/plugins/user_config.js'
  // import { FormInstance, FormRules } from 'element-plus'

  const props = defineProps({
    dialogVisible: {
      type: Object,
      default: () => {},
    },
  });
  // toRef toRefs 会产生一个新的引用变量
  const visible  = toRef(props,'dialogVisible')
  console.log(visible,'visible')

  const userForm = reactive({
    username: '',
    password: '',
    region: '',
    Email: '',
    authority: '',
    desc: '',
  })

  const handleClose = (done) => {
    ElMessageBox.confirm('Are you sure to close this dialog?')
      .then(() => {
        done()
      })
      .catch(() => {
        // catch error
      })
  }

  // const emit = defineEmits(['update-my-visible']);
  const closeDialog = () =>{
    visible.value.attr = false
    // emit('update-my-visible')
  }

  const userRuleFormRef = ref(null)
  const userRules = reactive({
    username: [
      { required: true, message: 'Please input Activity name', trigger: 'blur' },
      { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
    ],
    password: [
      {
        required: true,
        message: 'Please select Activity zone',
        trigger: 'change',
      },
    ],
  })

  const registerUser = async  (formEl) => {
    console.log(formEl,'formEl')
    if (!formEl) return
    await formEl.validate((valid, fields)=>{
      console.log(userRuleFormRef)
      if (valid) {
        console.log('submit!')
        // 校验通过，执行提交逻辑
        ElMessage({
            message: '注册成功',
            type: 'success',
        })
        closeDialog()
      } else {
        console.log('error submit!', fields)
        // 校验不通过，提示错误信息
        // ...
      }
    })
  }

</script>

<style lang="scss">
.dialog-footer button:first-child {
  margin-right: 10px;
}
.user-register-style{
    margin-top: 30vh;
  .el-form{
    width: 400px;
    margin: 0 auto;
  }
  .el-input{
    width: 200px;
  }
}
</style>