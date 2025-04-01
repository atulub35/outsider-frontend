import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { ThemeProvider } from '@mui/material/styles'
import { createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import ErrorBoundary from './components/ErrorBoundry.jsx'
const darkTheme = createTheme({
  colorSchemes: {
    light: {
      // light mode palette
    },
    dark: {
      // dark mode palette
    }
  }
});


createRoot(document.getElementById('root')).render(
    <StrictMode>
        <ErrorBoundary>
            <ThemeProvider theme={darkTheme}>
                <CssBaseline />
                <App />
            </ThemeProvider>
        </ErrorBoundary>
    </StrictMode>,
)
