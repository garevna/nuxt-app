<template>
  <v-container class="main-container homefone">
    <v-sheet
      v-if="ready"
      id="main-content"
      class="homefone"
    >
      <MainMenu :page.sync="page" />
      <!-- ============================= TOP ============================= -->
      <section id="top" style="width: 100%">
        <div class="base-title">
          <a href="#top" class="core-goto" />
          <HomeTop :page.sync="page" />
        </div>
      </section>

      <!-- ============================= LIST ============================= -->
      <v-row width="100%" justify="center">
        <section id="list" style="width: 100%">
          <div class="base-title">
            <a href="#list" class="core-goto" />
            <LazyHydrate when-visible>
              <List
                :list="$store.state.content.list"
                :page.sync="goto"
              />
            </LazyHydrate>
          </div>
        </section>
      </v-row>
      <GreenSection />
      <Plans :goto.sync="goto" />

      <!-- ============================= HOW TO CONNECT ============================= -->
      <v-row width="100%" justify="center">
        <section id="how-to-connect" class="section">
          <div class="base-title">
            <a href="#how-to-connect" class="core-goto" />
            <LazyHydrate when-visible>
              <HowToConnect :page.sync="goto" />
            </LazyHydrate>
          </div>
        </section>
      </v-row>
      <!-- ============================= TESTIMONIALS ============================= -->
      <v-row width="100%" justify="center">
        <LazyHydrate when-visible>
          <Reviews :goto.sync="goto" />
        </LazyHydrate>
      </v-row>

      <!-- ============================= FAQ ============================= -->
      <v-row width="100%" justify="center">
        <LazyHydrate when-visible>
          <Faq :goto.sync="goto" />
        </LazyHydrate>
      </v-row>
    </v-sheet>
  </v-container>
</template>

<script>

import LazyHydrate from 'vue-lazy-hydration'

import { mapState, mapGetters } from 'vuex'

import 'pineapple-how-to-connect'

export default {
  components: {
    LazyHydrate,
    MainMenu: () => import('@/components/MainMenu.vue'),
    HomeTop: () => import('@/components/HomeTop.vue'),
    List: () => import('@/components/List.vue'),
    GreenSection: () => import('@/components/GreenSection.vue'),
    Plans: () => import('@/components/Plans.vue'),
    Reviews: () => import('@/components/Reviews.vue'),
    Faq: () => import('@/components/Faq.vue')
  },
  async asyncData (context) {
    const { store } = context
    const generalInfo = await (
      await fetch('https://api.pineapple.net.au/content/general')
    ).json()
    store.dispatch('UPDATE_GENERAL_INFO', generalInfo)
    const homePageContent = await (
      await fetch('https://api.pineapple.net.au/content/2')
    ).json()
    store.commit('UPDATE_COMMON_INFO', homePageContent)
    store.dispatch('content/UPDATE_CONTENT', homePageContent)
    return { generalInfo, homePageContent }
  },
  data: () => ({
    main: null,
    page: undefined,
    goto: undefined
  }),
  computed: {
    ...mapState({
      browserTabTitle: state => state.browserTabTitle,
      emailSubject: state => state.emailSubject,
      emailText: state => state.emailText
    }),
    ...mapGetters(['pageHeight']),
    ready () {
      return !!this.$store.state.content.top
    }
  },
  watch: {
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
      if (!val || !process.client) { return }

      /* Inside page transition */
      if (val.indexOf('#') === 0) {
        this.$vuetify.goTo(val, {
          duration: 500,
          offset: 80,
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
      this.$router.push({ name: val })
      this.page = undefined
    }
  }
}
</script>
