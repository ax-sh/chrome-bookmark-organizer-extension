# Chrome Bookmark Organizer Extension

A prototype bookmark organizer built with WXT, React, and Tailwind CSS.

## Project Links

- [Project Overview](https://linear.app/axm-coder/project/chrome-bookmark-organizer-vite-wxt-b604049a51fb/overview)
- [Chrome Bookmarks API Documentation](https://developer.chrome.com/docs/extensions/reference/api/bookmarks)
- [WXT Installation Guide](https://wxt.dev/guide/installation.html)

## Features

- Organize bookmarks by domain
- Search and filter bookmarks
- Display bookmark details (title, URL, date added)

## Development

To run the extension in development mode:

```bash
npm run dev
```

## Loading the Extension

1. Open Chrome and navigate to `chrome://extensions`
2. Enable "Developer mode" in the top right corner
3. Click "Load unpacked"
4. Select the `.output/chrome-mv3` directory in the project folder

## Building for Production

To build the extension for production:

```bash
npm run build
```

The built extension will be available in the `.output/chrome-mv3` directory.

## Tech Stack

- [WXT](https://wxt.dev/) - Web Extension Framework
- [React](https://reactjs.org/) - UI Library
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS Framework
- [TypeScript](https://www.typescriptlang.org/) - Type-safe JavaScript
