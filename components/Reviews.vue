<template>
  <section id="testimonials" class="section">
    <div class="base-title">
      <a href="#testimonials" class="core-goto" />
      <Testimonials
        v-if="ready"
        :page.sync="section"
      />
    </div>
  </section>
</template>

<script>

import { mapState } from 'vuex'

import 'pineapple-testimonials'

export default {
  name: 'Reviews',
  props: {
    goto: {
      type: String,
      default: () => '#contact'
    }
  },
  data: () => ({
    ready: false
  }),
  computed: {
    ...mapState('content', ['testimonials']),
    section: {
      get () {
        return this.goto
      },
      set (val) {
        this.$emit('update:goto', val)
      }
    }
  },
  watch: {
    testimonials: {
      deep: true,
      immediate: true,
      handler (val) {
        this.ready = !!val
      }
    }
  }
}

</script>
