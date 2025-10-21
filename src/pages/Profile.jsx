import React, { useEffect, useState } from 'react'
import {
    Box,
    Card,
    CardContent,
    Typography,
    Button,
    TextField,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    FormControlLabel,
    Checkbox,
    Grid,
    Alert,
    Snackbar,
    CircularProgress,
    Divider,
    Avatar,
    IconButton,
    Stack,
    Chip,
    Paper,
    Fade,
    Slide,
    Skeleton
} from '@mui/material'
import {
    Edit as EditIcon,
    Save as SaveIcon,
    Cancel as CancelIcon,
    Person as PersonIcon,
    Email as EmailIcon,
    Phone as PhoneIcon,
    Language as LanguageIcon,
    Schedule as ScheduleIcon,
    Delete as DeleteIcon,
    CheckCircle as CheckCircleIcon
} from '@mui/icons-material'
import { useAuth } from '../contexts/AuthContext'
import { useApi } from '../hooks/useApi'

const Profile = ({ currentUser }) => {
    const { token } = useAuth()
    const [profile, setProfile] = useState(null)
    const [isEditing, setIsEditing] = useState(false)
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone_number: '',
        language: '',
        timezone: '',
        remove_avatar: 0
    })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const [snackbarOpen, setSnackbarOpen] = useState(false)
    const api = useApi()

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await api.getProfile()
                const userData = response?.data?.user
                setProfile(userData)
                setFormData({
                    name: userData?.name || '',
                    email: userData?.email || '',
                    phone_number: userData?.phone_number || '',
                    language: userData?.language || '',
                    timezone: userData?.timezone || '',
                    remove_avatar: 0
                })
            } catch (err) {
                setError('Failed to fetch profile data')
                setSnackbarOpen(true)
            }
        }
        fetchProfile()
    }, [])

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? (checked ? 1 : 0) : value
        }))
    }

    const handleSave = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError('')
        setSuccess('')

        try {
            const response = await api.updateProfile(formData)
            setProfile(response?.data?.user)
            setSuccess('Profile updated successfully!')
            setSnackbarOpen(true)
            setIsEditing(false)
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to update profile')
            setSnackbarOpen(true)
        } finally {
            setLoading(false)
        }
    }

    const handleCancel = () => {
        setFormData({
            name: profile?.name || '',
            email: profile?.email || '',
            phone_number: profile?.phone_number || '',
            language: profile?.language || '',
            timezone: profile?.timezone || '',
            remove_avatar: 0
        })
        setIsEditing(false)
        setError('')
        setSuccess('')
    }

    const handleSnackbarClose = () => {
        setSnackbarOpen(false)
    }

    const timezones = [
        'America/Adak', 'America/Anchorage', 'America/Los_Angeles', 'America/Denver',
        'America/Chicago', 'America/New_York', 'America/Toronto', 'Europe/London',
        'Europe/Paris', 'Europe/Berlin', 'Asia/Tokyo', 'Asia/Shanghai',
        'Asia/Kolkata', 'Australia/Sydney', 'Pacific/Auckland'
    ]

    const languages = [
        'English', 'Spanish', 'French', 'German', 'Italian', 'Portuguese',
        'Russian', 'Chinese', 'Japanese', 'Korean', 'Arabic', 'Hindi',
        'Marathi', 'Bengali', 'Tamil', 'Telugu', 'Gujarati', 'Kannada'
    ]

    const ProfileField = ({ icon, label, value, color = 'primary' }) => (
        <Paper elevation={1} sx={{ p: 2, height: '100%' }}>
            <Stack direction="row" spacing={2} alignItems="center">
                <Avatar sx={{ bgcolor: `${color}.main`, width: 40, height: 40 }}>
                    {icon}
                </Avatar>
                <Box>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                        {label}
                    </Typography>
                    <Typography variant="h6" color="text.primary">
                        {value ? value : <Skeleton variant="text" width={100} height={20} />}
                    </Typography>
                </Box>
            </Stack>
        </Paper>
    )

    return (
        <Box sx={{ maxWidth: 1200, mx: 'auto', p: 3 }}>
            <Fade in timeout={600}>
                <Card elevation={3}>
                    <CardContent sx={{ p: 4 }}>
                        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={4}>
                            <Typography variant="h4" component="h1" fontWeight="bold">
                                Profile
                            </Typography>
                            {!isEditing && (
                                <Button
                                    variant="contained"
                                    startIcon={<EditIcon />}
                                    onClick={() => setIsEditing(true)}
                                    size="large"
                                    sx={{ borderRadius: 2 }}
                                >
                                    Edit Profile
                                </Button>
                            )}
                        </Stack>

                        {/* {error && (
                            <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError('')}>
                                {error}
                            </Alert>
                        )}

                        {success && (
                            <Alert severity="success" sx={{ mb: 3 }} onClose={() => setSuccess('')}>
                                {success}
                            </Alert>
                        )} */}

                        {isEditing ? (
                            <Slide direction="up" in={isEditing} timeout={300}>
                                <Box component="form" onSubmit={handleSave}>
                                    <Grid container spacing={3}>
                                        <Grid item size={{xs: 12, sm: 6}}>
                                            <TextField
                                                fullWidth
                                                label="Name"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleInputChange}
                                                required
                                                variant="outlined"
                                                InputProps={{
                                                    startAdornment: <PersonIcon sx={{ mr: 1, color: 'action.active' }} />
                                                }}
                                            />
                                        </Grid>

                                        <Grid item size={{xs: 12, sm: 6}}>
                                            <TextField
                                                fullWidth
                                                label="Email"
                                                name="email"
                                                type="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                required
                                                variant="outlined"
                                                InputProps={{
                                                    startAdornment: <EmailIcon sx={{ mr: 1, color: 'action.active' }} />
                                                }}
                                            />
                                        </Grid>

                                        <Grid item size={{xs: 12, sm: 6}}>
                                            <TextField
                                                fullWidth
                                                label="Phone Number"
                                                name="phone_number"
                                                type="tel"
                                                value={formData.phone_number}
                                                onChange={handleInputChange}
                                                variant="outlined"
                                                InputProps={{
                                                    startAdornment: <PhoneIcon sx={{ mr: 1, color: 'action.active' }} />
                                                }}
                                            />
                                        </Grid>

                                        <Grid item size={{xs: 12, sm: 6}}>
                                            <FormControl fullWidth variant="outlined">
                                                <InputLabel>Language</InputLabel>
                                                <Select
                                                    name="language"
                                                    value={formData.language}
                                                    onChange={handleInputChange}
                                                    label="Language"
                                                    startAdornment={<LanguageIcon sx={{ mr: 1, color: 'action.active' }} />}
                                                >
                                                    {languages.map(lang => (
                                                        <MenuItem key={lang} value={lang}>
                                                            {lang}
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                        </Grid>

                                        <Grid item xs={12}>
                                            <FormControl fullWidth variant="outlined">
                                                <InputLabel>Timezone</InputLabel>
                                                <Select
                                                    name="timezone"
                                                    value={formData.timezone}
                                                    onChange={handleInputChange}
                                                    label="Timezone"
                                                    startAdornment={<ScheduleIcon sx={{ mr: 1, color: 'action.active' }} />}
                                                >
                                                    {timezones.map(tz => (
                                                        <MenuItem key={tz} value={tz}>
                                                            {tz}
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                        </Grid>

                                        <Grid item xs={12}>
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        name="remove_avatar"
                                                        checked={formData.remove_avatar === 1}
                                                        onChange={handleInputChange}
                                                        color="error"
                                                    />
                                                }
                                                label={
                                                    <Stack direction="row" spacing={1} alignItems="center">
                                                        <DeleteIcon color="error" />
                                                        <Typography color="error">
                                                            Remove Avatar
                                                        </Typography>
                                                    </Stack>
                                                }
                                            />
                                        </Grid>
                                    </Grid>

                                    <Divider sx={{ my: 3 }} />

                                    <Stack direction="row" spacing={2} justifyContent="flex-end">
                                        <Button
                                            variant="outlined"
                                            startIcon={<CancelIcon />}
                                            onClick={handleCancel}
                                            disabled={loading}
                                            size="large"
                                        >
                                            Cancel
                                        </Button>
                                        <Button
                                            type="submit"
                                            variant="contained"
                                            startIcon={loading ? <CircularProgress size={20} /> : <SaveIcon />}
                                            disabled={loading}
                                            size="large"
                                        >
                                            {loading ? 'Saving...' : 'Save Changes'}
                                        </Button>
                                    </Stack>
                                </Box>
                            </Slide>
                        ) : (
                            <Fade in timeout={600}>
                                <Grid container spacing={3}>
                                    <Grid item size={{xs: 12, sm: 6}}>
                                        <ProfileField
                                            icon={<PersonIcon />}
                                            label="Name"
                                            value={profile?.name}
                                            color="primary"
                                        />
                                    </Grid>
                                    <Grid item size={{xs: 12, sm: 6}}>
                                        <ProfileField
                                            icon={<EmailIcon />}
                                            label="Email"
                                            value={profile?.email}
                                            color="secondary"
                                        />
                                    </Grid>
                                    <Grid item size={{xs: 12, sm: 6}}>
                                        <ProfileField
                                            icon={<PhoneIcon />}
                                            label="Phone Number"
                                            value={profile?.phone_number}
                                            color="success"
                                        />
                                    </Grid>
                                    <Grid item size={{xs: 12, sm: 6}}>
                                        <ProfileField
                                            icon={<LanguageIcon />}
                                            label="Language"
                                            value={profile?.language}
                                            color="info"
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <ProfileField
                                            icon={<ScheduleIcon />}
                                            label="Timezone"
                                            value={profile?.timezone}
                                            color="warning"
                                        />
                                    </Grid>
                                </Grid>
                            </Fade>
                        )}
                    </CardContent>
                </Card>
            </Fade>

            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
                <Alert
                    onClose={handleSnackbarClose}
                    severity={error ? 'error' : 'success'}
                    variant="filled"
                    icon={error ? undefined : <CheckCircleIcon />}
                >
                    {error || success}
                </Alert>
            </Snackbar>
        </Box>
    )
}

export default Profile 