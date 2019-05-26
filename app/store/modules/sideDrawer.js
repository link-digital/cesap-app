const state = {
  sideDrawer: false,
  historyClean: true,
}

const mutations = {
  // always and only change vuex state through mutations.
  setSideDrawer (state, data) {
    state.sideDrawer = data
  },

  clearHistory (state, data) {
    state.historyClean = data;
  }
}

const actions = {
  clearHistory({commit}, payload) {
    setTimeout(() => {
      commit('clearHistory', payload.state);
    }, 500);
  }
}

const getters = {
  sideDrawer: (state) => state.sideDrawer,
  isHistoryClean: (state) => state.historyClean
}

// export this module.
export default {
  state,
  mutations,
  getters,
  actions
}
