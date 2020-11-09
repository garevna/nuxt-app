<template>
  <InternetPlans :page.sync="section" />
</template>

<script>

import 'pineapple-internet-plans'
import 'pineapple-internet-plans/dist/pineapple-internet-plans.css'

export default {
  name: 'Plans',
  props: {
    goto: {
      type: String,
      default: () => '#footer'
    }
  },
  computed: {
    section: {
      get () {
        return this.goto
      },
      set (val) {
        this.$emit('update:goto', val)
      }
    }
  }
}

</script>
