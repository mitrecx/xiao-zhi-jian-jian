<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'
const getResult = ref<any | null>(null)

const pageNumber = ref(1)
const pageSize = ref(1)
// 最大页数
const pages = ref(10)

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
</script>

<template>
  <div class="word-container">
    <!-- <button @click="sendGetRequest">发送GET请求</button> -->
    <div v-if="getResult" class="card">
      <!-- <p>{{ getResult.records }}</p> -->
      <ul>
        <li>{{ getResult.records[0].word }}</li>
        <li>{{ getResult.records[0].phoneticSymbol }}</li>
        <li>{{ getResult.records[0].chinese }}</li>
        <li>出现频率: {{ getResult.records[0].frequency }}</li>
      </ul>
    </div>

    <div>
      <button class="operation" @click="previous">上一个</button>
      <button class="operation" @click="next">下一个</button>
    </div>
  </div>
</template>

<style>
.word-container {
  text-align: center;
}
.card {
  height: 80vh;
}
ul li {
  margin: 4vh;
}
.operation{
    margin: 3vh;
}
</style>
