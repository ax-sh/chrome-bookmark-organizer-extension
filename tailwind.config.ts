import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './assets/**/*.{js,ts,jsx,tsx}',
    './entrypoints/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

export default config;
