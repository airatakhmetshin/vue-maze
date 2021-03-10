<template>
  <div class="d-flex">
    <div class="grid-wrapper">
      <div class="d-flex" v-for="row in grid">
        <div
          class="cell"
          :class="{ 'cell-block': cell.type === 'block', 'cell-player': cell.type === 'player' }"
          v-for="cell in row"
        >
          <div v-if="cell.type === 'block'" class="cell-icon icon-brick"></div>
          <div v-if="cell.type === 'player'" class="cell-emoji">{{ playerIcon }}</div>
          <div v-if="cell.type === 'finish'" class="cell-emoji">🏁</div>
        </div>
      </div>
    </div>
    <div>
      <Sidebar
        @changeGridSize="updateGridSize"
        :score="score"
      />
    </div>
  </div>
</template>

<script>
import Maze from '@/mixins/maze';
import Sidebar from '@/components/Sidebar.vue';

export default {
  name: 'MazeGrid',
  mixins: [Maze],
  components: { Sidebar },
  data() {
    return {
      grid: [],
      gridXMax: 0,
      gridXMin: 0,
      gridYMax: 0,
      gridYMin: 0,
      player: { x: 1, y: 1 },
      playerIcon: null,
      score: 0,
    };
  },
  methods: {
    renderGrid() {
      this.grid = this.display(this.maze(this.gridXMax, this.gridYMax));
    },
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
    beforeMoveHook() {
      this.grid
        .flat()
        .filter((cell) => cell.type !== 'block')
        .filter((cell) => cell.x === this.player.x && cell.y === this.player.y)
        .forEach((cell) => {
          switch (cell.type) {
            case 'finish':
              this.score += 10;
              this.renderGrid();
              this.resetPlayer();
              break;
            default:
          }
        });
    },
    isBlock(x, y) {
      return this.grid.flat().some((cell) => cell.x === x && cell.y === y && cell.type === 'block');
    },
    updateGridSize(payload) {
      this.gridXMax = payload.XMax;
      this.gridYMax = payload.YMax;

      this.renderGrid();
      this.resetPlayer();
    },
    resetPlayer() {
      this.player.x = 1;
      this.player.y = 1;

      this.renderPlayer();
    },
    randomPlayerIcon() {
      const icons = ['🐶', '🐱', '🐭', '🐨', '🐵', '🐸'];

      return [...icons].sort(() => 0.5 - Math.random())[0];
    },
    move(direction) {
      let newPlayerX = this.player.x;
      let newPlayerY = this.player.y;

      if (direction === 'up' && this.player.y < this.gridYMax) {
        newPlayerY += 1;
      }

      if (direction === 'down' && this.player.y > this.gridYMin) {
        newPlayerY -= 1;
      }

      if (direction === 'left' && this.player.x > this.gridXMin - 1) {
        newPlayerX -= 1;
      }

      if (direction === 'right' && this.player.x < this.gridXMax - 1) {
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
        this.beforeMoveHook();
        this.renderPlayer();
      },
      deep: true,
    },
  },
  mounted() {
    //
  },
  created() {
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

    this.playerIcon = this.randomPlayerIcon();
  },
};
</script>
