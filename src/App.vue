<template>
  <div id="app">
    <MazeGrid />
  </div>
</template>

<script>
import MazeGrid from './components/MazeGrid.vue';

export default {
  name: 'App',
  components: {
    MazeGrid,
  },
  mounted() {
    this.$store.dispatch('RESTORE_SCORE');
  },
};
</script>

<style lang="scss">
@import "scss/app";
</style>
