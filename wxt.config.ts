import { defineConfig } from 'wxt';

// See https://wxt.dev/api/config.html
export default defineConfig({
  extensionApi: 'chrome',
  modules: ['@wxt-dev/module-react'],
  manifest: {
    permissions: ['bookmarks'],
  },
  runner: {
    // chromiumArgs: ['--user-data-dir=./.wxt/chrome-data'],
    openDevtools: true,
    openConsole: true,
    binaries: {
      // chrome: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
      chrome: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    },
  },
});
