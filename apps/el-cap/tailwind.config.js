const { createGlobPatternsForDependencies } = require('@nrwl/react/tailwind');
const { join } = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(
      __dirname,
      '{src,pages,components}/**/*!(*.stories|*.spec).{ts,tsx,html}'
    ),
    // Configure Ui Kit
    './node_modules/@facts-kit/ui-kit/**/*.{js,ts,jsx,tsx}',
    // ----------------
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {
      colors: {
        'light-blue1': '#00FFF2F3',
        'light-blue2': '#6DE2FF',
        primary: '#293241',
        secondary: '#FF8500',
      },
      backgroundColor: {
        primary: '#FFF',
        secondary: '#F2F3F4',
      },
      borderColor: {
        primary: '#293241',
        secondary: '#FF8500',
      },
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
