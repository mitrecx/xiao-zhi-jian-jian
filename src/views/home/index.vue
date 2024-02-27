<template>
  <div class="home">
    <div class="header">
      <button class="logout" @click="logout">Logout</button>
    </div>

    <div class="calendar">
      <p class="week-number">
        本周是 {{currentYear}} 年的第 <span>{{ currentWeek }}</span
        >/{{ totalWeeksInYear }} 周
      </p>
      <el-calendar>
        <template #date-cell="{ data }">
          <p :class="data.isSelected ? 'is-selected' : ''">
            {{ data.day.split('-').slice(1).join('-') }}
            {{ data.isSelected ? '✔️' : '' }}
          </p>
        </template>
      </el-calendar>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { reqLogout } from '@/api'
import router from '@/router'

const logout = async () => {
  // 调用后端的登出接口
  await reqLogout()

  // 跳转到登录页面
  router.push({ name: 'login' })
}

function getWeekNumber(): number {
  const now: Date = new Date()
  const startOfYear: Date = new Date(now.getFullYear(), 0, 0)
  const difference: number = now.getTime() - startOfYear.getTime()
  const oneWeek: number = 1000 * 60 * 60 * 24 * 7
  const weekNumber: number = Math.floor(difference / oneWeek) + 1

  return weekNumber
}

// 调用函数获取当前周数
const currentWeek = ref(getWeekNumber())

function getTotalWeeksInYear(year: number): number {
  const startOfYear: Date = new Date(year, 0, 1);
  const endOfYear: Date = new Date(year, 11, 31);

  const daysInYear: number = (endOfYear.getTime() - startOfYear.getTime()) / (1000 * 60 * 60 * 24);
  const totalWeeks: number = Math.ceil(daysInYear / 7);

  return totalWeeks;
}

// 获取当前年份
const currentYear = ref(new Date().getFullYear());

// 调用函数获取今年的周数
const totalWeeksInYear = ref(getTotalWeeksInYear(currentYear.value));

</script>

<style scoped lang="scss">
.header {
  display: flex;
  justify-content: flex-end;

  .logout {
    margin: 10px;
  }
}
.calendar {
  margin-top: 50px;
}
.is-selected {
  color: #1989fa;
}
.week-number {
  font-size: 30px;
  span {
    color: red;
  }
}
</style>
