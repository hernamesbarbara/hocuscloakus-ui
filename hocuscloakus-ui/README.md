# Hocuscloakus UI

A clean React app for viewing side-by-side file comparisons with support for Markdown and JSON files.

## Features

- Side-by-side file comparison view
- Resizable split panes using `react-resizable-panels`
- Markdown rendering with syntax highlighting
- JSON syntax highlighting
- Copy file contents to clipboard
- Dark mode support (CSS classes ready)
- Responsive design with Tailwind CSS

## Tech Stack

- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **Tailwind CSS 3** - Styling framework
- **react-resizable-panels** - Split pane functionality
- **react-markdown** - Markdown rendering
- **lucide-react** - Icons
- **@tanstack/react-query** - Data fetching and state management

## Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
hocuscloakus-ui/
├── src/
│   ├── components/
│   │   └── SplitDiffView.jsx    # Main split view component
│   ├── App.jsx                  # Main application component
│   ├── main.jsx                 # Entry point with QueryClient
│   └── index.css                # Tailwind directives
├── public/                      # Static assets
├── tailwind.config.js          # Tailwind configuration
├── postcss.config.js           # PostCSS configuration
├── vite.config.js              # Vite configuration
└── package.json                # Dependencies
```

## Usage

The app displays two file comparison examples:
- **Markdown Example**: Shows a README.md file with original and masked versions
- **JSON Example**: Shows a config.json file with original and masked versions

Click the buttons at the top to switch between examples. Each pane has a copy button to copy the file contents to clipboard.

## Development

The app is configured with:
- Path aliases (`@/` maps to `src/`)
- Hot Module Replacement (HMR) for fast development
- Tailwind CSS with custom color and font configurations
- React Query for efficient data management

## Build Output

The production build is optimized and includes:
- Minified and tree-shaken JavaScript
- Optimized CSS with unused Tailwind classes removed
- Efficient code splitting

Build size (approximate):
- HTML: ~0.5 KB
- CSS: ~11 KB (2.9 KB gzipped)
- JS: ~368 KB (115 KB gzipped)

## Future Enhancements

- Add file upload functionality
- Implement dark mode toggle
- Add more file type support (YAML, XML, etc.)
- Add diff highlighting
- Export comparison results