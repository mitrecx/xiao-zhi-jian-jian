<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { ElNotification } from 'element-plus'

const getResult = ref<any | null>(null)

const pageNumber = ref<any | null>(1)
const pageSize = ref(1)
// 最大页数
const pages = ref(10)
const total = ref(1)
const current = ref(1)

const showModal = ref(false)
const inputValue = ref('')
const searchWord = ref('')

const showModalOperation = ref(false)
const wordId = ref<any | null>(null)
const wordOrder = ref(1)
const word = ref('')
const phoneticSymbol = ref('')
const chinese = ref('')
const frequency = ref(1)

const search = async () => {
  // 处理提交逻辑
  //   console.log('提交内容:', inputValue.value)
  const response = await axios.get(
    'http://139.196.20.110:8001/v1/english2-word/search-page-number',
    {
      //   const response = await axios.get('http://localhost:8001/v1/english2-word/search-page-number', {
      params: {
        word: searchWord.value
      }
    }
  )
  console.log(response)
  if (response.data == null || response.data == '' || response.data == 0) {
    ElNotification({
      type: 'error',
      message: '没有查询到结果'
    })
  } else {
    pageNumber.value = response.data
    sendGetRequest()
  }
}

const clear = () => {
  searchWord.value = ''
}

const audioUrl = ref<any>(null)

const loadAudio = async (word: any) => {
  try {
    const response = await axios.get(
      `http://139.196.20.110:8001/v1/english2-word/download/${word}`,
      {
        responseType: 'blob'
      }
    )
    console.log(response.data)

    const url = URL.createObjectURL(response.data)
    audioUrl.value = url
  } catch (error) {
    console.error('Error fetching audio file:', error)
  }
}

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
    loadAudio(response.data.records[0].word)

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
  if (pageNumber.value > 1) {
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

function update() {
  showModalOperation.value = true
  wordId.value = getResult.value.records[0].wordId
  wordOrder.value = getResult.value.records[0].wordOrder
  word.value = getResult.value.records[0].word
  phoneticSymbol.value = getResult.value.records[0].phoneticSymbol
  chinese.value = getResult.value.records[0].chinese
  frequency.value = getResult.value.records[0].frequency
}

function clearOperationForm() {
  wordId.value = null
  wordOrder.value = 1
  word.value = ''
  phoneticSymbol.value = ''
  chinese.value = ''
  frequency.value = 1
}

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

const submitOperation = async () => {
  // 处理提交逻辑
  //   console.log('提交内容:', inputValue.value)
  await axios.post('http://139.196.20.110:8001/v1/english2-word', {
    //   await axios.post('http://localhost:8001/v1/english2-word', {
    wordId: wordId.value,
    wordOrder: wordOrder.value,
    word: word.value,
    phoneticSymbol: phoneticSymbol.value,
    chinese: chinese.value,
    frequency: frequency.value
  })
  // console.log(response)

  closeModalOperation()
  clearOperationForm()
  sendGetRequest()
}

const closeModalOperation = () => {
  showModalOperation.value = false
}
</script>

<template>
  <div class="word-container">
    <div class="word-header">
      <p @click="showModal = true">{{ current }} / {{ total }}</p>
    </div>

    <div class="search-container">
      <input type="text" class="search-input" placeholder="Search..." v-model="searchWord" />
      <button class="search-button" @click="search">Search</button>
      <button class="search-button" @click="clear">Clear</button>
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

      <teleport to="body">
        <div v-if="showModalOperation" class="modal">
          <div class="modal-content">
            <label for="wordOrder">序号</label>
            <input id="wordOrder" type="number" v-model="wordOrder" />
            <label for="word">单词</label>
            <input id="word" type="text" v-model="word" />
            <label for="phoneticSymbol">音标</label>
            <input id="phoneticSymbol" type="text" v-model="phoneticSymbol" />
            <label for="chinese">中文意思</label>
            <input id="chinese" type="text" v-model="chinese" />
            <label for="frequency">频率</label>
            <input id="frequency" type="number" v-model="frequency" />
            <button @click="submitOperation">确定</button>
            <button @click="closeModalOperation">取消</button>
          </div>
        </div>
      </teleport>

      <el-scrollbar height="60vh">
        <!-- <p v-for="item in 20" :key="item" class="scrollbar-demo-item">{{ item }}</p> -->
        <div v-if="getResult" class="card">
          <!-- <p>{{ getResult.records }}</p> -->
          <ul>
            <li>{{ getResult.records[0].word }}</li>
            <li>
              <p>{{ getResult.records[0].phoneticSymbol }}</p>

              <audio v-if="audioUrl" :src="audioUrl" controls>
                Your browser does not support the audio element.
              </audio>
              <!-- <button @click="loadAudio('ability')">Load Audio</button> -->
            </li>
            <li>{{ getResult.records[0].chinese }}</li>
            <li>出现频率: {{ getResult.records[0].frequency }}</li>
          </ul>
        </div>
      </el-scrollbar>
    </div>

    <div class="word-query">
      <button class="query" @click="previous">上一个</button>
      <button class="query" @click="next">下一个</button>
    </div>

    <div class="word-operation">
      <button class="operation" @click="showModalOperation = true">新增</button>
      <button class="operation" @click="update">修改</button>
    </div>
  </div>
</template>

<style>
.word-header {
  display: flex;
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
  height: 5vh; /* 设置高度，使内容垂直居中 */
}

.word-header p {
  height: 5vh; /* 设置高度为 10vh */
  display: flex;
  justify-content: center; /* 文本垂直居中 */
  align-items: center; /* 文本垂直居中 */
  background-color: #f6c4d2;
}

.search-container {
  display: flex;
  align-items: center;
}

.search-input {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-right: 5px;
}

.search-button {
  padding: 8px 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

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
.query {
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
  padding: 5px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
}
.modal-content label {
  margin-bottom: 5px;
}

.modal-content input {
  margin-bottom: 10px;
}
</style>
