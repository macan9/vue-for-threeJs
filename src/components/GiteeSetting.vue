<template>
    <el-dialog
    v-model="visible.attr"
    title="Gitee配置"
    width="45%"
    :before-close="handleClose"
    class="gitee-setting-style"
  >
    <el-form :model="giteeConfigForm" ref="giteeFormRef" :rules="giteeRules" label-width="120px">
      <el-form-item label="gitee用户名" prop="owner">
        <el-input v-model="giteeConfigForm.owner" style="width: 260px"/>
      </el-form-item>
      <el-form-item label="仓库名" prop="repo">
        <el-input type="repo" v-model="giteeConfigForm.repo" style="width: 260px" />
      </el-form-item>
      <el-form-item label="文件路径名" prop="path">
        <el-input type="path" v-model="giteeConfigForm.path" style="width: 260px" />
      </el-form-item>
      <el-form-item label="提交信息" prop="message">
        <el-input type="message" v-model="giteeConfigForm.message" style="width: 260px" />
      </el-form-item>
      <el-form-item label="用户授权码" prop="access_token">
        <el-input type="access_token" v-model="giteeConfigForm.access_token" style="width: 260px" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" round @click="closeDialog" >Cancel</el-button>
        <el-button type="success" round @click="saveConfig(giteeFormRef)" >
          Save
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="js" setup>
  import { defineProps, toRef, ref,reactive,defineEmits} from 'vue'
  import { ElMessage, ElMessageBox } from 'element-plus'
  import { globals_config } from '/public/config/globals_config'
  const emit = defineEmits(['update-img-list']);

  const props = defineProps({
    dialogVisible: {
      type: Object,
      default: () => {},
    },
  });
  let formData 
  const visible = toRef(props,'dialogVisible')
  
  const configString = localStorage.getItem('giteeConfig')
  if(configString && JSON.parse(configString)){
    formData = JSON.parse(configString)
  }else{
    formData = globals_config.gitee_user_config
  }

  const giteeConfigForm = reactive(formData)

  const saveConfig = async  (formEl) => {
    console.log(formEl,'formEl')
    if (!formEl) return
    await formEl.validate(async (valid, fields)=>{
      if (valid) {
        console.log('submit!')
        // 校验通过，执行提交逻辑
        localStorage.setItem('giteeConfig',JSON.stringify(giteeConfigForm))
        ElMessage({
            message: '保存成功',
            type: 'success',
        })
        closeDialog()
      } else {
        console.log('error submit!', fields)
        // 校验不通过，提示错误信息 ...
      }
    })
  }

  const handleClose = (done) => {
    ElMessageBox.confirm('Are you sure to close this dialog?')
      .then(() => {
        done()
      })
      .catch(() => {
      })
  }

  const closeDialog = () =>{
    emit('update-img-list')
    visible.value.attr = false
  }

  const giteeFormRef = ref(null)
  const giteeRules = reactive({
    owner: [
      { required: true, message: '请输入你的 gitee 用户名', trigger: 'blur' },
      { min: 2, max: 15, message: 'Length should be 3 to 15', trigger: 'blur' },
    ],repo: [
      {
        required: true,
        message: '请填入仓库名',
        trigger: 'change',
      },
    ],path: [
      {
        required: true,
        message: '请填入文件路径',
        trigger: 'change',
      },
    ],message: [
      {
        required: true,
        message: '请填入上传备注',
        trigger: 'change',
      },
    ],access_token: [
      {
        required: true,
        message: '请填入用户密钥',
        trigger: 'change',
      },
    ],
  })

  

</script>

<style lang="scss">
.dialog-footer button:first-child {
  margin-right: 10px;
}
.gitee-setting-style{
    margin-top: 30vh;
    border-radius: 5px;
    min-width: 380px;
  .el-form{
    width: 380px;
    margin: 0 auto;
  }
  .el-input{
    width: 200px;
  }
}
</style>