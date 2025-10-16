import { Routes, Route, Link, Navigate, useNavigate, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import Profile from './pages/Profile'
import RegistrationForm from './pages/RegistrationForm' 
import { useState } from 'react'
import { 
  AppBar, 
  Box, 
  Container,
  Drawer, 
  IconButton, 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText, 
  Toolbar, 
  Typography,
  Button,
  Stack,
  Tooltip,
  ListItemButton
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import HomeIcon from '@mui/icons-material/Home'
import InfoIcon from '@mui/icons-material/Info'
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import ContactsIcon from '@mui/icons-material/Contacts'
import PersonIcon from '@mui/icons-material/Person'
import { useAuth } from './contexts/AuthContext'
import Theme from './components/Theme'

const drawerWidth = 240

export default function Layout() {
    const { token, logout } = useAuth()
    const navigate = useNavigate()
    const location = useLocation()
    console.log('token reacher here in layout', token)
    const [mobileOpen, setMobileOpen] = useState(false)

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen)
    }

    const menuItems = [
        { text: 'Home', path: '/', icon: <HomeIcon /> },
        { text: 'About', path: '/about', icon: <InfoIcon /> },
        { text: 'Contact', path: '/contact', icon: <ContactsIcon /> },
        { text: 'Profile', path: '/profile', icon: <PersonIcon /> },
    ]

    const drawer = (
        <div>
            <Toolbar />
            <List>
                {menuItems.map((item) => (
                <ListItemButton selected={location.pathname === item.path} key={item.text} component={Link} to={item.path} sx={{ color: 'inherit', '&:active': { color: 'inherit' } }}>
                    <ListItemIcon sx={{ color: 'inherit' }}>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.text} />
                </ListItemButton>
                ))}
            </List>
        </div>
    )

    const handleLogout = async () => {
        // axiosInstance.defaults.headers.common['Authorization'] = null
        navigate('/login')
        logout()
    }

    return (
        <Container sx={{ display: 'flex' }}>
            <>
                {token && <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                    <Toolbar>
                        <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}>
                        <MenuIcon />
                        </IconButton>
                        <Box sx={{ display: 'flex', flexGrow: 1, justifyContent: 'space-between' }}>
                            <Typography variant="h6" noWrap component="div">
                                Outsider
                            </Typography>
                            <Stack
                                spacing={{ xs: 1, sm: 2 }}
                                direction="row"
                                useFlexGap
                                sx={{ flexWrap: 'wrap' }}>
                                <Theme />
                                <Tooltip title="Logout">
                                    <IconButton onClick={handleLogout}>
                                        <ExitToAppIcon />
                                    </IconButton>
                                </Tooltip>
                            </Stack>
                        </Box>
                    </Toolbar>
                </AppBar>}

                {token && <Box
                    component="nav"
                    sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}>
                    {/* Mobile drawer */}
                    <Drawer
                        variant="temporary"
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        ModalProps={{ keepMounted: true }}
                        sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                        }}>
                        {drawer}
                    </Drawer>
                    {/* Desktop drawer */}
                    <Drawer
                        variant="permanent"
                        sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                        }}
                        open>
                        {drawer}
                    </Drawer>
                </Box>}
                    
                <Box
                component="main"
                sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
                >
                <Toolbar />
                <Routes>
                    {!token && <Route path="/login" element={<RegistrationForm />} />}
                    <Route path="/" element={token ? <Home /> : <Navigate to="/login" />} />
                    <Route path="/about" element={token ? <About /> : <Navigate to="/login" />} />
                    <Route path="/contact" element={token ? <Contact /> : <Navigate to="/login" />} />
                    <Route path="/profile" element={token ? <Profile /> : <Navigate to="/login" />} />
                    <Route path="*" element={<Navigate to={token ? "/" : "/login"} />} />
                </Routes>
            </Box>
        </>
        </Container>
    )
}

