<template>
  <section
    id="pineapple-footer"
    v-mutate="footerMutationHandler"
    class="homefone"
  >
    <div class="base-title">
      <a href="#footer" class="core-goto" />
      <v-row width="100%">
        <Footer
          v-if="ready"
          :email-endpoint="mailEndpoint"
        />
      </v-row>
    </div>
  </section>
</template>

<script>

import 'pineapple-footer'

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
    footerElement: null
  }),
  computed: {
    ...mapState({
      mailEndpoint: state => state.mailEndpoint,
      footer: state => state.footer
    }),
    ready () {
      return !!this.footer
    }
  },
  mounted () {
    this.footerElement = document.querySelector('.footer')
  },
  methods: {
    ...mapMutations({
      updateFooterHeight: 'UPDATE_FOOTER_HEIGHT'
    }),
    footerMutationHandler (mutations) {
      if (this.footerElement) {
        this.updateFooterHeight(this.footerElement.offsetHeight)
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
