<script setup>
import { artGetChannelsService } from '@/api/article'
import { ref } from 'vue'
defineProps({})

const channelList = ref([])

const getChannelList = async () => {
  const res = await artGetChannelsService()
  console.log(res)

  channelList.value = res.data.data
  console.log(channelList.value)
}

getChannelList()
</script>
<template>
  <el-form-item label="文章分类：">
    <el-select style="width: 300px">
      <el-option
        v-for="channel in channelList"
        :key="channel.id"
        :label="channel.cate_alias"
        :value="channel.cate_name"
      ></el-option>
    </el-select>
  </el-form-item>
</template>
