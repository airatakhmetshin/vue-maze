<template>
  <div class="d-flex flex-column h-100 px-4">
    <div class="pb-4">
      <h3>Settings ⚙️</h3>
      <div class="row">
        <label for="gridSizeInput" class="col-auto d-flex align-items-center">Grid size:</label>
        <div class="col">
          <select
            id="gridSizeInput"
            class="form-select"
            v-model="settings.gridSizeSelected"
            @change="changeGridSize()"
          >
            <option v-for="option in settings.gridSizeOptions" :value="option">
              {{ option }}
            </option>
          </select>
        </div>
      </div>
    </div>
    <div class="pb-4">
      <h3>Score 🎯</h3>
      <h2>{{ score }}</h2>
    </div>
    <div class="pb-4">
      <h3>Control ⌨</h3>
      <h3>️⬆️<br>⬅️ ⬇️️ ➡️</h3>
    </div>
    <div class="pb-4 mt-auto d-flex justify-content-center">
      <a class="github-link" href="https://github.com/airatakhmetshin/vue-maze" target="_blank" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    score: Number,
  },
  name: 'Sidebar',
  data() {
    return {
      settings: {
        gridSizeSelected: '11x11', // default grid size
        gridSizeOptions: ['11x11', '15x15', '21x21'],
      },
    };
  },
  methods: {
    changeGridSize() {
      let [XMax, YMax] = this.settings.gridSizeSelected.split('x');

      XMax = Number(XMax);
      YMax = Number(YMax);

      this.$emit('changeGridSize', { XMax, YMax });
    },
  },
  mounted() {
    this.changeGridSize();
  },
};
</script>

<style lang="scss" scoped>
.github-link {
  display: flex;
  width: 25px;
  height: 25px;
  background-image: url("../assets/github.svg");
  background-repeat: no-repeat;
  background-size: contain;
  opacity: 0.5;

  &:hover {
    opacity: 1;
  }
}
</style>
