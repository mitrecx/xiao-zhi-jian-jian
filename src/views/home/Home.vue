<script lang="ts" setup></script>

<template>
  <div class="home-container">
    <div class="sider">
      <a href="#">应用集合</a>
      <a href="#">系统管理</a>
    </div>

    <!-- 内容 -->
    <div class="tools-category">
      <!-- 效率类工具 -->
      <div class="tool">
        <div class="tool-text-container">
          <p class="tool-text">应用集合</p>
        </div>
        <div class="item-body">
          <!-- 笔记 -->
          <div class="item">
            <RouterLink to="/note">
              <img class="item-img" src="/src/assets/images/home/notebook.png" alt="记笔记" />
              <p class="item-title">笔记本</p>
              <p class="item-desc">实现方便快捷地记笔记</p>
            </RouterLink>
          </div>
          <!-- 背单词工具 -->
          <div class="item">
            <RouterLink to="/word">
              <img class="item-img" src="/src/assets/images/home/word_a.png" alt="背单词" />
              <p class="item-title">背单词</p>
              <p class="item-desc">英语二单词集</p>
            </RouterLink>
          </div>

          <!-- 日历 -->
          <div class="item">
            <RouterLink to="/calendar">
              <img class="item-img" src="/src/assets/images/home/calendar_1.png" alt="日历" />
              <p class="item-title">日历</p>
              <p class="item-desc">倒计时日历</p>
            </RouterLink>
          </div>

          <!-- 股票指数 -->
          <div class="item">
            <img class="item-img" src="/src/assets/images/home/stock.jpg" alt="指数" />
            <p class="item-title">股票指数</p>
            <p class="item-desc">各大指数数据(开发中...)</p>
          </div>
        </div>
      </div>

      <div class="tool">
        <div class="tool-text-container">
          <p class="tool-text">系统管理</p>
        </div>
        <div class="item-body">
          <!-- 股票指数 -->
          <div class="item">
            <RouterLink to="/user">
              <img class="item-img" src="/src/assets/images/home/user.jpg" alt="指数" />
              <p class="item-title">系统管理</p>
              <p class="item-desc">系统管理</p>
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.home-container {
  display: flex;
}

.sider a {
  display: block;
  width: 200px;
  height: 80px;
  background-color: #c1f8ac;
  color: #000000;
  text-align: center;
  text-decoration: none;
  line-height: 80px;
  font-size: 18px;
  /* border: 1px solid #000; */
}

.sider > a:hover {
  /* 鼠标悬停 */
  background-color: #f7b0d7;
}

.tool-text-container {
  background-color: #e7edfc;
  margin: 0 5px;
}
.tool-text {
  font-size: 40px;
}

.item-body {
  display: flex;
  height: 48vh;
  margin: 0 5px 10px 5px;
  flex-grow: 1;
  flex-wrap: wrap; /* 确保换行 */
  background-color: #e7edfc;
}

.item {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 140px;
  width: 120px;
  margin: 10px 20px;
  text-align: center;
}
.item-img {
  height: 100px;
  width: 100px;
}

.item-title {
  font-size: 24px;
}

.item-desc {
  font-size: 16px;
  color: rgb(144, 143, 143);
}
</style>
