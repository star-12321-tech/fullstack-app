import { createApp } from 'vue'
import App from './App.vue'
import router from './router' // or './router/index.js'
import '@mdi/font/css/materialdesignicons.css' 

// Vuetify configuration
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
  components,
  directives,
})

const app = createApp(App)

app.use(router)   // Explicitly inject the router
app.use(vuetify)  // Explicitly inject Vuetify

app.mount('#app')
