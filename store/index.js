export const state = () => ({
  host: 'https://api.pineapple.net.au',
  generalInfoEndpoint: 'https://api.pineapple.net.au/content/general',
  contentEndpoint: 'https://api.pineapple.net.au/content',
  mailEndpoint: 'https://api.pineapple.net.au/email/landing',
  browserTabTitle: '',
  emailSubject: '',
  emailText: 'Thank you for your interest in Pineapple NET! A member of our team will be in touch shortly.',
  viewportWidth: process.client ? window.innerWidth : 1440,
  viewportHeight: process.client ? window.innerHeight : 800,
  plan: 'residential',
  mainContentHeight: 480,
  footerHeight: 560
})

export const getters = {
  pageHeight: state => state.mainContentHeight + state.footerHeight - 36
}

export const mutations = {
  UPDATE_MAIN_CONTENT_HEIGHT: (state, height) => { state.mainContentHeight = height },
  UPDATE_FOOTER_HEIGHT: (state, height) => { state.footerHeight = height },
  UPDATE_COMMON_INFO: (state, payload) => {
    const { browserTabTitle, emailSubject, emailText, footer } = payload
    Object.assign(state, { browserTabTitle, emailSubject, emailText, footer })
  },
  CHANGE_VIEWPORT: (state) => {
    state.viewportWidth = process.client ? window.innerWidth : 1440
    state.viewportHeight = process.client ? window.innerHeight : 800
  },
  CHANGE_PLAN: (state, plan) => { state.plan = plan },
  SET_PROPERTY: (state, payload) => {
    Object.assign(state, {
      [payload.propertyName]: payload.value
    })
  }
}

export const actions = {
  UPDATE_GENERAL_INFO: (context, payload) => {
    for (const propertyName in payload) {
      context.commit('SET_PROPERTY', {
        object: context.state,
        propertyName,
        value: payload[propertyName]
      })
    }
  }
}
