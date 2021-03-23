export default {
  state: () => ({
    isPaused: false,
  }),
  getters: {
    isNotPaused(state) {
      return !state.isPaused;
    },
  },
  mutations: {
    SUSPEND(state) {
      state.isPaused = true;
    },
    RESUME(state) {
      state.isPaused = false;
    },
  },
  actions: {
    SUSPEND_OR_RESUME({ commit, state }) {
      if (state.isPaused) {
        commit('RESUME');
      } else {
        commit('SUSPEND');
      }
    },
  },
};
