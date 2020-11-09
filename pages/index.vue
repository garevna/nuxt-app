<template>
  <v-container class="main-container homefone">
    <v-sheet
      v-if="ready"
      id="main-content"
      class="homefone"
    >
      <MainNavBar :page.sync="page" />
      <!-- ============================= TOP ============================= -->
      <v-row ref="top" width="100%" justify="center">
        <HomeTop :page.sync="page" />
      </v-row>
      <!-- ============================= LIST ============================= -->
      <v-row ref="list" width="100%" justify="center">
        <LazyHydrate when-idle>
          <List
            :list="$store.state.content.list"
            :page.sync="goto"
          />
        </LazyHydrate>
      </v-row>

      <!-- ============================= DGTEK ============================= -->
      <v-row ref="dgtek" width="100%" justify="center">
        <LazyHydrate when-idle>
          <GreenSection />
        </LazyHydrate>
      </v-row>

      <!-- ============================= INTERNET PLANS ============================= -->
      <v-row ref="plans" width="100%" justify="center">
        <LazyHydrate when-idle>
          <InternetPlans :page.sync="goto" />
        </LazyHydrate>
      </v-row>

      <!-- ============================= HOW TO CONNECT ============================= -->
      <v-row ref="how-to-connect" width="100%" justify="center">
        <LazyHydrate when-idle>
          <HowToConnect :page.sync="goto" />
        </LazyHydrate>
      </v-row>
      <!-- ============================= TESTIMONIALS ============================= -->
      <v-row ref="testimonials" width="100%" justify="center">
        <LazyHydrate when-idle>
          <Testimonials :page.sync="goto" />
        </LazyHydrate>
      </v-row>

      <!-- ============================= FAQ ============================= -->
      <v-row ref="faq" width="100%" justify="center">
        <LazyHydrate when-idle>
          <FAQ :page.sync="goto" />
        </LazyHydrate>
      </v-row>
    </v-sheet>
  </v-container>
</template>

<script>

import LazyHydrate from 'vue-lazy-hydration'

import { mapState, mapGetters } from 'vuex'

import 'pineapple-main-nav-bar'
import 'pineapple-how-to-connect'
import 'pineapple-internet-plans'
import 'pineapple-testimonials'
import 'pineapple-faq'

export default {
  components: {
    LazyHydrate,
    HomeTop: () => import('@/components/HomeTop.vue'),
    List: () => import('@/components/List.vue'),
    GreenSection: () => import('@/components/GreenSection.vue')
  },
  async asyncData ({ store, $axios }) {
    const generalInfo = (await $axios.get('/content/general')).data
    store.dispatch('UPDATE_GENERAL_INFO', generalInfo)
    const homePageContent = (await $axios.get('/content/2')).data
    store.commit('UPDATE_COMMON_INFO', homePageContent)
    store.dispatch('content/UPDATE_CONTENT', homePageContent)

    return {}
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
      val = val === '#contact' ? '#top' : val
      this.$refs[val.slice(1)].scrollIntoView({ behavior: 'smooth' })
      this.goto = undefined
    },

    /* Buttons of main nav bar */
    page (val) {
      if (!val || !process.client) { return }

      /* Inside page transition */
      if (val.indexOf('#') === 0) {
        this.$refs[val.slice(1)].scrollIntoView({ behavior: 'smooth' })
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
  },
  mounted () {

  }
}
</script>
