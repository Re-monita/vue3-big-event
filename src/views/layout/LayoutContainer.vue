<template>
  <div>
    <el-container>
      <el-aside>
        <div>大事件</div>
        <el-menu>
          <el-menu-item>
            <el-icon><Management /></el-icon>
            <span>文章分类</span>
          </el-menu-item>
          <el-menu-item>
            <el-icon><Promotion /></el-icon>
            <span>文章管理</span>
          </el-menu-item>
          <el-sub-menu>
            <template>
              <el-icon><UserFilled /></el-icon>
              <span>个人中心</span>
            </template>
            <el-menu-item>
              <el-icon><User /></el-icon>
              <span>基本信息</span>
            </el-menu-item>
            <el-menu-item>
              <el-icon><Crop /></el-icon>
              <span>更换头像</span>
            </el-menu-item>
            <el-menu-item>
              <el-icon><EditPen /></el-icon>
              <span>重置密码</span>
            </el-menu-item>
          </el-sub-menu>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header>
          <div>用户：<strong>pumumindu2</strong></div>
          <el-dropdown> </el-dropdown>
        </el-header>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import {
  Management,
  Promotion,
  UserFilled,
  User,
  Crop,
  EditPen
} from '@element-plus/icons-vue'
</script>

<style scoped></style>
