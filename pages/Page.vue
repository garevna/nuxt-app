<template>
  <v-container fluid class="homefone">
    <v-sheet
      v-if="ready"
      id="main-content"
      class="homefone"
    >
      <!-- <SystemBar /> -->
      <MainMenu :page.sync="page" />
      <v-sheet
        width="100%"
        max-width="1440"
        color="homefone"
        tile
        class="mx-auto"
      >
        <section id="top" style="width: 100%">
          <div class="base-title">
            <a href="#top" class="core-goto" />
            <Top :top="top" :page.sync="goto" />
          </div>
        </section>
      </v-sheet>

      <!-- ============================= TESTIMONIALS ============================= -->
      <v-row align="center" justify="center" class="mx-0 px-0">
        <LazyHydrate when-visible>
          <Reviews :goto.sync="goto" />
        </LazyHydrate>
      </v-row>

      <!-- ============================= USER CONTACT ============================= -->

      <v-sheet
        width="100%"
        max-width="1440"
        color="homefone"
        tile
        class="mx-auto"
      >
        <v-row align="center" class="mx-0 px-0">
          <v-col cols="12" md="6" class="aside-col">
            <LazyHydrate when-visible>
              <Aside :info="info" />
            </LazyHydrate>
          </v-col>
          <v-col cols="12" md="6" class="mx-0 px-0">
            <v-row align="center" justify="center" class="pa-0 my-12">
              <LazyHydrate when-visible>
                <UserForm />
              </LazyHydrate>
            </v-row>
          </v-col>
        </v-row>
      </v-sheet>
      <Faq :goto.sync="goto" />
    </v-sheet>
  </v-container>
</template>

<script>

import { mapState } from 'vuex'

import LazyHydrate from 'vue-lazy-hydration'

export default {
  name: 'Page',
  components: {
    LazyHydrate,
    MainMenu: () => import('@/components/MainMenu.vue'),
    Top: () => import('@/components/Top.vue'),
    Aside: () => import('@/components/Aside.vue'),
    UserForm: () => import('@/components/UserForm.vue'),
    Reviews: () => import('@/components/Reviews.vue'),
    Faq: () => import('@/components/Faq.vue')
  },
  async asyncData (context) {
    const { store, route } = context
    if (!store.state.officeEmail) {
      const general = await (
        await fetch('https://api.pineapple.net.au/content/general')
      ).json()
      store.dispatch('UPDATE_GENERAL_INFO', general)
    }
    if (!store.state.footer) {
      const homePageContent = await (
        await fetch('https://api.pineapple.net.au/content/2')
      ).json()
      store.commit('UPDATE_COMMON_INFO', homePageContent)
    }
    const path = ['2-1', '2-2', '2-3'][['conservatory', 'qv1', 'aurora'].findIndex(item => item === route.path.slice(1))]
    const content = await (
      await fetch(`https://api.pineapple.net.au/content/${path}`)
    ).json()
    store.dispatch('content/UPDATE_ALL', content)
    return { content }
  },
  data () {
    return {
      page: null,
      goto: null
    }
  },
  computed: {
    ...mapState(['viewportWidth', 'mailEndpoint', 'browserTabTitle', 'emailSubject', 'emailText', 'mainContentHeight', 'footerHeight']),
    ...mapState('content', ['top', 'testimonials', 'info']),
    ready () {
      return !!this.$store.state.officeEmail && !!this.$store.state.footer
    }
  },
  watch: {
    content (val) {
      this.$store.dispatch('content/UPDATE_ALL', val)
    },
    route (val) {
      if (process.client) {
        this.$vuetify.goTo('#top', {
          duration: 500,
          offset: 80,
          easing: 'easeInOutCubic'
        })
      }
    },

    /* Buttons on page */
    goto (val) {
      if (!val || !process.client) { return }
      this.$vuetify.goTo(val, {
        duration: 500,
        offset: 20,
        easing: 'easeInOutCubic'
      })
      this.goto = undefined
    },

    /* Buttons of main nav bar */
    page (val) {
      if (!val) { return }

      /* Inside page transition */
      if (val.indexOf('#') === 0) {
        this.$vuetify.goTo(val, {
          duration: 500,
          offset: 50,
          easing: 'easeInOutCubic'
        })
        this.page = undefined
        return
      }

      /* Go to external url */
      if (val.indexOf('http') === 0) {
        window.open(val, '_blank')
        this.page = undefined
        return
      }

      /* Go to page */
      this.$router.push({ name: val === 'home' ? 'index' : val })
      this.page = undefined
    }
  },
  mounted () {
    this.page = undefined
  },
  beforeRouteLeave (to, from, next) {
    if (!process.client) { return }
    this.$vuetify.goTo('#top', {
      duration: 500,
      offset: 20,
      easing: 'easeInOutCubic'
    })
    next()
  }
}
</script>
