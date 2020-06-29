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
    state.host = val.host
    state.name = val.name
    state.email = val.email
    state.phone = val.phone
    state.school = val.school
    state.title = val.title
    state.degree = val.degree
    state.course = val.course
    state.yearOfTeaching = val.year_of_teaching
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
