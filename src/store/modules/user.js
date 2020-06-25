const state = {
  host: null,
  name: null,
  email: null,
  phone: null,
  school: null,
  title: null,
  degree: null,
  course: null,
  yearOfTeaching: null
}
const mutations = {
  SET_HOST (state, val) {
    state.host = val
  },
  SET_USER (state, val) {
    state = val
  }
}
const actions = {
  setHost ({commit}, val) {
    commit('SET_HOST', val)
  },
  setUser ({commit}, val) {
    commit('SET_USER', val)
  }
}
export default {
  state,
  mutations,
  actions
}
