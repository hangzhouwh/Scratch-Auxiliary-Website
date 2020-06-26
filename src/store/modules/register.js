const state = {
  r_host: null,
  r_name: null,
  r_email: null,
  r_phone: null,
  r_school: null,
  r_title: null,
  r_degree: null,
  r_course: null,
  r_yearOfTeaching: null
}
const mutations = {
  SET_R_HOST (state, val) {
    state.r_host = val
  },
  SET_R_EMAIL (state, val) {
    state.r_email = val
  },
  CLEAR_REGISTER (state, val) {
    state.r_host = null
    state.r_name = null
    state.r_email = null
    state.r_phone = null
    state.r_school = null
    state.r_title = null
    state.r_degree = null
    state.r_course = null
    state.r_yearOfTeaching = null
  }
}
const actions = {
  setRHost ({commit}, val) {
    commit('SET_R_HOST', val)
  },
  setREmail ({commit}, val) {
    commit('SET_R_EMAIL', val)
  },
  clearRegister ({commit}, val) {
    commit('CLEAR_REGISTER', val)
  }
}
export default {
  state,
  mutations,
  actions
}
