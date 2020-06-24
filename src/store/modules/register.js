const state = {
  inputType:null
}
const mutations = {
  SET_INPUT_TYPE (state, val) {
    state.inputType = val
  }
}
const actions = {
  setInputType ({commit}, val) {
    commit('SET_INPUT_TYPE', val)
  }
}
export default {
  state,
  mutations,
  actions
}
