<template>
  <FAQ :page.sync="section" />
</template>

<script>

import 'pineapple-faq'

export default {
  name: 'Faqs',
  props: {
    goto: {
      type: String,
      default: undefined
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
