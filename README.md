# Chrome Bookmark Organizer Extension

A powerful Chrome extension that helps you organize and manage your bookmarks
efficiently. Built with WXT, React, and Tailwind CSS, it provides an intuitive
interface for searching, filtering, and managing your Chrome bookmarks.

## Project Links

- [Project Overview](https://linear.app/axm-coder/project/chrome-bookmark-organizer-vite-wxt-b604049a51fb/overview)
- [Chrome Bookmarks API Documentation](https://developer.chrome.com/docs/extensions/reference/api/bookmarks)
- [WXT Installation Guide](https://wxt.dev/guide/installation.html)

## Features

- **Domain-based Organization**: Automatically groups bookmarks by their domain
  names
- **Smart Search**: Filter bookmarks by domain name or URL patterns
- **Collapsible Views**: Each domain group can be expanded/collapsed for better
  organization
- **Bookmark Statistics**: Shows the total number of bookmarks and count per
  domain
- **Modern UI**: Clean and responsive interface built with Tailwind CSS
- **Detailed Information**: Displays comprehensive bookmark details including:
  - Title and URL
  - Date added
  - Parent folder location
  - Quick actions for bookmark management

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
  - Provides modern tooling and development experience
  - Hot module reloading for faster development
  - TypeScript support out of the box
- [React](https://reactjs.org/) - UI Library

  - Component-based architecture
  - Efficient state management with hooks

- [TypeScript](https://www.typescriptlang.org/) - Type-safe JavaScript
  - Enhanced code reliability
  - Better development experience with type checking

## UI Components and Styling

- [shadcn/ui](https://ui.shadcn.com/) - Re-usable Components

  - Built on top of Radix UI and Tailwind CSS
  - Beautifully designed components
  - Copy and paste components
  - Fully customizable and maintainable
  - Used components:
    - Button
    - Input
    - Table
    - Dialog
    - Badge

- [Tailwind CSS](https://tailwindcss.com/) (v4) - Utility-first CSS Framework

  - Modern and responsive design
  - Highly customizable components
  - Built-in animations and transitions
  - JIT (Just-In-Time) compilation

- [Radix UI](https://www.radix-ui.com/) - Headless UI Components
  - Accessible components out of the box
  - Highly customizable primitives
  - Used components:
    - Alert Dialog
    - Dropdown Menu
    - Slot

## Permissions

The extension requires the following Chrome permissions:

- `bookmarks`: To access and manage Chrome bookmarks
- `storage`: For storing extension preferences
- `tabs`: For interacting with browser tabs

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
