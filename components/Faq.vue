<template>
  <section id="faq" style="width: 100%">
    <div class="base-title">
      <a href="#faq" class="core-goto" />
      <FAQ :page.sync="section" />
    </div>
  </section>
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
