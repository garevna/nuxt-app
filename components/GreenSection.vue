<template>
  <v-container fluid class="deepgreen py-12 mt-12">
    <v-card flat dark class="transparent mx-auto" max-width="600">
      <v-card-text class="text-center" width="100%">
        <h2>{{ greenSection.header }}</h2>
        <p>{{ greenSection.text }}</p>
      </v-card-text>
      <v-card-text class="text-center">
        <a href="https://dgtek.net" target="_blank">
          <span>Pineapple NET is powered by </span>
          <v-img
            src="images/dgtek-logo-white.svg"
            class="logo"
            width="50"
            contain
          />
        </a>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<style scoped>

.deepgreen {
  background: #20731C;
  color: #fff;
}

a {
  color: #fff!important;
}

h2, p {
  color: #fff;
  width: 100%;
}
.logo {
  display: inline-block;
  vertical-align: middle;
  margin-left: 16px;
}
</style>

<script>

export default {
  name: 'GreenSection',
  props: {
    greenSection: {
      type: Object,
      default: () => ({
        header: 'Powered By DGtek',
        text: 'DGtek is an infrastructure provider running fibre optics down Melbourne’s streets.\nWe retail their world-class FTTP network, and that’s how our residential speeds are faster and cheaper than all our competitors.'
      })
    }
  }
}
</script>
