<script setup>
import { ref } from 'vue'
import { artGetChannelsService, artDelChannelsService } from '@/api/article'
import { Edit, Delete } from '@element-plus/icons-vue'
import ChannelEdit from './components/ChannelEdit.vue'
import { ElMessage } from 'element-plus'
const channelList = ref([])
const loading = ref(false)
const dialog = ref(false)
const getChannelList = async () => {
  loading.value = true
  const res = await artGetChannelsService()
  channelList.value = res.data.data
  // channelList.value = []
  loading.value = false
  console.log(channelList.value)
}
const onEditChannel = (row) => {
  dialog.value.open(row)
}

const onDelChannel = async (row) => {
  try {
    await ElMessageBox.confirm('确认删除该分类吗？', '温馨提示', {
      type: 'warning',
      confirmButtonText: '确认',
      cancelButtonText: '取消'
    })
    await artDelChannelsService(row.id)
    ElMessage.success('删除成功')
    getChannelList()
  } catch {
    console.log('取消成功')
  }
}

const onAddChannel = async () => {
  dialog.value.open({})
}

const onSuccess = () => {
  getChannelList()
}
getChannelList()
</script>

<template>
  <page-container title="文章分类">
    <template #extra>
      <el-button type="primary" @click="onAddChannel">添加分类</el-button>
    </template>
    <el-table :data="channelList" style="width: 100%" v-loading="loading">
      <el-table-column label="序号" type="index" width="100"></el-table-column>
      <el-table-column label="分类名称" prop="cate_name"></el-table-column>
      <el-table-column label="分类别名" prop="cate_alias"></el-table-column>
      <el-table-column label="操作" width="100">
        <template #default="{ row }">
          <el-button
            type="primary"
            :icon="Edit"
            circle
            plain
            @click="onEditChannel(row)"
          ></el-button>
          <el-button
            type="danger"
            :icon="Delete"
            circle
            plain
            @click="onDelChannel(row)"
          ></el-button>
        </template>
      </el-table-column>
      <template #empty>
        <el-empty description="没有数据" />
      </template>
    </el-table>
    <ChannelEdit ref="dialog" @success="onSuccess"></ChannelEdit>
  </page-container>
</template>

<style lang="scss" scoped></style>
