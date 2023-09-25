<template>
    <el-dialog
    v-model="dialogVisible"
    title="用户注册"
    width="45%"
    :before-close="handleClose"
  >

    <span>This is a message</span>
    
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="dialogVisible = false">
          Confirm
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script lang="js" setup>
  // import { ref } from 'vue'
  import { defineProps,toRefs } from 'vue'
  import { ElMessageBox } from 'element-plus'

  // const dialogVisible = ref(false)
  const props = defineProps({
    dialogVisible: {
      type: Boolean,
      default: false,
    },
  });
  const {dialogVisible} = toRefs(props)
  console.log(dialogVisible)
  const handleClose = (done) => {
    ElMessageBox.confirm('Are you sure to close this dialog?')
      .then(() => {
        done()
      })
      .catch(() => {
        // catch error
      })
  }
</script>
<style scoped>
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>