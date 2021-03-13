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
    };
  },
};

export default constants;
