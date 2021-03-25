export default {
  state: () => ({
    timer: 0,
  }),
  mutations: {
    SET_TIMER(state, timer) {
      state.timer = Number(timer);
    },
  },
  actions: {
    D_TIMER({ commit, state }) {
      let { timer } = state;

      commit('SET_TIMER', timer -= 1);
    },
  },
};
