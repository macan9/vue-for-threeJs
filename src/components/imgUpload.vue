<template>
    <div class="img-upload">

        <el-upload 
            class="el-upload-for-use"
            action="#"
            list-type="picture"
            :file-list="fileList"
            :before-upload="beforeAvatarUpload"
            :http-request="sendImgToBed"
        >
          <el-icon><Plus /></el-icon>

          <template #file="{ file }">
            <div style="display:flex">
              <img class="el-upload-list__item-thumbnail" :src="file.download_url" alt="" />
              <span class="el-upload-list__item-actions">
                <span @click="handlePictureCardPreview(file)">
                  <el-icon><zoom-in /></el-icon>
                </span>
                <span @click="handleDownload(file)">
                  <el-icon><Download /></el-icon>
                </span>
                <span @click="handleRemove(file)">
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
    import { uploadUserAvatarReq,getGiteeImgList } from '@/apis/userApis.js'

    const dialogImageUrl = ref('')
    const dialogVisible = ref(false)
    const fileList = ref([])


    const handleRemove = (file) => {
      console.log(file)
    }

    const handlePictureCardPreview = (file) => {
      dialogImageUrl.value = file.download_url
      dialogVisible.value = true
    }

    const handleDownload = (file) => {
      console.log(file)
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
        await uploadUserAvatarReq(base64String,rawFile.name)
        ElMessage.success("上传成功！")
        init()
      };
      
    }

    const init = async () => {
      fileList.value = await getGiteeImgList()
      fileList.value.map(i=>{
        i.url = i.url + '?access_token=d18bdb11f5111a41281baef050f7933d'
      })
    }

    init()

    

  

  
</script>
<style lang="scss">
.img-upload{
  height: 100%;
  .el-upload-for-use{
    height: 95%;
    margin: 0 auto;
    
    .el-upload-list{
      height: calc(100% - 30px);
      overflow: auto;
      >li{
        width: 60%;
        min-width: 300px;
        margin: 10px auto;
      }
      .el-upload-list__item-actions{
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-left: 30px;
        >span{
          font-size: 23px;
          display: block;
          margin-right: 30px;
        }
      }
    }
  }
}
</style>

