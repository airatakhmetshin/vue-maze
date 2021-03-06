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
};
</script>

<style lang="scss">
@import "scss/app";
</style>
