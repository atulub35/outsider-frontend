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
  const [isSignUp, setIsSignUp] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: ""
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
    setErrors({})

    if (isSignUp) {
      // Validate password confirmation for sign up
      if (formData.password !== formData.password_confirmation) {
        setErrors({ password_confirmation: "Passwords do not match" })
        setIsSubmitting(false)
        return
      }

      try {
        // Register the user
        const registerResponse = await api.register({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          password_confirmation: formData.password_confirmation
        })
        
        console.log('Registration response:', registerResponse)
        
        // After successful registration, automatically log the user in
        if (registerResponse.status === 201) {
          try {
            const loginResponse = await api.login({
              email: formData.email,
              password: formData.password
            })
            
            if (loginResponse.data.token) {
              setAuthToken(loginResponse.data.token)
              navigate("/")
            } else {
              // If no token, still navigate (user is registered)
              navigate("/")
            }
          } catch (loginError) {
            console.error("Auto-login error:", loginError)
            // Registration succeeded but auto-login failed
            // Navigate to login page or show success message
            navigate("/users/sign_in")
          }
        }
      } catch (error) {
        console.error("Registration error:", error)
        const errorData = error.response?.data
        
        if (errorData) {
          const formattedErrors = {}
          
          // Use field_errors if available (preferred format)
          if (errorData.field_errors) {
            Object.keys(errorData.field_errors).forEach((field) => {
              // Map backend field names to form field names
              const formField = field === 'password_confirmation' ? 'password_confirmation' : field
              formattedErrors[formField] = errorData.field_errors[field].join(', ')
            })
          } else if (errorData.errors && Array.isArray(errorData.errors)) {
            // Fallback: parse error messages if field_errors not available
            errorData.errors.forEach((errorMsg) => {
              const lowerMsg = errorMsg.toLowerCase()
              if (lowerMsg.includes('email')) {
                formattedErrors.email = errorMsg
              } else if (lowerMsg.includes('password')) {
                if (lowerMsg.includes('confirmation') || lowerMsg.includes('match')) {
                  formattedErrors.password_confirmation = errorMsg
                } else {
                  formattedErrors.password = errorMsg
                }
              } else if (lowerMsg.includes('name')) {
                formattedErrors.name = errorMsg
              } else {
                formattedErrors.general = errorMsg
              }
            })
          }
          
          // Set general error if no field-specific errors were found
          if (Object.keys(formattedErrors).length === 0) {
            formattedErrors.general = errorData.message || "An error occurred during registration"
          }
          
          setErrors(formattedErrors)
        } else {
          setErrors({ general: "An error occurred during registration" })
        }
      } finally {
        setIsSubmitting(false)
      }
    } else {
      // Sign in flow
      try {
        const loginResponse = await api.login({
          email: formData.email,
          password: formData.password
        })
        
        console.log('Login response:', loginResponse)
        
        if (loginResponse.data.token) {
          setAuthToken(loginResponse.data.token)
          navigate("/")
        } else {
          setErrors({ general: "Login failed. Please try again." })
        }
      } catch (error) {
        console.error("Login error:", error)
        const errorData = error.response?.data
        
        if (errorData) {
          const formattedErrors = {}
          
          // Handle errors array or message
          if (errorData.errors && Array.isArray(errorData.errors)) {
            // Use the first error message as general error for sign in
            formattedErrors.general = errorData.errors[0] || "Invalid email or password"
          } else if (errorData.message) {
            formattedErrors.general = errorData.message
          } else {
            formattedErrors.general = "Invalid email or password"
          }
          
          setErrors(formattedErrors)
        } else {
          setErrors({ general: "Invalid email or password" })
        }
      } finally {
        setIsSubmitting(false)
      }
    }
  }

  const handleToggleMode = (e) => {
    e.preventDefault()
    setIsSignUp(!isSignUp)
    setErrors({})
    // Clear password confirmation when switching to sign in
    if (!isSignUp) {
      setFormData(prev => ({
        ...prev,
        password_confirmation: ""
      }))
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
        }}>
        <Typography component="h1" variant="h5" sx={{ mt: 2 }}>
          {isSignUp ? 'Create your account' : 'Sign in to your account'}
        </Typography>
        
        <Typography variant="body2" sx={{ mt: 1 }}>
          {isSignUp ? (
            <>
              Or{' '}
              <Link 
                href="#" 
                variant="body2" 
                onClick={handleToggleMode}
                sx={{ cursor: 'pointer' }}
              >
                sign in to your existing account
              </Link>
            </>
          ) : (
            <>
              Don't have an account?{' '}
              <Link 
                href="#" 
                variant="body2" 
                onClick={handleToggleMode}
                sx={{ cursor: 'pointer' }}
              >
                Sign up
              </Link>
            </>
          )}
        </Typography>

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          {isSignUp && (
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Name"
              name="name"
              autoComplete="name"
              autoFocus
              value={formData.name}
              onChange={handleChange}
              error={!!errors.name}
              helperText={errors.name}
            />
          )}
          
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus={!isSignUp}
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
            autoComplete={isSignUp ? "new-password" : "current-password"}
            value={formData.password}
            onChange={handleChange}
            error={!!errors.password}
            helperText={errors.password}
          />
          
          {isSignUp && (
            <TextField
              margin="normal"
              required
              fullWidth
              name="password_confirmation"
              label="Confirm Password"
              type="password"
              id="password_confirmation"
              autoComplete="new-password"
              value={formData.password_confirmation}
              onChange={handleChange}
              error={!!errors.password_confirmation}
              helperText={errors.password_confirmation}
            />
          )}

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
                {isSignUp ? 'Creating account...' : 'Signing in...'}
              </>
            ) : (
              isSignUp ? 'Sign up' : 'Sign in'
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
