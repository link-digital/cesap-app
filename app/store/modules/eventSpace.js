const state = {
  space: false,
  title: '',
  date: ''
}

const mutations = {
  setSpace (state, data) {
    state.space = data
  },
  setSpaceTitle (state, data) {
    state.title = data
  },
  setSpaceDate (state, data) {
    state.date = data
  }
}

const getters = {
  space: (state) => state.space
}

// export this module.
export default {
  state,
  mutations,
  getters
}
