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
        primary: '#293241',
        secondary: '#FF8500',
      },
      backgroundColor: {
        primary: '#000',
        secondary: '#F2F3F4',
      },
      borderColor: {
        primary: '#293241',
        secondary: '#FF8500',
      },
    },
  },
  plugins: [],
};
