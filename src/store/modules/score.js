export default {
  state: () => ({
    score: 0,
  }),
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
};
