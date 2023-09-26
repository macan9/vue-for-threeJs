<template>
    <el-dialog
    v-model="dialogVisible"
    title="用户注册"
    width="45%"
    :before-close="close_dialog"
  >

    <span>This is a message</span>
    <el-form :model="userForm" label-width="120px">
      <el-form-item label="用户名">
        <el-input v-model="userForm.username" />
      </el-form-item>
      <el-form-item label="用户密码">
        <el-input type="password" v-model="userForm.password" />
      </el-form-item>
      <el-form-item label="用户权限">
        <el-select v-model="userForm.authority" placeholder="请选择用户类型">
          <el-option v-for="item in user_authority" :label="item.label" :value="item.value" :key="item.vakue"/>
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="close_dialog">Cancel</el-button>
        <el-button type="primary" @click="close_dialog">
          Confirm
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script lang="js" setup>
  // import { ,defineEmits ,defineProps,toRefs, } from 'vue'
  import { reactive,ref ,defineExpose} from 'vue'
  // import { ElMessageBox } from 'element-plus'
  import { user_authority } from '@/common/plugins/user_config.js'

  // const emit = defineEmits(['update-my-visible']);
  
  const dialogVisible = ref(false)
  defineExpose({ 
    dialogVisible
  })
  // const props = defineProps({
  //   dialogVisible: {
  //     type: Boolean,
  //     default: false,
  //   },
  // });
  // const {dialogVisible} = toRefs(props)

  const userForm = reactive({
    username: '',
    password: '',
    region: '',
    Email: '',
    authority: '',
    desc: '',
  })



  // const handleClose = () => {
  //   ElMessageBox.confirm('Are you sure to close this dialog?')
  //     .then(() => {
  //       close_dialog()
  //     })
  //     .catch(() => {
  //       // catch error
  //     })
  // }
  const close_dialog = () =>{
    console.log('---xxx---')
    dialogVisible.value = false
    // emit('update-my-visible')
  }
</script>
<style scoped>
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>