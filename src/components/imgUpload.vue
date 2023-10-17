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
          <el-button type="success" :icon="Plus">新增</el-button>

          <template #file="{ file }">
            <div style="display:flex">
              <img class="el-upload-list__item-thumbnail" :src="file.download_url" alt="" />
              <div class="file__info">
                <div class="flie__info__name"> {{file.name}}</div>
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
    import { uploadUserAvatarReq,getGiteeImgList,delGiteeImg } from '@/apis/userApis.js'

    const dialogImageUrl = ref('')
    const dialogVisible = ref(false)
    const fileList = ref([])


    const handleRemove = async (file) => {
      console.log(file)
      await delGiteeImg(file.sha,file.name)
      ElMessage.success(`${file.name}删除成功！`)
      init()
    }

    const handlePictureCardPreview = (file) => {
      dialogImageUrl.value = file.download_url
      dialogVisible.value = true
    }

    const handleDownload = (file) => {
      console.log(file)
      const a = document.createElement('a');
      a.href = file.download_url;
      a.download = file.name; // 下载的图片文件名，可以根据实际情况修改
      a.target = '_blank';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
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
        ElMessage.success(`${rawFile.name}上传成功！`)
        init()
      };
      
    }

    const init = async () => {
      fileList.value = await getGiteeImgList()
    }

    init()

    
  
</script>
<style lang="scss">
.img-upload{
  height: 100%;
  .el-upload-for-use{
    height: 95%;
    margin: 0 auto;
    .file__info{
      width: 300px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin-left: 15px;
      .flie__info__name{
        width: 100%;
        text-align: left;
        margin: 10px 0
      }
      .el-upload-list__item-actions{
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        >span{
          font-size: 23px;
          display: block;
          margin-right: 30px;
        }
      }
    }
    .el-upload-list{
      height: calc(100% - 30px);
      overflow: auto;
      >li{
        width: 40%;
        min-width: 400px;
        margin: 10px auto;
      }
      
    }
  }
}
</style>

