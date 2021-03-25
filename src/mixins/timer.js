const timer = {
  methods: {
    startTimer() {
      this.interval = setInterval(() => {
        if (this.$store.getters.isPlayerDead) {
          this.stopTimer();
        } else {
          this.$store.dispatch('D_TIMER');

          if (this.$store.state.timer.timer === 0) {
            this.setPlayerNotAlive();
          }
        }
      }, 1000);
    },
    stopTimer() {
      clearInterval(this.interval);
    },
    setPlayerNotAlive() {
      this.updateGridSize();
      this.stopTimer();
    },
  },
  mounted() {
    this.unsubscribe = this.$store.subscribe((mutation) => {
      switch (mutation.type) {
        case 'SUSPEND':
          this.stopTimer();
          break;
        case 'RESUME':
          this.startTimer();
          break;
        default:
      }
    });
  },
  beforeDestroy() {
    this.unsubscribe();
  },
};

export default timer;
