<template>
  <div class="px-4">
    <div class="py-3">
      <h3>Settings</h3>
      <div>
        <label for="exampleFormControlInput1" class="form-label">Grid size</label>
        <select
          id="exampleFormControlInput1"
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
    <div class="py-3">
      <h3>Score</h3>
      <h2>{{ score }}</h2>
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
