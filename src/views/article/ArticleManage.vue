<template>
  <page-container title="文章管理">
    <template #extra>
      <el-button type="primary" @click="onAddArticle">添加文章</el-button>
    </template>

    <!-- 表单部分 -->
    <el-form inline>
      <el-form-item label="文章分类：">
        <channel-select v-model="params.cate_id" width="300px"></channel-select>
      </el-form-item>
      <el-form-item label="发布状态：">
        <el-select style="width: 300px" v-model="params.state">
          <el-option label="已发布" value="已发布"></el-option>
          <el-option label="草稿" value="草稿"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button @click="onSearch" type="primary">搜索</el-button>
        <el-button @click="onReset">重置</el-button>
      </el-form-item>
    </el-form>
    <!-- 表格部分 -->
    <el-table :data="articleList" v-loading="loading">
      <el-table-column label="文章标题" prop="title"></el-table-column>
      <el-table-column label="分类" prop="cate_name"></el-table-column>
      <el-table-column label="发表时间" prop="pub_date">
        <template #default="{ row }">
          {{ formatTime(row.pub_date) }}
        </template>
      </el-table-column>
      <el-table-column label="状态" prop="state"></el-table-column>
      <el-table-column label="操作">
        <template #default="{ row }">
          <el-button
            circle
            plain
            type="primary"
            :icon="Edit"
            @click="onEditArtical(row)"
          ></el-button>
          <el-button
            circle
            plain
            type="danger"
            :icon="Delete"
            @click="onDeleteArtical(row)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      v-model:current-page="params.pagenum"
      v-model:page-size="params.pagesize"
      :page-sizes="[2, 3, 5, 10]"
      background
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      style="justify-content: flex-end; margin-top: 20px"
    />
    <!-- 添加抽屉 -->
    <article-edit ref="articleEditRef"></article-edit>
  </page-container>
</template>

<script setup>
import { ref } from 'vue'
import { Edit, Delete } from '@element-plus/icons-vue'
import ChannelSelect from './components/ChannelSelect.vue'
import { artGetListService } from '@/api/article'
import { formatTime } from '@/utils/format'
import ArticleEdit from './components/ArticleEdit.vue'
const params = ref({
  pagenum: 1,
  pagesize: 5,
  cate_id: '',
  state: ''
})

const articleList = ref([])
const total = ref(0)
const loading = ref(false)
const articleEditRef = ref()

const getArticalList = async () => {
  loading.value = true
  const res = await artGetListService(params.value)
  articleList.value = res.data.data
  total.value = res.data.total
  loading.value = false
}

const onAddArticle = () => {
  articleEditRef.value.open()
}

const onEditArtical = (row) => {
  articleEditRef.value.open(row)
}

const onDeleteArtical = () => {}

const onSearch = () => {
  params.value.pagenum = 1
  getArticalList()
}

const onReset = () => {
  params.value.pagenum = 1
  params.value.cate_id = ''
  params.value.state = ''
  getArticalList()
}

const handleSizeChange = (val) => {
  params.value.pagenum = 1
  params.value.pagesize = val
  getArticalList()
}

const handleCurrentChange = (val) => {
  params.value.pagenum = val
  getArticalList()
}

getArticalList()
</script>

<style lang="scss" scoped></style>
