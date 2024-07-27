<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'
const getResult = ref<any | null>(null)

const pageNumber = ref<any | null>(1)
const pageSize = ref(1)
// 最大页数
const pages = ref(10)
const total = ref(1)
const current = ref(1)

const sendGetRequest = async () => {
  try {
    // 假设你的API接受查询字符串参数而不是请求体 139.196.20.110
    // const response = await axios.post('http://localhost:8001/v1/english2-word/page2', {
    const response = await axios.post('http://139.196.20.110:8001/v1/english2-word/page2', {
      pageNumber: pageNumber.value,
      pageSize: pageSize.value
    })
    console.log(response)

    getResult.value = response.data

    pages.value = response.data.pages
    total.value = response.data.total
    current.value = response.data.current
  } catch (error) {
    console.error('GET请求失败:', error)
  }
}

onMounted(() => {
  sendGetRequest()
})

function previous() {
  if (pageNumber.value >= 1) {
    pageNumber.value--
    sendGetRequest()
  }
}

function next() {
  if (pageNumber.value < pages.value) {
    pageNumber.value++
    sendGetRequest()
  }
}

const showModal = ref(false)
const inputValue = ref('')

const submit = () => {
  // 处理提交逻辑
  //   console.log('提交内容:', inputValue.value)
  pageNumber.value = inputValue.value
  sendGetRequest()
  closeModal()
}

const closeModal = () => {
  showModal.value = false
}
</script>

<template>
  <div class="word-container">
    <div class="word-header">
      <p @click="showModal = true">{{ current }} / {{ total }}</p>
    </div>

    <div class="word-body">
      <teleport to="body">
        <div v-if="showModal" class="modal">
          <div class="modal-content">
            <input type="number" placeholder="请输入内容" v-model="inputValue" />
            <button @click="submit">确定</button>
            <button @click="closeModal">取消</button>
          </div>
        </div>
      </teleport>
      <el-scrollbar height="60vh">
        <!-- <p v-for="item in 20" :key="item" class="scrollbar-demo-item">{{ item }}</p> -->
        <div v-if="getResult" class="card">
          <!-- <p>{{ getResult.records }}</p> -->
          <ul>
            <li>{{ getResult.records[0].word }}</li>
            <li>{{ getResult.records[0].phoneticSymbol }}</li>
            <li>{{ getResult.records[0].chinese }}</li>
            <li>出现频率: {{ getResult.records[0].frequency }}</li>
          </ul>
        </div>
      </el-scrollbar>
    </div>

    <div class="word-operation">
      <button class="operation" @click="previous">上一个</button>
      <button class="operation" @click="next">下一个</button>
    </div>
  </div>
</template>

<style>
.card ul li:nth-child(1) {
  background-color: #f0fff0;
}
.card ul li:nth-child(2) {
  background-color: #f0fff0;
}
.card ul li:nth-child(3) {
  background-color: #e6e6fa;
}
.card ul li:nth-child(4) {
  background-color: #f5f5f5;
}
.word-container * {
  text-align: center;
  font-size: 55px;
}
.card {
  height: 40vh;
}
ul li {
  margin: 0;
  padding: 1vh;
}
.operation {
  margin: 3vh;
}

.scrollbar-demo-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 80vh;
  /* margin: 10px; */
  text-align: center;
  border-radius: 4px;
  background: var(--el-color-primary-light-9);
  color: var(--el-color-primary);
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  font-size: 55px;
  background: white;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}
</style>
