import Constants from '@/mixins/constants';

const strawberries = {
  mixins: [Constants],
  methods: {
    getStrawberries(grid, XMax) {
      const flatted = grid
        .flat()
        .filter((cell) => {
          if (cell.type === this.CELL_TYPES.block) {
            return false;
          }

          if (cell.type === this.CELL_TYPES.player) {
            return false;
          }

          if (cell.x === this.PLAYER_START.x && cell.y === this.PLAYER_START.y) {
            return false;
          }

          return true;
        });

      let strawberriesCount = 0;

      switch (XMax) {
        case 11:
          strawberriesCount = 3;
          break;
        case 15:
          strawberriesCount = 5;
          break;
        case 21:
          strawberriesCount = 7;
          break;
        default:
      }

      const items = [];

      for (let i = 0; i < strawberriesCount; i += 1) {
        items.push(flatted.splice(Math.floor(Math.random() * flatted.length), 1)[0]);
      }

      return items;
    },
  },
};

export default strawberries;
