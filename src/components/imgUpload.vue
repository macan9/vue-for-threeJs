<template>
    <div class="img-upload">

        <el-upload 
            action="#"
            list-type="picture-card"
            :file-list="fileList"
            :before-upload="beforeAvatarUpload"
            :http-request="sendImgToBed"
        >
          <el-icon><Plus /></el-icon>

          <template #file="{ file }">
            <div>
              <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
              <span class="el-upload-list__item-actions">
                <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
                  <el-icon><zoom-in /></el-icon>
                </span>
                <span v-if="!disabled" class="el-upload-list__item-delete" @click="handleDownload(file)">
                  <el-icon><Download /></el-icon>
                </span>
                <span v-if="!disabled" class="el-upload-list__item-delete" @click="handleRemove(file)">
                  <el-icon><Delete /></el-icon>
                </span>
              </span>
            </div>
          </template>
        </el-upload>

        <el-dialog v-model="dialogVisible">
          <img w-full :src="dialogImageUrl" alt="Preview Image" />
        </el-dialog>
    </div>
</template>

<script setup>
    import { ref } from 'vue'
    import { ElMessage } from 'element-plus'
    import { Plus } from '@element-plus/icons-vue'
    import { uploadUserAvatarReq } from '@/apis/userApis.js'

    const dialogImageUrl = ref('')
    const dialogVisible = ref(false)
    const disabled = ref(false)
    const fileList = ref([
      {
        name: 'food.jpeg',
        url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
      },
      {
        name: 'food2.jpeg',
        url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
      },
    ])


    const handleRemove = (file) => {
      console.log(file)
    }

    const handlePictureCardPreview = (file) => {
      dialogImageUrl.value = file.url
      dialogVisible.value = true
    }

    const handleDownload = (file) => {
      console.log(file)
    }
 
    const handleAvatarSuccess =  (res,uploadFile) => {
      console.log(res,uploadFile)
    }

    const beforeAvatarUpload = async (rawFile) => {
      if (rawFile.type !== 'image/jpeg' && rawFile.type !== 'image/png') {
          ElMessage.error('Avatar picture must be JPG or PNG format!')
          return false
      } else if (rawFile.size / 1024 / 1024 > 2) {
          ElMessage.error('Avatar picture size can not exceed 2MB!')
          return false
      }
      return true
    }

    const sendImgToBed = (options) => {
      console.log(options,'options')
      const rawFile = options.file
      const reader = new FileReader();
      reader.readAsBinaryString(rawFile);
      reader.onload = async () => {
        const binaryString = reader.result;
        const base64String = btoa(binaryString);

        console.log(base64String);
        const res = await uploadUserAvatarReq(base64String,rawFile.name)
        ElMessage.success("上传成功！")
        handleAvatarSuccess(res,rawFile)
      };
      
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