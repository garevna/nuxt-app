<template>
  <v-card
    flat
    class="user-contact transparent mx-auto pa-0"
    style="margin-bottom: 80px"
  >
    <UserContact
      v-if="userForm"
      :user-form="userForm"
      :email-subject="emailSubject"
      :email-text="emailText"
      :email-endpoint="mailEndpoint"
    />
  </v-card>
</template>

<script>

import { mapState } from 'vuex'

import 'pineapple-contact-form'
import 'pineapple-contact-form/dist/pineapple-contact-form.css'

export default {
  name: 'UserForm',
  computed: {
    ...mapState({
      mailEndpoint: state => state.mailEndpoint,
      emailSubject: state => state.emailSubject,
      emailText: state => state.emailText
    }),
    ...mapState('content', {
      userForm: state => state.userForm
    })
  }
}
</script>
