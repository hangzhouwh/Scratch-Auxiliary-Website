import Vuex from 'vuex'

const recommendList = new Vuex.Store({
  data1: null,
  data2: null,
  mutations: {
    postData1 (data1, data) {
      data1 = data
    },
    postData2 (data2, data) {
      data2 = data
    }
  }
})
