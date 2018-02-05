import Vue from 'vue'
import Vuex from 'vuex'
import Setting from '@/services/models/Setting'
import * as types from './mutation-types'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {},
    industryList: [],
    districtList: []
  },
  getters: {},
  mutations: {
    [types.SET_INDUSTRY_LIST] (state, data) {
      state.industryList = data
    },
    [types.SET_DISTRICT_LIST] (state, data) {
      state.districtList = data
    }
  },
  actions: {
    async findIndustry ({commit}, params) {
      let res = await Setting.find()
      commit(types.SET_INDUSTRY_LIST, res)
      return res
    }
  },
  modules: {
  },
  strict: process.env.NODE_ENV !== 'production'
})
