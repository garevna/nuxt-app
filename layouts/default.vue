<template>
  <v-app>
    <SystemBar />
    <Nuxt v-mutate="mutationHandler" />
    <FooterComponent v-if="ready" />
  </v-app>
</template>

<script>

import { mapState, mapMutations } from 'vuex'

import 'pineapple-system-bar'
import 'pineapple-popup'

import FooterComponent from '@/components/FooterComponent.vue'

// import '@iconify/iconify'

export default {
  components: {
    FooterComponent
  },
  data: () => ({
    nuxt: null,
    layout: null,
    footer: null
  }),
  computed: {
    ...mapState(['mainContentHeight', 'footerHeight']),
    ready () {
      return !!this.$store.state.footer
    }
  },
  watch: {
    mainContentHeight (val) {
      this.nuxt.style.height = val + this.footerHeight - 36 + 'px'
    },
    footerHeight (val) {
      this.nuxt.style.height = this.mainContentHeight + val - 36 + 'px'
    }
  },
  mounted () {
    this.nuxt = document.getElementById('__nuxt')
    this.layout = document.getElementById('__layout')
    this.footer = document.querySelector('.footer')
    window.addEventListener('resize', this.resize.bind(this))
    this.resize()
    document.body.style.height = '100vh'
    document.body.style['overflow-y'] = 'auto'
  },
  methods: {
    ...mapMutations({
      updateMainHeight: 'UPDATE_MAIN_CONTENT_HEIGHT',
      updateFooterHeight: 'UPDATE_FOOTER_HEIGHT',
      changeViewport: 'CHANGE_VIEWPORT'
    }),
    mutationHandler (mutations) {
      this.$store.commit('UPDATE_MAIN_CONTENT_HEIGHT', this.layout.offsetHeight)
    },
    resize () {
      this.$store.commit('CHANGE_VIEWPORT')
    }
  }
}
</script>

<style>

html {
  overflow: hidden!important;
}
* {
  user-select: none;
}
*:active {
  outline: none!important;
}

#__nuxt {
  overflow: hidden;
}

.main-container {
  min-width: 100%;
}
h1, h2, h3, h4 {
  width: 80vw;
  margin: auto;
}

.price {
  width: 150px!important;
}
input,
input:-internal-autofill-selected {
  background-color: transparent!important;
}
</style>
