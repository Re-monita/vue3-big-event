<script setup>
import { artGetChannelsService } from '@/api/article'
import { ref } from 'vue'
// defineProps({
//   modelValue: {
//     type: [Number, String]
//   }
// })

// const emit = defineEmits(['update:modelValue'])

const model = defineModel()

const channelList = ref([])

const getChannelList = async () => {
  const res = await artGetChannelsService()
  channelList.value = res.data.data
}

getChannelList()
</script>
<template>
  <el-select style="width: 300px" v-model="model">
    <!-- <el-select
    style="width: 300px"
    :modelValue="modelValue"
    @update:modelValue="emit('update:modelValue', $event)"
  > -->
    <el-option
      v-for="channel in channelList"
      :key="channel.id"
      :label="channel.cate_name"
      :value="channel.id"
    ></el-option>
  </el-select>
</template>
