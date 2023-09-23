import Theme from "vitepress/theme"
import { h } from "vue"
import { vuePlugin } from "vitepress-demo-editor"
import "vitepress-demo-editor/dist/style.css"
import Comment from "./components/Comment.vue"
import Contributors from "./components/Contributors.vue"
import Badge from "./components/Badge.vue"
import ReloadPrompt from "./components/ReloadPrompt.vue"
import "./style.css"

export default {
  ...Theme,
  Layout: () => {
    return h(Theme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
      "doc-after": () => h(Comment),
      "doc-footer-before": () => h(Contributors),
      "layout-bottom": () => h(ReloadPrompt),
    })
  },
  enhanceApp(ctx) {
    ctx.app.component("Badge", Badge)
  },
  enhanceApp({ app }) {
    app.use(vuePlugin, {
      defaultDirection: "row",
      ms: 30,
      handleError(errs) {},
      onMonacoCreated(monaco) {},
    }),
  },
}
