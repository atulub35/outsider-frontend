import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { AuthProvider } from './contexts/AuthContext.jsx'
import { ThemeProvider } from '@mui/material/styles'
import { createTheme } from '@mui/material/styles'
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
    <AuthProvider>
      <ThemeProvider theme={darkTheme}>
        <App />
      </ThemeProvider>
    </AuthProvider>
  </StrictMode>,
)
