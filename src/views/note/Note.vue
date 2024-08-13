<script lang="ts" setup>
import { ref, nextTick } from 'vue'
import { Search } from '@element-plus/icons-vue'

const noteSearch = ref('')
const contentSearch = ref('')
const inputMessage = ref('')

const items = ref([
  { message: 'Foo' },
  { message: '内容 1' },
  { message: '内容 2' },
  { message: '内容 3' },
  { message: '内容 4' },
  { message: '内容 5' },
  { message: '内容 6' },
  { message: '内容 7' },
  { message: '内容 8' },
  { message: 'Bar' }
])

// 获取滚动容器的 DOM 引用，明确指定类型为 HTMLDivElement
const scrollContainer = ref<HTMLDivElement | null>(null);

function send() {
  console.log(inputMessage.value)

  items.value.push({
    message: inputMessage.value
  })
  inputMessage.value = ''

  nextTick(() => {
    const container = scrollContainer.value
    // container.scrollTop = container.scrollHeight
    // 使用可选链操作符来确保 container 不为 null
    container?.scrollTo({
      top: container.scrollHeight,
      behavior: 'smooth'
    })
  })
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
        <div v-for="item in items">
          <div class="avatar">
            <img src="/src/assets/images/note/mitre.png" alt="头像" />
          </div>
          <div class="message">
            {{ item.message }}
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
