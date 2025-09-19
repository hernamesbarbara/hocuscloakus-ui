# Port Create.xyz UI to Clean Vite App - Technical Plan

## Executive Summary
Port the split diff viewer UI from Create.xyz prototype to a clean Vite.js React app, removing all Create.xyz-specific scaffolding while preserving the core functionality.

## Current Architecture Analysis

### Core UI Component
- **Main Component**: `SplitDiffView.jsx` - A side-by-side file comparison viewer
- **Dependencies**:
  - `react-resizable-panels` for split pane functionality
  - `react-markdown` for markdown rendering
  - `lucide-react` for icons
  - Tailwind CSS for styling

### What to KEEP from Create.xyz Project

#### Essential UI Dependencies
```json
{
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "react-resizable-panels": "^2.1.7",
  "react-markdown": "^6.0.3",
  "lucide-react": "0.358.0",
  "@tanstack/react-query": "^5.72.2"
}
```

#### Styling Dependencies
- Tailwind CSS (v3)
- PostCSS & Autoprefixer
- Custom font configuration (if needed - currently has extensive Google Fonts list)

#### Files to Copy
1. `src/components/SplitDiffView.jsx` - Main component
2. `src/app/page.jsx` - Example usage (will become App.jsx)
3. `src/app/layout.jsx` - QueryClient setup (merge into main app)
4. `tailwind.config.js` - Tailwind configuration
5. `src/app/global.css` or `src/index.css` - Base Tailwind directives

### What to EXCLUDE (Create.xyz-specific)

#### Directories to Ignore
- `__create/` - All Create.xyz runtime/server code
- `src/__create/` - Create.xyz client utilities
- `plugins/` - Custom Vite plugins for Create.xyz
- `.react-router/` - React Router SSR artifacts

#### Dependencies to Skip
- `react-router-hono-server` - Server-side rendering
- `@react-router/*` packages (replace with `react-router-dom` if routing needed)
- `@hono/*` - Backend framework
- `@auth/*` - Authentication (not needed for UI demo)
- Auth-related: `argon2`, `stripe`
- Database: `@neondatabase/serverless`
- Server utilities: `ws`, `serialize-error`
- Create.xyz specific build tools

#### Configuration Files to Skip
- `react-router.config.ts` - SSR configuration
- Complex vite.config.ts plugins (keep only essential ones)

## Implementation Plan

### Phase 1: Scaffold New Vite App
```bash
# Create new Vite React app in project root
npm create vite@latest . -- --template react

# Clean up default Vite files
rm -rf src/assets src/App.css
```

### Phase 2: Install Dependencies
```bash
# Core dependencies
npm install react-resizable-panels react-markdown lucide-react @tanstack/react-query

# Development dependencies
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

### Phase 3: Configure Build Tools

#### vite.config.js (Minimal)
```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
```

#### tailwind.config.js
- Copy from Create.xyz project
- Remove excessive font definitions (keep only what's used)
- Ensure `content: ['./src/**/*.{js,jsx,ts,tsx}']`

#### tsconfig.json (if using TypeScript)
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "jsx": "react-jsx",
    "moduleResolution": "bundler",
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    },
    "resolveJsonModule": true,
    "allowJs": true,
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

### Phase 4: Port UI Components

#### File Structure
```
src/
├── components/
│   └── SplitDiffView.jsx
├── App.jsx
├── main.jsx
└── index.css
```

#### src/index.css
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  input, textarea, select, button {
    @apply outline-none focus:outline-none;
  }
}
```

#### src/main.jsx
```jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import App from './App'
import './index.css'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>
)
```

#### src/App.jsx
- Copy content from `src/app/page.jsx`
- Remove any Create.xyz specific imports
- Ensure imports use proper paths

### Phase 5: Fix Imports

#### Common Import Fixes
- Remove all `@/__create/*` imports
- Remove `@auth/*` imports
- Change React Router imports from `react-router` to `react-router-dom` (if needed)
- Update component imports to use relative paths or `@/` alias

### Phase 6: Clean Up & Test

#### Verification Checklist
- [ ] App starts with `npm run dev`
- [ ] No console errors
- [ ] Split view renders correctly
- [ ] Resize handles work
- [ ] Markdown renders properly
- [ ] JSON syntax highlighting works
- [ ] Copy buttons function
- [ ] Dark mode classes apply (if implemented)

