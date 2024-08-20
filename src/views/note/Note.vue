<script lang="ts" setup>
import { ref, nextTick, onMounted, onUpdated } from 'vue'
import { Search } from '@element-plus/icons-vue'
import axios from 'axios'

// import MarkdownRenderer from './MarkdownRenderer.vue'
import MarkdownIt from 'markdown-it'
const markdown = new MarkdownIt()
const noteSearch = ref('')
const contentSearch = ref('')
const inputMessage = ref('')

// const markdown = new MarkdownIt()

const markdownContent: string = `
# 这是一个标题

- 列表项 1
- 列表项 2
\`\`\`sh
touch cx.txt
\`\`\`
**这是加粗的文本**
`

const items = ref<Array<any>>([])

// 获取滚动容器的 DOM 引用，明确指定类型为 HTMLDivElement
const scrollContainer = ref<HTMLDivElement | null>(null)

const addContent = async () => {
  // 处理提交逻辑
  //   console.log('提交内容:', inputValue.value)
  const response =
    // await axios.post('https://mitrecx.top:8001/v1/english2-word', {
    await axios.post('http://localhost:8001/v1/notebook-content/add', {
      userId: 1,
      noteId: 1,
      content: inputMessage.value
    })
  console.log(response)
}

const getAllContents = async () => {
  // 处理提交逻辑
  //   console.log('提交内容:', inputValue.value)
  const response =
    // await axios.post('https://mitrecx.top:8001/v1/english2-word', {
    await axios.get('http://localhost:8001/v1/notebook-content/list')
  console.log(response)
  items.value = response.data
}

onMounted(() => {
  getAllContents()
})

onUpdated(() => {
  nextTick(() => {
    const container = scrollContainer.value
    // container.scrollTop = container.scrollHeight
    // 使用可选链操作符来确保 container 不为 null
    container?.scrollTo({
      top: container.scrollHeight,
      behavior: 'smooth'
    })
  })
})

function send() {
  console.log(inputMessage.value)
  addContent()

  // items.value.push({
  //   message: inputMessage.value
  // })
  getAllContents()


  nextTick(() => {
    const container = scrollContainer.value
    // container.scrollTop = container.scrollHeight
    // 使用可选链操作符来确保 container 不为 null
    container?.scrollTo({
      top: container.scrollHeight,
      behavior: 'smooth'
    })
  })
  inputMessage.value = ''
}

// 在添加元素后，确保 DOM 更新完成后再执行滚动操作
</script>

<template>
  <div class="note-container">
    <div class="side">
      <div class="sideheader">
        <el-input v-model="noteSearch" style="width: 240px" placeholder="Type something">
          <template #prefix>
            <el-icon class="el-input__icon"><search /></el-icon>
          </template>
        </el-input>
        <button>新增</button>
      </div>
      <div class="sidebody"></div>
    </div>

    <div class="content">
      <div class="content-head">
        <el-input v-model="contentSearch" style="width: 1000px" placeholder="Type something">
          <template #prefix>
            <el-icon class="el-input__icon"><search /></el-icon>
          </template>
        </el-input>
      </div>
      <div class="content-body" ref="scrollContainer">
        <h1>hello</h1>
        <div>
          <MarkdownRenderer :markdownText="markdownContent" />
        </div>
        <div v-for="item in items" :key = "item.id">
          <div class="avatar">
            <img src="/src/assets/images/note/mitre.png" alt="头像" />
          </div>
          {{ item.id }}
          <div class="message">
            <!-- {{ item.message }} -->
            <div v-html="markdown.render(item.content)"></div>
          </div>
        </div>
      </div>
      <div class="content-bottom">
        <el-input
          v-model="inputMessage"
          style="width: 1000px; font-size: 28px"
          :autosize="{ minRows: 1, maxRows: 8 }"
          type="textarea"
          placeholder="Please input"
        />
        <div class="send" @click="send">
          <el-button
            style="width: 120px; height: 50px; font-size: 36px; margin-left: 20px"
            type="success"
            round
            >Send</el-button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.note-container {
  display: flex;
}

.sidebody {
  width: 300px;
  height: 94vh;
  /* background-color: bisque; */
  border: 3px solid pink;
}
.content {
  width: 100%;
  margin-left: 10px;
  border: 3px solid greenyellow;
}
.content-body {
  height: 88vh;
  width: 100%;
  overflow: auto;
  padding: 1vh;
  border: 3px solid red;
}

.avatar img {
  width: 60px;
  height: 60px;
}
.message {
  margin: 10px 10px 10px 30px;
  font-size: 20px;
  white-space: pre-line;
}

.content-bottom {
  /* 将容器固定在屏幕底部 */
  position: fixed;
  bottom: 0;
  /* 宽度设置为100%，以便按钮可以水平居中 */
  width: 90%;
  margin-bottom: 10px;
  /* 使用Flexbox布局 */
  display: flex;
  align-items: end;
  /* 防止容器内的内容溢出到外部 */
  padding: 10px 0;
  size: 60px;
}
.content-bottom el-input {
  width: 200px;
}

send el-button {
  width: 1200px;
  height: 64px;
}
</style>
