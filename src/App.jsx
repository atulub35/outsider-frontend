import { BrowserRouter as Router } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import Layout from './Layout'

const drawerWidth = 240

function App() {
  return (
    <Router>
        <AuthProvider>
            <Layout />
        </AuthProvider>
    </Router>
  )
}

export default App
