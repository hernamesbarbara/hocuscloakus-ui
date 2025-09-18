import { useState, useEffect } from 'react'
import { Container, Grid, Typography, Paper, Box } from '@mui/material'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import MDEditor from '@uiw/react-md-editor'
import './App.css'

const theme = createTheme({
  palette: {
    mode: 'light',
  },
})

function App() {
  const [leftContent, setLeftContent] = useState('')
  const [rightContent, setRightContent] = useState('')

  useEffect(() => {
    // Load sample data
    fetch('/data/md/email.original.md')
      .then(response => response.text())
      .then(text => setLeftContent(text))
      .catch(err => console.error('Error loading left content:', err))

    fetch('/data/md/email.masked.md')
      .then(response => response.text())
      .then(text => setRightContent(text))
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
          Dual-pane markdown editor for file comparison
        </Typography>

        <Box sx={{ mt: 3 }}>
          <Grid container spacing={2} sx={{ height: 'calc(100vh - 200px)' }}>
            <Grid item xs={12} md={6}>
              <Paper elevation={2} sx={{ height: '100%', p: 1 }}>
                <Typography variant="h6" gutterBottom>
                  Original File
                </Typography>
                <Box sx={{ height: 'calc(100% - 40px)' }}>
                  <MDEditor
                    value={leftContent}
                    onChange={setLeftContent}
                    height="100%"
                    preview="edit"
                    hideToolbar={false}
                    data-color-mode="light"
                  />
                </Box>
              </Paper>
            </Grid>

            <Grid item xs={12} md={6}>
              <Paper elevation={2} sx={{ height: '100%', p: 1 }}>
                <Typography variant="h6" gutterBottom>
                  Masked File
                </Typography>
                <Box sx={{ height: 'calc(100% - 40px)' }}>
                  <MDEditor
                    value={rightContent}
                    onChange={setRightContent}
                    height="100%"
                    preview="edit"
                    hideToolbar={false}
                    data-color-mode="light"
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