<template>
  <v-container fluid fill-height class="homefone pa-auto">
    <v-card flat max-width="320" max-height="200" class="transparent ma-auto">
      <v-card-text class="text-center">
        <h1>404</h1>
      </v-card-text>
      <v-card-text class="text-center">
        <h3>Page not found</h3>
      </v-card-text>
      <v-card-text class="text-center">
        <v-btn large text color="buttons" @click="goHome">
          Home
        </v-btn>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>

export default {
  name: 'NotFound',
  data () {
    return {
      ret: false
    }
  },
  methods: {
    goHome () {
      this.$router.push({ name: 'index' })
    }
  }
}
</script>

<style scoped>
h1, h3 {
  width: 100%;
}
</style>