#### Optional Enhancements
1. Add routing with react-router-dom if multiple pages needed
2. Implement dark mode toggle
3. Add file upload functionality
4. Create additional example file types

## Potential Issues & Solutions

### Issue 1: Missing Fonts
**Solution**: Either remove custom fonts from Tailwind config or add only the specific fonts actually used

### Issue 2: Path Aliases Not Working
**Solution**: Ensure vite.config.js has proper alias configuration and tsconfig.json matches

### Issue 3: Styled JSX Errors
**Solution**: Remove styled-jsx plugin references - not needed for Tailwind-only approach

### Issue 4: HMR/Dev Server Issues
**Solution**: These are Create.xyz specific - safe to remove all HMR custom code

## Alternative: Material UI Implementation

### Option A: Tailwind CSS (Original Plan Above)
Use the implementation plan above for a Tailwind-based solution.

### Option B: Material UI Conversion
Convert the UI to use Material UI instead of Tailwind CSS for a more component-based approach with built-in theming.

#### MUI Dependencies
```bash
# Remove Tailwind
npm uninstall tailwindcss postcss autoprefixer
rm tailwind.config.js postcss.config.js

# Install Material UI
npm install @mui/material @emotion/react @emotion/styled @mui/icons-material

# Keep these from original
npm install react-resizable-panels react-markdown @tanstack/react-query
```

#### MUI Theme Setup (src/theme.js)
```javascript
import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    mode: 'light', // or 'dark'
    primary: {
      main: '#18191B',
    },
    secondary: {
      main: '#22C55E',
    },
    background: {
      default: '#F3F3F3',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#2B2B2B',
      secondary: '#6B7280',
    },
  },
  typography: {
    fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
    h1: {
      fontSize: '2rem',
      fontWeight: 700,
    },
    body1: {
      fontSize: '0.875rem',
    },
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#F2F2F2',
    },
    secondary: {
      main: '#22C55E',
    },
    background: {
      default: '#0A0A0A',
      paper: '#1E1E1E',
    },
    text: {
      primary: '#E5E5E5',
      secondary: '#9CA3AF',
    },
  },
  typography: {
    fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
  },
});
```

#### MUI main.jsx
```jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { theme } from './theme';
import App from './App';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </ThemeProvider>
  </React.StrictMode>
);
```

### Tailwind to MUI Component Mapping

#### 1. Container/Layout Components
| Tailwind | Material UI |
|----------|-------------|
| `<div className="bg-white border rounded-lg p-4">` | `<Paper sx={{ p: 2 }}>` |
| `<div className="flex items-center gap-2">` | `<Stack direction="row" spacing={2} alignItems="center">` |
| `<div className="grid grid-cols-2 gap-4">` | `<Grid container spacing={2}>` |

#### 2. Typography
| Tailwind | Material UI |
|----------|-------------|
| `<h1 className="text-2xl font-bold">` | `<Typography variant="h4" fontWeight="bold">` |
| `<p className="text-sm text-gray-600">` | `<Typography variant="body2" color="text.secondary">` |
| `<span className="font-medium">` | `<Typography component="span" fontWeight="medium">` |

#### 3. Buttons
| Tailwind | Material UI |
|----------|-------------|
| `<button className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800">` | `<Button variant="contained">` |
| `<button className="px-2 py-1 border rounded text-sm">` | `<Button variant="outlined" size="small">` |

#### 4. Icons
| Lucide React | Material UI Icons |
|--------------|-------------------|
| `import { Copy } from 'lucide-react'` | `import ContentCopyIcon from '@mui/icons-material/ContentCopy'` |
| `import { FileText } from 'lucide-react'` | `import DescriptionIcon from '@mui/icons-material/Description'` |
| `<Copy size={12} />` | `<ContentCopyIcon sx={{ fontSize: 12 }} />` |

### Example Component Conversion

#### Original Tailwind Version (Simplified)
```jsx
const FilePane = ({ file, side }) => (
  <div className="h-full flex flex-col bg-white border rounded-lg">
    <div className="flex items-center justify-between px-4 py-3 bg-gray-50 border-b">
      <div className="flex items-center gap-2">
        <FileText size={16} className="text-gray-600" />
        <span className="font-medium text-sm">{file.name}</span>
      </div>
      <button className="px-2 py-1 text-xs border rounded hover:bg-gray-50">
        <Copy size={12} />
        Copy
      </button>
    </div>
    <div className="flex-1 overflow-auto p-4">
      {/* content */}
    </div>
  </div>
);
```

