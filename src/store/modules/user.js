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
  SET_NAME (state, val) {
    state.name = val
  }
}
const actions = {
  setHost ({commit}, val) {
    commit('SET_HOST', val)
  },
  setName ({commit}, val) {
    commit('SET_NAME', val)
  }
}
export default {
  state,
  mutations,
  actions
}
