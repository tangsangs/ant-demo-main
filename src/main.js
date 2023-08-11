import  {createApp} from 'vue';
import App from './App.vue';
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';
import axios from 'axios';
import Mock from '../mock';
import router from "@/router";

createApp(App).config.productionTip = false;

createApp(App).use(Antd);

createApp(App).config.globalProperties.$axios = axios;


createApp(App).use(router).use(Antd).mount('#app')
