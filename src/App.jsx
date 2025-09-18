import { useState, useEffect } from 'react'
import { Typography, Paper, Box } from '@mui/material'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
// Using simple JSON display for performance
import './App.css'

const theme = createTheme({
  palette: {
    mode: 'light',
  },
})

function App() {
  const [leftContent, setLeftContent] = useState({})
  const [rightContent, setRightContent] = useState({})

  useEffect(() => {
    // Load sample JSON data
    fetch('/data/json/email.docling.json')
      .then(response => response.json())
      .then(json => setLeftContent(json))
      .catch(err => console.error('Error loading left content:', err))

    fetch('/data/json/email.masked.json')
      .then(response => response.json())
      .then(json => setRightContent(json))
      .catch(err => console.error('Error loading right content:', err))
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        p: 1,
        m: 0,
        boxSizing: 'border-box',
        overflow: 'hidden'
      }}>
        <Typography variant="h4" component="h1" gutterBottom textAlign="center">
          HocusCloakus UI
        </Typography>
        <Typography variant="subtitle1" gutterBottom textAlign="center" color="text.secondary">
          Dual-pane JSON viewer for Docling document comparison
        </Typography>

        <Box sx={{ display: 'flex', gap: 1, height: 'calc(100vh - 120px)', mt: 1 }}>
          <Paper elevation={2} sx={{ flex: 1, p: 1, minWidth: 0 }}>
            <Typography variant="h6" gutterBottom>
              Original Docling JSON
            </Typography>
            <Box sx={{ height: 'calc(100% - 35px)', overflow: 'auto' }}>
              <pre style={{
                margin: 0,
                padding: '8px',
                backgroundColor: '#fafafa',
                fontSize: '12px',
                fontFamily: '"Roboto Mono", Monaco, Consolas, monospace',
                lineHeight: 1.4,
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word'
              }}>
                {JSON.stringify(leftContent, null, 2)}
              </pre>
            </Box>
          </Paper>

          <Paper elevation={2} sx={{ flex: 1, p: 1, minWidth: 0 }}>
            <Typography variant="h6" gutterBottom>
              Masked Docling JSON
            </Typography>
            <Box sx={{ height: 'calc(100% - 35px)', overflow: 'auto' }}>
              <pre style={{
                margin: 0,
                padding: '8px',
                backgroundColor: '#fafafa',
                fontSize: '12px',
                fontFamily: '"Roboto Mono", Monaco, Consolas, monospace',
                lineHeight: 1.4,
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word'
              }}>
                {JSON.stringify(rightContent, null, 2)}
              </pre>
            </Box>
          </Paper>
        </Box>
      </Box>
    </ThemeProvider>
  )
}

export default App