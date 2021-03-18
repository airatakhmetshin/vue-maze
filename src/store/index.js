import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state: {
    score: 0,
  },
  mutations: {
    SET_SCORE(state, score) {
      state.score = Number(score);
    },
  },
  actions: {
    RESTORE_SCORE({ commit }) {
      if (localStorage.getItem('score')) {
        commit('SET_SCORE', localStorage.getItem('score'));
      }
    },
    ADD_POINTS({ commit, state }, points) {
      let { score } = state;

      commit('SET_SCORE', score += points);
      localStorage.setItem('score', state.score);
    },
  },
  modules: {
  },
});
