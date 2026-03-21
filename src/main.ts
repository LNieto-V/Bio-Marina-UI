import { createApp, provide, h } from 'vue'
import { createPinia } from 'pinia'
import { DefaultApolloClient } from '@vue/apollo-composable'
import { apolloClient } from './app/apollo'
import App from './App.vue'
import './app/styles/global.css'
import router from './app/router'



const app = createApp({
  setup() {
    provide(DefaultApolloClient, apolloClient)
  },
  render: () => h(App),
})

const pinia = createPinia()

app.use(pinia)
app.use(router)

app.mount('#app')
