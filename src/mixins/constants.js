const constants = {
  data() {
    return {
      ICONS: ['🐶', '🐱', '🐭', '🐨', '🐵', '🐸'],
      CELL_TYPES: {
        block: 'block',
        player: 'player',
        strawberry: 'strawberry',
        finish: 'finish',
      },
      POINTS_FOR_FINISH: 10,
      POINTS_FOR_STRAWBERRY: 2,
      PLAYER_START: { x: 1, y: 1 },
      GRID_SIZE_OPTIONS: {
        '11x11': {
          x: 11,
          y: 11,
          time: 5,
        },
        '15x15': {
          x: 15,
          y: 15,
          time: 45,
        },
        '21x21': {
          x: 21,
          y: 21,
          time: 60,
        },
      },
    };
  },
};

export default constants;
