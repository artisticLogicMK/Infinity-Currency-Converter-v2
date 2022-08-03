import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import './assets/style/css/font-awesome.min.css'
import './assets/style/index.css'
import 'animate.css'

createApp(App).use(store).mount('#app')
