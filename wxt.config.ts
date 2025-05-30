import tailwindcss from '@tailwindcss/vite';
import path from 'node:path';
import { type UserManifest, defineConfig } from 'wxt';

// See https://wxt.dev/api/config.html
export default defineConfig({
  modules: ['@wxt-dev/module-react'],
  manifest: ({ browser, manifestVersion, mode, command }) => {
    const config: UserManifest = {
      permissions: ['bookmarks', 'storage', 'tabs'],
    };
    console.log('Manifest>>>', { browser, manifestVersion, mode, command });
    console.log('manifest config>>>', config);
    return config;
  },
  vite: () => ({
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    // Override config here, same as `defineConfig({ ... })`
    // inside vite.config.ts files
  }),
  webExt: {
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
