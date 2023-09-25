import Theme from "vitepress/theme"
import { h } from "vue"
import Comment from "./components/Comment.vue"
import Contributors from "./components/Contributors.vue"
import Badge from "./components/Badge.vue"
import ReloadPrompt from "./components/ReloadPrompt.vue"
import "./style.css"
import Documate from '@documate/vue'
import '@documate/vue/dist/style.css'
import { createApp } from 'vue'
import App from './App.vue'
import VueAmazingUI from 'vue-amazing-ui'
import 'vue-amazing-ui/css'

const app = createApp(App)
app.use(VueAmazingUI)
app.mount('#app')

export default {
  ...Theme,
  Layout: () => {
    return h(Theme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
      "doc-after": () => h(Comment),
      "doc-footer-before": () => h(Contributors),
      "layout-bottom": () => h(ReloadPrompt),
      'nav-bar-content-before': () => h(Documate, {
        endpoint: 'https://z4tymshtgq.us.aircode.run/ask',
      }),
    })
  },
  enhanceApp(ctx) {
    ctx.app.component("Badge", Badge)
  },
}
