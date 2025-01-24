import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'wxt';

// See https://wxt.dev/api/config.html
export default defineConfig({
  extensionApi: 'chrome',
  modules: ['@wxt-dev/module-react'],
  manifest: {
    permissions: ['bookmarks'],
  },
  vite: () => ({
    plugins: [tailwindcss()],
    // Override config here, same as `defineConfig({ ... })`
    // inside vite.config.ts files
  }),
  runner: {
    // chromiumArgs: ['--user-data-dir=./.wxt/chrome-data'],
    openDevtools: true,
    openConsole: true,
    disabled: true,
    binaries: {
      // chrome: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
      chrome: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    },
  },
});
