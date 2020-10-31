<template>
  <v-container
    v-if="top"
    fluid
    style="overflow-x: hidden; margin-top: 160px; margin-bottom: 64px;"
  >
    <v-card flat class="homefone mx-auto" width="100%" max-width="1440">
      <v-row align="center" justify="center" style="height: 100%">
        <v-col cols="12" lg="6" class="mx-auto my-auto">
          <v-card flat width="100%" max-width="480" class="transparent mx-auto">
            <v-card-text class="text-center text-md-left">
              <h2 class="top-header text-center text-md-left">
                {{ top.header }}
              </h2>
            </v-card-text>
            <v-card-text class="mx-0">
              <p
                v-for="line in textLines"
                :key="line"
                class="text-center text-md-left"
              >
                {{ line }}
              </p>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" lg="6" class="mx-auto my-auto">
          <v-card flat max-width="480" min-width="320" class="transparent mx-auto">
            <v-card-text class="text-left">
              <v-btn
                v-for="(btn, index) in mainNavButtons"
                :key="index"
                color="buttons"
                dark
                rounded
                height="48"
                width="100%"
                class="submit-button text-left px-auto mx-auto my-2"
                style="text-align: left!important"
                @click="$emit('update:page', mainNavSectors[index])"
              >
                <v-row>
                  <v-col cols="10">
                    {{ btn }}
                  </v-col>
                  <v-col cols="2">
                    <v-icon>mdi-arrow-right-bold</v-icon>
                  </v-col>
                </v-row>
              </v-btn>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<style>
.v-image__image .v-image__image--cover {
  transition: all 0.5s!important;
}
.v-image__image .v-image__image--cover:hover {
  filter: blur(8px)!important;
  -webkit-filter: blur(8px)!important;
}
</style>

<style scoped>
.top-element {
  margin-top: 120px;
  margin-bottom: 64px;
}
.top-header {
  width: 100%;
}
p {
  line-height: 180%!important;
}

@media screen and (max-width: 500px) {
  .top-element {
    margin-top: 80px;
    margin-bottom: 48px;
  }
}
</style>

<script>

import { mapState } from 'vuex'

export default {
  name: 'Top',
  props: {
    page: {
      type: String,
      default: undefined
    }
  },
  computed: {
    ...mapState(['viewportWidth']),
    ...mapState('content', ['top', 'mainNavButtons', 'mainNavSectors']),
    textLines () {
      return this.top.text
        .split('<br>').join('\n')
        .split('<br/>').join('\n')
        .split('<br />').join('\n')
        .split('\n')
    }
  }
}
</script>
