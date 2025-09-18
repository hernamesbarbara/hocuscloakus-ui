import { useState, useEffect } from 'react'
import { Container, Grid, Typography, Paper, Box } from '@mui/material'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import JsonView from '@uiw/react-json-view'
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
      <Container maxWidth="xl" sx={{ py: 2 }}>
        <Typography variant="h4" component="h1" gutterBottom textAlign="center">
          HocusCloakus UI
        </Typography>
        <Typography variant="subtitle1" gutterBottom textAlign="center" color="text.secondary">
          Dual-pane JSON viewer for Docling document comparison
        </Typography>

        <Box sx={{ mt: 3 }}>
          <Grid container spacing={2} sx={{ height: 'calc(100vh - 200px)' }}>
            <Grid item xs={12} md={6}>
              <Paper elevation={2} sx={{ height: '100%', p: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Original Docling JSON
                </Typography>
                <Box sx={{ height: 'calc(100% - 40px)', overflow: 'auto' }}>
                  <JsonView
                    value={leftContent}
                    style={{
                      backgroundColor: '#fafafa',
                      fontSize: '12px',
                    }}
                    displayDataTypes={false}
                    displayObjectSize={false}
                    enableClipboard={true}
                    collapsed={2}
                  />
                </Box>
              </Paper>
            </Grid>

            <Grid item xs={12} md={6}>
              <Paper elevation={2} sx={{ height: '100%', p: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Masked Docling JSON
                </Typography>
                <Box sx={{ height: 'calc(100% - 40px)', overflow: 'auto' }}>
                  <JsonView
                    value={rightContent}
                    style={{
                      backgroundColor: '#fafafa',
                      fontSize: '12px',
                    }}
                    displayDataTypes={false}
                    displayObjectSize={false}
                    enableClipboard={true}
                    collapsed={2}
                  />
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </ThemeProvider>
  )
}

export default App