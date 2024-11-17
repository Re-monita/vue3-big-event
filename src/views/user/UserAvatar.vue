<script setup>
import PageContainer from '@/components/PageContainer.vue'
import { Plus } from '@element-plus/icons-vue'
import { ref } from 'vue'
import { useUserStore } from '@/stores'
import { userUploadAvatarService } from '@/api/user'
const userStore = useUserStore()
const imageUrl = ref(userStore.user.user_pic)
const uploadRef = ref()
const onUploadFile = (file) => {
  const render = new FileReader()
  render.readAsDataURL(file.raw)
  render.onload = () => {
    imageUrl.value = render.result
  }
}
const onUpdateAvatar = async () => {
  await userUploadAvatarService(imageUrl.value)
  await userStore.getUser()
  ElMessage({ type: 'success', message: '更换头像成功' })
}
</script>

<template>
  <page-container title="更换头像">
    <el-upload
      class="avatar-uploader"
      :show-file-list="false"
      ref="uploadRef"
      :on-change="onUploadFile"
      :auto-upload="false"
    >
      <img v-if="imageUrl" :src="imageUrl" class="avatar" />
      <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
    </el-upload>
    <br />
    <el-button
      type="primary"
      :icon="Plus"
      size="large"
      @click="uploadRef.$el.querySelector('input').click()"
      >选择图片</el-button
    >
    <el-button
      type="success"
      :icon="Upload"
      size="large"
      @click="onUpdateAvatar"
      >上传头像</el-button
    >
  </page-container>
</template>

<style lang="scss" scoped>
.avatar-uploader {
  :deep() {
    .avatar {
      width: 278px;
      height: 278px;
      display: block;
    }
    .el-upload {
      border: 1px dashed var(--el-border-color);
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      transition: var(--el-transition-duration-fast);
    }
    .el-upload:hover {
      border-color: var(--el-color-primary);
    }
    .el-icon.avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 278px;
      height: 278px;
      text-align: center;
    }
  }
}
</style>
