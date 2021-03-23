import Vue from 'vue';
import Vuex from 'vuex';
import pause from '@/store/modules/pause';

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
    RESET_SCORE({ commit }) {
      commit('SET_SCORE', 0);
      localStorage.removeItem('score');
    },
    ADD_POINTS({ commit, state }, points) {
      let { score } = state;

      commit('SET_SCORE', score += points);
      localStorage.setItem('score', state.score);
    },
  },
  modules: {
    pause,
  },
});
