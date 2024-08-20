<template>
  <el-scrollbar @scroll="handleScroll" ref="scrollbar" height="400px">
    <div v-for="item in items" :key="item.id" class="item">
      {{ item.content }}
    </div>
  </el-scrollbar>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';

interface Item {
  id: number;
  content: string;
}

const items = ref<Item[]>([]);
const scrollbar = ref<HTMLElement | null>(null);

const loadMoreData = () => {
  const newItems: Item[] = Array.from({ length: 10 }, (_, index) => ({
    id: items.value.length + index + 1,
    content: `Item ${items.value.length + index + 1}`,
  }));
  items.value.unshift(...newItems);
};

const handleScroll = (e: Event) => {
    const target = e.target as HTMLElement;
  console.log(11111);
  
  if (target.scrollTop === 0) {
    loadMoreData();
    target.scrollTop = 1; // 防止滚动位置跳动
  }
};

onMounted(() => {
  loadMoreData(); // 初始加载数据
});
</script>

<style scoped>
.item {
  padding: 16px;
  border-bottom: 1px solid #ebebeb;
}
</style>