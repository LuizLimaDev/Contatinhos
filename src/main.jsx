import { CssBaseline, ThemeProvider, createTheme } from '@mui/material'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import MainRoutes from './routes.jsx'

const theme = createTheme({
  color: {
    gray100: '#FDFAFA',
    gray200: '#F4F0F0',
    green200: '#04C45C',
    red100: 'rgba(251, 6, 21, .65)',
    blue200: '#1565c0',
    blue300: '#134563',
    white100: '#FFFAFA',
    white200: '#FFFFFF',
  }
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <MainRoutes />
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
