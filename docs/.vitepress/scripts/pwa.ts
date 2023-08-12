import type { VitePWAOptions } from "vite-plugin-pwa"

export const pwa: Partial<VitePWAOptions> = {
  outDir: ".vitepress/dist",
  registerType: "prompt",
  includeManifestIcons: false,
  manifest: {
    id: "/",
    name: "neomega 文档",
    short_name: "neomega 文档",
    description: "为高技术玩家编写的 neomega 开发文档",
    theme_color: "#ffffff",
    start_url: "/",
    lang: "zh-CN",
    display: "standalone",
    categories: ["neomega"],
    icons: [
      {
        src: "cat.png",
        sizes: "400x400",
        type: "image/png",
      }
    ],
  },
  workbox: {
    globPatterns: ["**/*.{css,js,html,svg,png,ico,txt,woff2}"],
    globIgnores: ["shortcuts/*.svg"],
    runtimeCaching: [
      {
        urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
        handler: "CacheFirst",
        options: {
          cacheName: "google-fonts-cache",
          expiration: {
            maxEntries: 10,
            maxAgeSeconds: 60 * 60 * 24 * 365, // <== 365 days
          },
          cacheableResponse: {
            statuses: [0, 200],
          },
        },
      },
      {
        urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
        handler: "CacheFirst",
        options: {
          cacheName: "gstatic-fonts-cache",
          expiration: {
            maxEntries: 10,
            maxAgeSeconds: 60 * 60 * 24 * 365, // <== 365 days
          },
          cacheableResponse: {
            statuses: [0, 200],
          },
        },
      },
    ],
  },
}
