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
      <v-row ref="testimonials" align="center" justify="center" class="mx-0 px-0">
        <LazyHydrate when-idle>
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
          <v-col ref="benefits" cols="12" md="6" class="aside-col">
            <LazyHydrate when-idle>
              <Aside :info="info" />
            </LazyHydrate>
          </v-col>
          <v-col ref="contact" cols="12" md="6" class="mx-0 px-0">
            <v-row align="center" justify="center" class="pa-0 my-12">
              <LazyHydrate when-idle>
                <UserForm />
              </LazyHydrate>
            </v-row>
          </v-col>
        </v-row>
      </v-sheet>
      <v-row ref="faq" align="center" class="mx-0 px-0">
        <Faq :goto.sync="goto" />
      </v-row>
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
  async asyncData ({ store, route, $axios }) {
    if (!store.state.officeEmail) {
      const generalInfo = (await $axios.get('/content/general')).data
      store.dispatch('UPDATE_GENERAL_INFO', generalInfo)
    }
    if (!store.state.footer) {
      const homePageContent = (await $axios.get('/content/2')).data
      store.commit('UPDATE_COMMON_INFO', homePageContent)
    }
    const path = ['2-1', '2-2', '2-3'][['conservatory', 'qv1', 'aurora'].findIndex(item => item === route.path.slice(1))]
    const content = (await $axios.get(`/content/${path}`)).data
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
    ...mapState('content', ['top', 'testimonials', 'info']),
    ready () {
      return !!this.$store.state.officeEmail && !!this.$store.state.footer
    }
  },
  watch: {
    content (val) {
      this.$store.dispatch('content/UPDATE_ALL', val)
    },

    /* Buttons on page */
    goto (val) {
      if (!val || !process.client) { return }
      this.$refs[val.slice(1)].scrollIntoView({ behavior: 'smooth' })
      this.goto = undefined
    },

    /* Buttons of main nav bar */
    page (val) {
      if (!val) { return }

      /* Inside page transition */
      if (val.indexOf('#') === 0) {
        this.$refs[val.slice(1)].scrollIntoView({ behavior: 'smooth' })
        // this.$vuetify.goTo(val, {
        //   duration: 500,
        //   offset: 50,
        //   easing: 'easeInOutCubic'
        // })
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
  }
}
</script>
