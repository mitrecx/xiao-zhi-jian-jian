import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router';
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
//引入模板的全局的样式
import '@/styles/index.scss'


const app = createApp(App)
app.use(router);
app.use(ElementPlus)
app.use(createPinia())

app.mount('#app')
