// copy-paste from https://rosettacode.org/wiki/Maze_generation#JavaScript
const maze = {
  methods: {
    maze(inputX, inputY) {
      const x = (inputX - 1) / 2;
      const y = (inputY - 1) / 2;

      let j;
      let n = x * y - 1;

      if (n < 0) {
        // eslint-disable-next-line no-alert
        alert('illegal maze dimensions');

        return;
      }

      const horiz = [];

      for (j = 0; j < x + 1; j += 1) {
        horiz[j] = [];
      }

      const verti = [];

      for (j = 0; j < x + 1; j += 1) {
        verti[j] = [];
      }

      let here = [Math.floor(Math.random() * x), Math.floor(Math.random() * y)];
      const path = [here];
      const unvisited = [];

      for (j = 0; j < x + 2; j += 1) {
        unvisited[j] = [];

        for (let k = 0; k < y + 1; k += 1) {
          unvisited[j]
            .push(j > 0 && j < x + 1 && k > 0 && (j !== here[0] + 1 || k !== here[1] + 1));
        }
      }

      while (n > 0) {
        const potential = [
          [here[0] + 1, here[1]], [here[0], here[1] + 1],
          [here[0] - 1, here[1]], [here[0], here[1] - 1],
        ];

        const neighbors = [];

        for (j = 0; j < 4; j += 1) {
          if (unvisited[potential[j][0] + 1][potential[j][1] + 1]) {
            neighbors.push(potential[j]);
          }
        }

        if (neighbors.length) {
          n -= 1;

          const next = neighbors[Math.floor(Math.random() * neighbors.length)];

          unvisited[next[0] + 1][next[1] + 1] = false;

          if (next[0] === here[0]) {
            horiz[next[0]][(next[1] + here[1] - 1) / 2] = true;
          } else {
            verti[(next[0] + here[0] - 1) / 2][next[1]] = true;
          }

          path.push(here = next);
        } else {
          here = path.pop();
        }
      }

      // eslint-disable-next-line consistent-return
      return {
        x, y, horiz, verti,
      };
    },
    display(m) {
      const mazeArea = [];

      for (let y = 0; y < m.x * 2 + 1; y += 1) {
        const row = [];

        if (y % 2 === 0) {
          for (let x = 0; x < m.y * 2 + 1; x += 1) {
            if (x % 2 === 0) {
              row.push({ type: 'block', x, y });
            } else if (y > 0 && m.verti[y / 2 - 1][Math.floor(x / 2)]) {
              row.push({ type: null, x, y });
            } else {
              row.push({ type: 'block', x, y });
            }
          }
        } else {
          for (let x = 0; x < m.y * 2 + 1; x += 1) {
            if (x % 2 === 0) {
              if (x > 0 && m.horiz[(y - 1) / 2][x / 2 - 1]) {
                row.push({ type: null, x, y });
              } else {
                row.push({ type: 'block', x, y });
              }
            } else {
              row.push({ type: null, x, y });
            }
          }
        }

        // start
        // if (y === 0) {
        //   row[1] = '1';
        // }

        // end
        if (m.x * 2 - 1 === y) {
          row[2 * m.y] = { type: 'finish', x: 2 * m.y, y };
        }

        mazeArea.push(row);
      }

      return mazeArea.slice().reverse();
    },
  },
};

export default maze;
