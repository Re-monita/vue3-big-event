<script setup>
import { ref } from 'vue'
import ChannelSelect from './ChannelSelect.vue'
const visibleDrawer = ref(false)
const defaultForm = ref({
  title: '',
  cate_id: '',
  content: '',
  cover_img: '',
  state: ''
})
const formModel = ref({ ...defaultForm })
const open = (row) => {
  visibleDrawer.value = true
  console.log(row)

  if (row) {
    console.log('修改回显')
    formModel.value = {
      title: row.title,
      cate_id: row.id,
      content: '',
      cover_img: '',
      state: row.state
    }
  } else {
    formModel.value = { ...defaultForm }
  }
  console.log(row)
}
defineExpose({ open })
</script>

<template>
  <el-drawer title="大标题" direction="rtl" v-model="visibleDrawer" size="50%">
    <el-form :model="formModel" label-width="100px">
      <el-form-item label="文章标题" prop="title">
        <el-input placeholder="请输入标题" v-model="formModel.title"></el-input>
      </el-form-item>
      <el-form-item label="文章分类" prop="cate_id">
        <channel-select
          v-model="formModel.cate_id"
          width="100%"
        ></channel-select>
      </el-form-item>
      <el-form-item label="文章封面" prop="cover_img"> 文件上传 </el-form-item>
      <el-form-item label="文章内容" prop="content">
        <div>富文本编辑器</div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">发布</el-button>
        <el-button type="info">草稿</el-button>
      </el-form-item>
    </el-form>
  </el-drawer>
</template>
