
const state = () => ({
  mainNavButtons: [],
  mainNavSectors: []
})

const getters = {
  contentEndpoint: (state, getters, rootState) => rootState.contentEndpoint
}

const mutations = {
  CLEAR_STORAGE: (state) => {
    state = Object.assign({}, {
      mainNavButtons: [],
      mainNavSectors: []
    })
  },
  UPDATE_NAV_BUTTONS: (state, payload) => {
    state.mainNavButtons = Object.assign([], payload.mainNavButtons)
    state.mainNavSectors = Object.assign([], payload.mainNavSectors)
  },
  UPDATE_PROP: (state, payload) => {
    if (Array.isArray(payload.propValue)) {
      state[payload.propName] = Object.assign([], payload.propValue)
    } else if (payload.propValue instanceof Object) {
      state[payload.propName] = Object.assign({}, payload.propValue)
    } else {
      state[payload.propName] = payload.propValue
    }
  }
}

const actions = {
  UPDATE_CONTENT (context, payload) {
    context.commit('CLEAR_STORAGE')
    for (const propName in payload) {
      context.commit('UPDATE_PROP', {
        propName,
        propValue: payload[propName]
      })
    }
  },

  UPDATE_ALL (context, content) {
    const { browserTabTitle, emailSubject, emailText, footer, ...rest } = content
    context.dispatch('UPDATE_MAIN_INFO', {
      browserTabTitle,
      emailSubject,
      emailText,
      footer
    })
    context.dispatch('UPDATE_CONTENT', rest)
  },

  UPDATE_MAIN_INFO (context, payload) {
    if (payload.browserTabTitle) {
      context.commit('UPDATE_BROWSER_TITLE', payload.browserTabTitle, { root: true })
    }
    if (payload.emailSubject) {
      context.commit('UPDATE_EMAIL_SUBJECT', payload.emailSubject, { root: true })
    }
    if (payload.emailText) {
      context.commit('UPDATE_EMAIL_TEXT', payload.emailText, { root: true })
    }
    if (payload.footer) {
      context.commit('UPDATE_FOOTER', payload.footer, { root: true })
      context.commit('UPDATE_PROP', {
        propName: 'footer',
        propValue: payload.footer
      })
    }
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