#### MUI Conversion
```jsx
import {
  Paper, Box, Stack, Typography, Button, Divider
} from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DescriptionIcon from '@mui/icons-material/Description';

const FilePane = ({ file, side }) => (
  <Paper
    elevation={1}
    sx={{
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden'
    }}
  >
    <Box
      sx={{
        px: 2,
        py: 1.5,
        bgcolor: 'grey.50',
        borderBottom: 1,
        borderColor: 'divider'
      }}
    >
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Stack direction="row" spacing={1} alignItems="center">
          <DescriptionIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
          <Typography variant="body2" fontWeight="medium">
            {file.name}
          </Typography>
        </Stack>
        <Button
          size="small"
          variant="outlined"
          startIcon={<ContentCopyIcon sx={{ fontSize: 12 }} />}
          sx={{ textTransform: 'none', fontSize: '0.75rem' }}
        >
          Copy
        </Button>
      </Stack>
    </Box>
    <Box sx={{ flexGrow: 1, overflow: 'auto', p: 2 }}>
      {/* content */}
    </Box>
  </Paper>
);
```

### MUI-Specific Considerations

#### 1. Keep react-resizable-panels
MUI doesn't have a native split pane component, so keep using `react-resizable-panels`:
```jsx
import { PanelGroup, Panel, PanelResizeHandle } from 'react-resizable-panels';

// Wrap in MUI Box for styling
<Box sx={{ height: '80vh', bgcolor: 'background.default' }}>
  <PanelGroup direction="horizontal">
    <Panel defaultSize={50}>
      <FilePane file={originalFile} />
    </Panel>
    <PanelResizeHandle />
    <Panel defaultSize={50}>
      <FilePane file={maskedFile} />
    </Panel>
  </PanelGroup>
</Box>
```

#### 2. Dark Mode Implementation
```jsx
import { useState, useMemo } from 'react';
import { ThemeProvider, IconButton } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { theme, darkTheme } from './theme';

function App() {
  const [mode, setMode] = useState('light');

  const activeTheme = useMemo(
    () => mode === 'light' ? theme : darkTheme,
    [mode]
  );

  return (
    <ThemeProvider theme={activeTheme}>
      <IconButton onClick={() => setMode(mode === 'light' ? 'dark' : 'light')}>
        {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
      </IconButton>
      {/* rest of app */}
    </ThemeProvider>
  );
}
```

#### 3. Syntax Highlighting
For JSON syntax highlighting, you can either:
- Keep the existing inline style approach (works fine with MUI)
- Use a dedicated library like `react-syntax-highlighter`
- Use MUI's `Box` component with custom styles

### Decision Matrix: Tailwind vs Material UI

| Aspect | Tailwind CSS | Material UI |
|--------|--------------|-------------|
| **Bundle Size** | Smaller (purged CSS) | Larger (component library) |
| **Learning Curve** | Low if familiar with CSS | Moderate (component API) |
| **Customization** | Very flexible | Theme-based |
| **Dark Mode** | CSS classes | Theme provider |
| **Consistency** | Manual | Built-in design system |
| **Development Speed** | Fast for custom designs | Fast for standard UIs |
| **Type Safety** | No | Yes (with TypeScript) |
| **Accessibility** | Manual | Built-in ARIA support |

### Recommendation
- **Choose Tailwind** if: You want maximum control, smaller bundle, or already familiar with it
- **Choose MUI** if: You want faster development with pre-built components, built-in accessibility, and consistent design system

## Final Notes

The core UI is surprisingly simple - just one main component with a few dependencies. Most of the Create.xyz bundle is server-side code and dev tooling that isn't needed for a standalone UI demo. The migration should be straightforward:

1. **Time Estimate**:
   - Tailwind: 1-2 hours basic, 3-4 hours with polish
   - MUI: 2-3 hours basic, 4-5 hours with polish (includes learning curve)
2. **Complexity**: Low - mostly file copying and style conversion
3. **Risk**: Minimal - UI component has clear dependencies

The resulting app will be much cleaner and easier to maintain, with a build size likely 80%+ smaller than the Create.xyz bundle.