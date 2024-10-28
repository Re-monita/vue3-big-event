<script setup>
import { ref } from 'vue'
const dialogVisible = ref(false)
const open = (value) => {
  dialogVisible.value = true
  console.log(value)
}
defineExpose({
  open
})
</script>
<template>
  <el-dialog v-model="dialogVisible" width="500">
    <span>渲染弹窗</span>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="dialogVisible = false">
          确认
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>
