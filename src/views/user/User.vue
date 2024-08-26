<template>
  <div class="req-params">
    <div class="req-line">
      <div class="req-item">
        <span>登录名: </span>
        <el-input v-model="loginNameReq" style="width: 240px" placeholder="Please input" />
      </div>
      <div class="req-item">
        <span>用户名: </span>
        <el-input v-model="usernameReq" style="width: 240px" placeholder="Please input" />
      </div>
      <div class="req-item">
        <span>邮箱: </span>
        <el-input v-model="emailReq" style="width: 240px" placeholder="Please input" />
      </div>
    </div>
    <div class="req-line">
      <div class="req-item">
        <span>电话: </span>
        <el-input v-model="phoneReq" style="width: 240px" placeholder="Please input" />
      </div>
      <div class="req-item">
        <span>状态: </span>
        <!-- <el-input v-model="statusReq" style="width: 240px" placeholder="Please input" /> -->
        <el-select v-model="statusReq" clearable placeholder="Select" style="width: 240px">
          <el-option
            v-for="item in statusOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div>
      <div class="req-item">
        <span>是否删除: </span>
        <!-- <el-input v-model="deletedReq" style="width: 240px" placeholder="Please input" /> -->
        <el-select v-model="deletedReq" clearable placeholder="Select" style="width: 240px">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div>
    </div>
  </div>
  <div class="button-container">
    <el-button size="large" style="font-size: 18px" type="primary" @click="search">查询</el-button>
    <el-button size="large" style="font-size: 18px" type="success" @click="addUser"
      >新增用户</el-button
    >
  </div>

  <el-table :data="tableData" stripe style="width: 100%">
    <el-table-column prop="userId" label="id" width="180" />
    <el-table-column prop="loginName" label="登录名" width="180" />
    <el-table-column prop="username" label="用户名" />
    <el-table-column prop="status" label="状态" />
    <el-table-column prop="email" label="邮箱" />
    <el-table-column prop="phone" label="电话" />
    <!-- 操作按钮 -->
    <el-table-column fixed="right" label="操作" width="300">
      <template #default="scope">
        <el-button @click="detailUserAction(scope.row.userId)" type="primary">查看</el-button>
        <el-button @click="updateUserAction(scope.row.userId)" type="primary">编辑</el-button>
        <el-button type="danger">删除</el-button>
      </template>
    </el-table-column>
  </el-table>

  <el-pagination
    background
    layout="prev, pager, next"
    :total="total"
    @prev-click="prevClick"
    @next-click="nextClick"
    @current-change="currentChange"
  />
</template>

<script lang="ts" setup>
import { pageUser } from '@/api/index'
import { ref, onMounted } from 'vue'
import * as tuser from '@/api/type_user'
import { useRouter } from 'vue-router'

const router = useRouter()
const tableData = ref<tuser.PageRes[]>([])
const total = ref(0)
const pageNumber = ref(1)
const pageSize = ref(10)
const loginNameReq = ref('')
const usernameReq = ref('')
const emailReq = ref('')
const phoneReq = ref('')
const statusReq = ref('')
const deletedReq = ref(false)

const options = [
  {
    value: true,
    label: '已删除'
  },
  {
    value: false,
    label: '未删除'
  }
]

const statusOptions = [
  {
    value: '0',
    label: '正常'
  },
  {
    value: '1',
    label: '锁定'
  },
  {
    value: '2',
    label: '过期'
  }
]
// 查询
const search = async () => {
  const res = await pageUser({
    pageNumber: pageNumber.value,
    pageSize: pageSize.value,
    loginName: loginNameReq.value,
    username: usernameReq.value,
    email: emailReq.value,
    phone: phoneReq.value,
    status: statusReq.value,
    deleted: deletedReq.value
  })
  if (res.data.data != undefined) {
    tableData.value = res.data.data.records
    total.value = res.data.data.total
  }
}

onMounted(async () => {
  const res = await pageUser({
    pageNumber: pageNumber.value,
    pageSize: pageSize.value
  })

  console.log(res.data)
  if (res.data.data != undefined) {
    tableData.value = res.data.data.records
    total.value = res.data.data.total
  }
})

// 新增用户
const addUser = () => {
  router.push('/user/add')
}

// 用户详情
const detailUserAction = (userId: number) => {
  router.push(`/user/detail/${userId}`)
}

// 编辑用户
const updateUserAction = (userId: number) => {
  router.push(`/user/update/${userId}`)
}

// 上一页
const prevClick = async () => {
  pageNumber.value = pageNumber.value - 1 > 0 ? pageNumber.value - 1 : 1
  // 更新数据
  const res = await pageUser({
    pageNumber: pageNumber.value,
    pageSize: pageSize.value
  })
  if (res.data.data != undefined) {
    tableData.value = res.data.data.records
  }
}
// 下一页
const nextClick = async () => {
  pageNumber.value = pageNumber.value + 1
  // 更新数据
  const res = await pageUser({
    pageNumber: pageNumber.value,
    pageSize: pageSize.value
  })
  if (res.data.data != undefined) {
    tableData.value = res.data.data.records
  }
}

// 当前页
const currentChange = async (val: number) => {
  pageNumber.value = val
  // 更新数据
  const res = await pageUser({
    pageNumber: pageNumber.value,
    pageSize: pageSize.value
  })
  if (res.data.data != undefined) {
    tableData.value = res.data.data.records
  }
}
</script>

<style>
.req-params {
  /* display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center; */
  /* 间距 */
  margin: 10px;
  /* 边框 */
  border: 1px solid #ccc;
}

.req-line {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

.req-item {
  margin: 10px;
}

.button-container {
  /* 元素居中 */
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
