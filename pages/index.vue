<template>
  <v-container class="main-container homefone">
    <v-sheet
      id="main-content"
      class="homefone"
    >
      <SystemBar />
      <MainMenu :page.sync="page" />
      <!-- ============================= TOP ============================= -->
      <section id="top" style="width: 100%">
        <div class="base-title">
          <a href="#top" class="core-goto" />
          <HomeTop v-if="ready" :page.sync="page" />
        </div>
      </section>

      <!-- ============================= LIST ============================= -->
      <v-row width="100%" justify="center">
        <section id="list" style="width: 100%">
          <div class="base-title">
            <a href="#list" class="core-goto" />
            <List
              v-if="ready"
              :list="$store.state.content.list"
              :page.sync="goto"
            />
          </div>
        </section>
      </v-row>
      <GreenSection v-if="ready" :green-section="greenSection" />
      <Plans :goto.sync="goto" />

      <!-- ============================= HOW TO CONNECT ============================= -->
      <v-row width="100%" justify="center">
        <section id="how-to-connect" class="section">
          <div class="base-title">
            <a href="#how-to-connect" class="core-goto" />
            <HowToConnect v-if="ready" :page.sync="goto" />
          </div>
        </section>
      </v-row>
      <!-- ============================= TESTIMONIALS ============================= -->
      <v-row width="100%" justify="center">
        <Reviews v-if="ready" :goto.sync="goto" />
      </v-row>

      <!-- ============================= FAQ ============================= -->
      <v-row width="100%" justify="center">
        <Faq v-if="ready" :goto.sync="goto" />
      </v-row>
    </v-sheet>
  </v-container>
</template>

<script>

/* eslint-disable no-console */

import { mapState, mapGetters, mapActions } from 'vuex'
// import mapStyles from '@/configs/map.js'

import 'pineapple-system-bar'
import 'pineapple-how-to-connect'

import MainMenu from '@/components/MainMenu.vue'
import HomeTop from '@/components/HomeTop.vue'
import List from '@/components/List.vue'
import Faq from '@/components/Faq.vue'
import Plans from '@/components/Plans.vue'
import GreenSection from '@/components/GreenSection.vue'
import Reviews from '@/components/Reviews.vue'

export default {
  components: {
    MainMenu,
    HomeTop,
    List,
    GreenSection,
    Plans,
    Reviews,
    Faq
  },
  data: () => ({
    main: null,
    page: undefined,
    goto: undefined
    // mapStyles
  }),
  computed: {
    ...mapState({
      browserTabTitle: state => state.browserTabTitle,
      emailSubject: state => state.emailSubject,
      emailText: state => state.emailText
    }),
    ...mapGetters(['pageHeight']),
    ...mapState('content', {
      top: state => state.top,
      list: state => state.list,
      greenSection: state => state.greenSection,
      testimonials: state => state.testimonials,
      howToConnect: state => state.howToConnect,
      footer: state => state.footer
    }),
    ready () {
      return !!this.top
    }
  },
  watch: {
    /* Buttons on page */
    goto (val) {
      if (!val) { return }
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
  },
  beforeMount () {
    // this.getGeneralInfo()
    // this.getContent(2).then(() => {
    //   this.ready = true
    // })
  },
  methods: {
    ...mapActions({
      getGeneralInfo: 'GET_GENERAL_INFO'
    }),
    ...mapActions('content', {
      getContent: 'GET_PAGE_CONTENT'
    })
  }
}
</script>
