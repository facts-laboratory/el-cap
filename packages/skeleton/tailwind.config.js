const { createGlobPatternsForDependencies } = require('@nrwl/react/tailwind');
const { join } = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(
      __dirname,
      '{src,pages,components}/**/*!(*.stories|*.spec).{ts,tsx,html}'
    ),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {
      animation: {
        shimmer: 'shimmer 1.25s infinite linear',
      },
      backgroundImage: (theme) => ({
        skeleton:
          'linear-gradient(to right, #eeeeee 8%, #dddddd 18%, #eeeeee 33%)',
      }),
      backgroundSize: {
        skeleton: '800px 104px',
      },
    },
  },
  plugins: [],
};
