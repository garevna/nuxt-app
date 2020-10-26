<template>
  <v-container fluid class="homefone">
    <v-sheet
      id="main-content"
      class="homefone"
    >
      <SystemBar />
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
        <Reviews :goto.sync="goto" />
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
            <Aside :info="info" />
          </v-col>
          <v-col cols="12" md="6" class="mx-0 px-0">
            <v-row align="center" justify="center" class="pa-0 my-12">
              <UserForm />
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

import 'pineapple-system-bar'

import MainMenu from '@/components/MainMenu.vue'
import Top from '@/components/Top.vue'
import Aside from '@/components/Aside.vue'
import UserForm from '@/components/UserForm.vue'
import Reviews from '@/components/Reviews.vue'
import Faq from '@/components/Faq.vue'

export default {
  name: 'Page',
  components: {
    UserForm,
    Reviews,
    MainMenu,
    Top,
    Faq,
    Aside
  },
  data () {
    return {
      page: null,
      goto: null
    }
  },
  computed: {
    ...mapState(['viewportWidth', 'mailEndpoint', 'browserTabTitle', 'emailSubject', 'emailText', 'mainContentHeight', 'footerHeight']),
    ...mapState('content', ['top', 'testimonials', 'info'])
  },
  watch: {
    route (val) {
      this.$vuetify.goTo('#top', {
        duration: 500,
        offset: 80,
        easing: 'easeInOutCubic'
      })
    },

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
    this.$vuetify.goTo('#top', {
      duration: 500,
      offset: 20,
      easing: 'easeInOutCubic'
    })
    next()
  }
}
</script>
