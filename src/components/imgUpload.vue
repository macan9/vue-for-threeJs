<template>
    <div class="img-upload">
        <el-upload
            class="avatar-uploader"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
        >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
        </el-upload>
    </div>
</template>

<script setup>
    import { ref } from 'vue'
    import { ElMessage } from 'element-plus'
    import { Plus } from '@element-plus/icons-vue'

    import { uploadUserAvatarReq } from '@/apis/userApis.js'


    const imageUrl = ref('')

 
    const handleAvatarSuccess =  (res,uploadFile) => {
        imageUrl.value = URL.createObjectURL(uploadFile.raw)
        
    }

    const beforeAvatarUpload = async (rawFile) => {
      if (rawFile.type !== 'image/jpeg' && rawFile.type !== 'image/png') {
          ElMessage.error('Avatar picture must be JPG or PNG format!')
          return false
      } else if (rawFile.size / 1024 / 1024 > 2) {
          ElMessage.error('Avatar picture size can not exceed 2MB!')
          return false
      }
      // retun false 可以改成自己的自定义的上传方式


      const reader = new FileReader();
      reader.readAsBinaryString(rawFile);
      reader.onload = async () => {
        const binaryString = reader.result;
        const base64String = btoa(binaryString);

        console.log(base64String);
        await uploadUserAvatarReq(base64String,rawFile.name)
        ElMessage.success("上传成功！")
      };
      
      return false
    }

  

  
</script>

<style scoped>
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>