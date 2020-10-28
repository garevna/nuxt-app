const fetch = require('node-fetch')

export default {
  target: 'static',
  ssr: true,
  head: {
    title: 'nuxt-app',
    components: true,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Lightning Fast Fibre Internet' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/nuxt-app/favicon.ico' }
    ]
  },
  router: {
    base: '/nuxt-app/',
    extendRoutes(routes, resolve) {
      routes.push({
        name: 'page-1',
        path: '/conservatory',
        component: resolve('pages/Page.vue')
      })
      routes.push({
        name: 'page-2',
        path: '/qv1',
        component: resolve('pages/Page.vue')
      })
      routes.push({
        name: 'page-3',
        path: '/aurora',
        component: resolve('pages/Page.vue')
      })
    }
  },
  css: [
    'pineapple-styles/css/fonts.scss',
    'pineapple-styles/css/variables.scss',
    'pineapple-styles/dist/main.css',
    'pineapple-system-bar/dist/pineapple-system-bar.css',
    'pineapple-main-nav-bar/dist/pineapple-main-nav-bar.css',
    'pineapple-popup/dist/pineapple-popup.css',
    'pineapple-footer/dist/pineapple-footer.css',
    'pineapple-faq/dist/pineapple-faq.css',
    'pineapple-internet-plans/dist/pineapple-internet-plans.css',
    'pineapple-testimonials/dist/pineapple-testimonials.css',
    'pineapple-how-to-connect/dist/pineapple-how-to-connect.css'
  ],
  script: [
    {
      src: 'pineapple-footer',
      type: 'text/javascript'
    },
    {
      src: 'pineapple-faq',
      type: 'text/javascript'
    },
    {
      src: 'pineapple-main-nav-bar',
      type: 'text/javascript'
    },
    {
      src: 'pineapple-internet-plans',
      type: 'text/javascript'
    },
    {
      src: 'pineapple-testimonials',
      type: 'text/javascript'
    }
  ],
  components: true,
  buildModules: [
    '@nuxtjs/vuetify',
    '@nuxtjs/eslint-module'
  ],
  vuetify: {
    icons: {
      iconfont: 'mdi',
      values: {
        expand: 'mdi-chevron-down',
        valid: 'mdi-check-bold',
        invalid: 'mdi-alert-outline',
        home: 'mdi-home-circle'
      }
    },
    theme: {
      themes: {
        light: {
          primary: '#4CAF50',
          secondary: '#75BE00',
          buttons: '#72BF44',
          greentext: '#20731C',
          deepgreen: '#20731C',
          homefone: '#FAFAFA',
          plansfone: '#E5FDD7',
          warning: '#FAFF00'
        },
        dark: {
          primary: '#4CAF50',
          secondary: '#75BE00',
          buttons: '#72BF44',
          greentext: '#20731C',
          deepgreen: '#20731C',
          homefone: '#FAFAFA',
          plansfone: '#E5FDD7',
          warning: '#FAFF00'
        }
      }
    }
  },
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/pwa'
    // ['nuxt-gmaps', {
    //   key: 'AIzaSyBVql75Qc_Y5oGvrxdcNRNMhBlZEzTdk1o',
    //   libraries: ['places', 'geometry']
    // }]
  ],
  axios: {},

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
  }
}
