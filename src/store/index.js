import Vue from 'vue';
import Vuex from 'vuex';
import pause from '@/store/modules/pause';
import score from '@/store/modules/score';
import timer from '@/store/modules/timer';

Vue.use(Vuex);

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state: {
    isPlayerAlive: false,
  },
  getters: {
    isPlayerDead(state) {
      return !state.isPlayerAlive;
    },
  },
  mutations: {
    SET_PLAYER_ALIVE(state, alive) {
      state.isPlayerAlive = alive;
    },
  },
  actions: {
  },
  modules: {
    pause,
    score,
    timer,
  },
});
