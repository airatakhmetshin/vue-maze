<template>
  <div class="d-flex">
    <div class="grid-wrapper">
      <PauseModal v-if="isPaused" />
      <div class="d-flex" v-for="row in grid">
        <div
          class="cell"
          :class="{
            'cell-block': cell.type === CELL_TYPES.block,
            'cell-player': cell.type === CELL_TYPES.player
          }"
          v-for="cell in row"
        >
          <div v-if="cell.type === CELL_TYPES.block" class="cell-icon icon-brick"></div>
          <div v-if="cell.type === CELL_TYPES.player" class="cell-emoji">{{ playerIcon }}</div>
          <div v-if="cell.type === CELL_TYPES.strawberry" class="cell-emoji">🍓</div>
          <div v-if="cell.type === CELL_TYPES.finish" class="cell-emoji">🏁</div>
        </div>
      </div>
    </div>
    <div>
      <Sidebar @changeGridSize="updateGridSize" />
    </div>
  </div>
</template>

<script>
import Constants from '@/mixins/constants';
import Maze from '@/mixins/maze';
import Strawberries from '@/mixins/strawberries';
import Sidebar from '@/components/Sidebar.vue';
import PauseModal from '@/components/PauseModal.vue';

export default {
  name: 'MazeGrid',
  mixins: [Constants, Maze, Strawberries],
  components: { Sidebar, PauseModal },
  data() {
    return {
      grid: [],
      gridXMax: 0,
      gridXMin: 0,
      gridYMax: 0,
      gridYMin: 0,
      player: null,
      playerIcon: null,
      isPaused: false,
    };
  },
  methods: {
    renderGrid() {
      const grid = this.display(this.maze(this.gridXMax, this.gridYMax));

      // init strawberries
      const strawberries = this.getStrawberries(grid, this.gridXMax);
      grid
        .flat()
        .forEach((cell) => {
          strawberries.forEach((strawberry) => {
            if (cell.x === strawberry.x && cell.y === strawberry.y) {
              cell.type = this.CELL_TYPES.strawberry;
            }
          });
        });

      this.grid = grid;
    },
    renderPlayer() {
      this.grid
        .flat()
        .filter((cell) => cell.type !== this.CELL_TYPES.block)
        .forEach((cell) => {
          if (cell.x === this.player.x && cell.y === this.player.y) {
            cell.type = this.CELL_TYPES.player;
          } else if (cell.type === this.CELL_TYPES.player) {
            cell.type = null;
          }
        });
    },
    beforeMoveHook() {
      this.grid
        .flat()
        .filter((cell) => cell.type !== this.CELL_TYPES.block)
        .filter((cell) => cell.x === this.player.x && cell.y === this.player.y)
        .forEach((cell) => {
          switch (cell.type) {
            case this.CELL_TYPES.finish:
              this.$store.dispatch('ADD_POINTS', this.POINTS_FOR_FINISH);
              this.renderGrid();
              this.resetPlayer();
              break;
            case this.CELL_TYPES.strawberry:
              this.$store.dispatch('ADD_POINTS', this.POINTS_FOR_STRAWBERRY);
              break;
            default:
          }
        });
    },
    isBlock(x, y) {
      return this.grid
        .flat()
        .some((cell) => cell.x === x && cell.y === y && cell.type === this.CELL_TYPES.block);
    },
    updateGridSize(payload) {
      this.gridXMax = payload.XMax;
      this.gridYMax = payload.YMax;

      this.renderGrid();
      this.resetPlayer();
    },
    resetPlayer() {
      this.player = { ...this.PLAYER_START };
      this.renderPlayer();
    },
    randomPlayerIcon() {
      return [...this.ICONS].sort(() => 0.5 - Math.random())[0];
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
    suspendOrResume() {
      this.isPaused = this.isPaused !== true;
    },
    keyboardHandler(event) {
      const arrows = (code) => {
        if (this.isPaused) {
          return;
        }

        switch (code) {
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
      };

      switch (event.code) {
        case 'Space':
          this.suspendOrResume();
          break;
        default:
          arrows(event.code);
      }
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
    this.player = { ...this.PLAYER_START };
    this.playerIcon = this.randomPlayerIcon();
  },
  created() {
    document.addEventListener('keydown', (event) => this.keyboardHandler(event));
  },
};
</script>
