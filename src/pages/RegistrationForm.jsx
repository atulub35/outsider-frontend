import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from '../contexts/AuthContext'
import { useApi } from '../hooks/useApi'
import { 
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Link,
  CircularProgress
} from '@mui/material'

const RegistrationForm = () => {
  const navigate = useNavigate()
  const { login: setAuthToken } = useAuth()
  const api = useApi()
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await api.login(formData)
      if (response.data.token) {
        setAuthToken(response.data.token)
        navigate("/")
      }
    } catch (error) {
      console.error("Registration error:", error)
      setErrors({ general: "An error occurred during registration" })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Button onClick={() => logout()} variant="outlined">
          Logout
        </Button>
        
        <Typography component="h1" variant="h5" sx={{ mt: 2 }}>
          Create your account
        </Typography>
        
        <Typography variant="body2" sx={{ mt: 1 }}>
          Or{' '}
          <Link href="/users/sign_in" variant="body2">
            sign in to your existing account
          </Link>
        </Typography>

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={formData.email}
            onChange={handleChange}
            error={!!errors.email}
            helperText={errors.email}
          />
          
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="new-password"
            value={formData.password}
            onChange={handleChange}
            error={!!errors.password}
            helperText={errors.password}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <CircularProgress size={24} sx={{ mr: 1 }} />
                Signing in...
              </>
            ) : (
              'Sign in'
            )}
          </Button>
          
          {errors.general && (
            <Typography color="error" variant="body2" align="center">
              {errors.general}
            </Typography>
          )}
        </Box>
      </Box>
    </Container>
  )
}

export default RegistrationForm
