<template>
  <section id="footer" class="homefone" v-mutate="footerMutationHandler">
    <div class="base-title">
      <a href="#footer" class="core-goto" />
      <v-row v-if="ready" width="100%">
        <client-only>
          <Footer
            :email-endpoint="mailEndpoint"
          />
        </client-only>
      </v-row>
    </div>
  </section>
</template>

<script>

import 'pineapple-footer'
import 'pineapple-footer/dist/pineapple-footer.css'

import { mapState, mapMutations } from 'vuex'

export default {
  name: 'FooterComponent',
  props: {
    goto: {
      type: String,
      default: '#top'
    }
  },
  data: () => ({
    footer: null
  }),
  computed: {
    ...mapState({
      mailEndpoint: state => state.mailEndpoint
    }),
    ready () {
      return !!this.mailEndpoint
    }
  },
  mounted () {
    this.footer = document.querySelector('.footer')
  },
  methods: {
    ...mapMutations({
      updateFooterHeight: 'UPDATE_FOOTER_HEIGHT'
    }),
    footerMutationHandler (mutations) {
      if (this.footer) {
        this.updateFooterHeight(this.footer.offsetHeight)
      }
    }
  }
}

</script>

<style>
html {
  overflow: hidden;
}
</style>
