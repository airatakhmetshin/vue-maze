import Vue from 'vue';
import Vuex from 'vuex';
import pause from '@/store/modules/pause';

Vue.use(Vuex);

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state: {
    score: 0,
    timer: 0,
    isPlayerAlive: false,
  },
  getters: {
    isPlayerDead(state) {
      return !state.isPlayerAlive;
    },
  },
  mutations: {
    SET_SCORE(state, score) {
      state.score = Number(score);
    },
    SET_TIMER(state, timer) {
      state.timer = Number(timer);
    },
    SET_PLAYER_ALIVE(state, alive) {
      state.isPlayerAlive = alive;
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
    D_TIMER({ commit, state }) {
      let { timer } = state;

      commit('SET_TIMER', timer -= 1);
    },
  },
  modules: {
    pause,
  },
});
