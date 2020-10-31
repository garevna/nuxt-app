<template>
  <MainNavBar :page.sync="goto" />
</template>

<script>

import 'pineapple-main-nav-bar'
import 'pineapple-main-nav-bar/dist/pineapple-main-nav-bar.css'

export default {
  name: 'MainMenu',
  props: {
    page: {
      type: String,
      default: undefined
    }
  },
  computed: {
    goto: {
      get () {
        return this.page
      },
      set (val) {
        this.$emit('update:page', val)
      }
    }
  }
}

</script>
