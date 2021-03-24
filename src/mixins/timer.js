const timer = {
  methods: {
    startTimer() {
      this.interval = setInterval(() => {
        if (this.$store.state.timer === 0) {
          this.playerNotAlive();
          this.stopTimer();
        } else {
          this.$store.dispatch('D_TIMER');
        }
      }, 1000);
    },
    stopTimer() {
      clearInterval(this.interval);
    },
    playerNotAlive() {
      this.updateGridSize();
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
