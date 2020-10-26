<template>
  <section id="benefits" style="width: 100%">
    <div class="base-title">
      <a href="#benefits" class="core-goto" />
      <v-card
        v-if="info"
        flat
        class="aside-card transparent mx-auto my-12"
        width="480"
      >
        <v-card-title>
          <h2 class="text-left">
            {{ info.header }}
          </h2>
        </v-card-title>
        <v-card-text>
          <p
            v-for="line in textLines"
            :key="line"
            class="text-left"
          >
            {{ line }}
          </p>
        </v-card-text>
        <v-card-text>
          <h5
            v-for="(item, index) in info.offer"
            :key="index"
          >
            <strong>{{ item.greenText }}</strong>{{ item.blackText }}
          </h5>
        </v-card-text>
        <v-card-text class="my-12">
          <span class="small text-left">Pineapple NET is powered by</span>
          <v-img src="/images/dgtek-logo.svg" width="50" class="logo" />
        </v-card-text>
      </v-card>
    </div>
  </section>
</template>

<style scoped>

.small {
  font-size: 14px;
}
.small.text-left {
  margin-right: 16px;
}

strong {
  font-weight: 600;
  color: #72BF44;
  margin-right: 8px;
}

.logo {
  display: inline-block;
  vertical-align: middle;
}

h5 {
  margin-bottom: 16px;
}

@media screen and (max-width: 900px) {
  .aside-card {
    margin-bottom: 40px;
  }
}

</style>

<script>

export default {
  name: 'Aside',
  props: {
    info: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    textLines () {
      return this.info.text.split('\n')
    }
  }
}
</script>
