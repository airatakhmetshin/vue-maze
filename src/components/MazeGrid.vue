<template>
  <div style="width: fit-content; border: 1px solid black">
    <div style="display: flex" v-for="row in grid">
      <div
        class="cell"
        :class="{ 'cell-block': cell.type === 'block', 'cell-player': cell.type === 'player' }"
        v-for="cell in row"
      >
        {{ cell.x }};{{ cell.y }}
      </div>
    </div>
  </div>
</template>

<script>
import Maze from '@/mixins/maze';

export default {
  name: 'HelloWorld',
  mixins: [Maze],
  data() {
    return {
      player: { x: 1, y: 1 },
      area: {
        XMax: 10,
        XMin: 0,
        YMax: 10,
        YMin: 0,
      },
      grid: [],
    };
  },
  methods: {
    renderPlayer() {
      this.grid
        .flat()
        .filter((cell) => cell.type !== 'block')
        .forEach((cell) => {
          if (cell.x === this.player.x && cell.y === this.player.y) {
            cell.type = 'player';
          } else if (cell.type === 'player') {
            cell.type = null;
          }
        });
    },
    isBlock(x, y) {
      return this.grid.flat().some((cell) => cell.x === x && cell.y === y && cell.type === 'block');
    },
    move(direction) {
      let newPlayerX = this.player.x;
      let newPlayerY = this.player.y;

      if (direction === 'up' && this.player.y < this.area.YMax) {
        newPlayerY += 1;
      }

      if (direction === 'down' && this.player.y > this.area.YMin) {
        newPlayerY -= 1;
      }

      if (direction === 'left' && this.player.x > this.area.XMin) {
        newPlayerX -= 1;
      }

      if (direction === 'right' && this.player.x < this.area.XMax) {
        newPlayerX += 1;
      }

      if (this.isBlock(newPlayerX, newPlayerY)) {
        return;
      }

      this.player.x = newPlayerX;
      this.player.y = newPlayerY;
    },
  },
  watch: {
    player: {
      handler() {
        this.renderPlayer();
      },
      deep: true,
    },
  },
  mounted() {
    this.grid = this.display(this.maze(5, 5));
    this.renderPlayer();

    document.addEventListener('keydown', (event) => {
      switch (event.code) {
        case 'ArrowUp':
          this.move('up');
          break;
        case 'ArrowDown':
          this.move('down');
          break;
        case 'ArrowLeft':
          this.move('left');
          break;
        case 'ArrowRight':
          this.move('right');
          break;
        default:
      }
    });
  },
};
</script>

<style scoped lang="scss">
.cell {
  width: 60px;
  height: 60px
}
.cell-block {
  background-color: red;
}
.cell-player {
  background-color: green;
}
</style>
