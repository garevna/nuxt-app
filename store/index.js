
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
  UPDATE_BROWSER_TITLE: (state, title) => { state.browserTabTitle = title },
  UPDATE_EMAIL_SUBJECT: (state, subject) => { state.emailSubject = subject },
  UPDATE_EMAIL_TEXT: (state, text) => { state.emailText = text },
  UPDATE_FOOTER: (state, footer) => {
    state.footer = Object.assign({}, footer)
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
  async GET_GENERAL_INFO ({ state, commit }) {
    let generalInfo = JSON.parse(localStorage.getItem('generalInfo'))
    if (!generalInfo || Date.now() - generalInfo.modified > 3600000) {
      generalInfo = await (await fetch(state.generalInfoEndpoint)).json()
      localStorage.setItem('generalInfo', JSON.stringify({
        modified: Date.now(),
        ...generalInfo
      }))
    }
    delete generalInfo.modified
    for (const field in generalInfo) {
      commit('SET_PROPERTY', {
        object: state,
        propertyName: field,
        value: generalInfo[field]
      })
    }
  }
}
