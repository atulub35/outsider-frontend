import React, { useEffect, useMemo, useState } from 'react'
import {
    Box,
    Card,
    CardContent,
    Typography,
    Button,
    TextField,
    Grid,
    Alert,
    Snackbar,
    CircularProgress,
    Divider,
    IconButton,
    Stack,
    Chip,
    Paper,
    Fade,
    CardMedia,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    CardActions,
    Tooltip,
    ImageList,
    ImageListItem,
    ImageListItemBar
} from '@mui/material'
import {
    Delete as DeleteIcon,
    Add as AddIcon,
    Image as ImageIcon,
    Close as CloseIcon,
    CloudUpload as CloudUploadIcon
} from '@mui/icons-material'
import { useAuth } from '../contexts/AuthContext'
import { useApi } from '../hooks/useApi'

const Images = ({ currentUser }) => {
    const { token } = useAuth()
    const [images, setImages] = useState([])
    const [showGenerateModal, setShowGenerateModal] = useState(false)
    const [loading, setLoading] = useState(false)
    const [generating, setGenerating] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const [snackbarOpen, setSnackbarOpen] = useState(false)
    
    // Form state
    const [prompt, setPrompt] = useState('')
    const [referenceImage, setReferenceImage] = useState(null)
    const [referenceImagePreview, setReferenceImagePreview] = useState(null)
    
    const api = useApi()

    // Fetch images on mount
    useEffect(() => {
        fetchImages()
    }, [])

    const fetchImages = async () => {
        setLoading(true)
        try {
            const response = await api.getGeneratedImages()
            const imagesData = response?.data?.data?.images || []
            console.log('Images fetched:', imagesData)
            setImages(imagesData)
        } catch (err) {
            console.error('Failed to fetch images:', err)
            setError('Failed to fetch images data')
            setSnackbarOpen(true)
        } finally {
            setLoading(false)
        }
    }

    const handleGenerateImage = async () => {
        if (!prompt.trim()) {
            setError('Please enter a prompt')
            setSnackbarOpen(true)
            return
        }

        setGenerating(true)
        try {
            const formData = {
                prompt: prompt.trim()
            }
            
            if (referenceImage) {
                formData.reference_image = referenceImage
            }

            const response = await api.generateImage(formData)
            console.log('Image generated:', response.data)
            
            setSuccess('Image generated successfully!')
            setSnackbarOpen(true)
            
            // Reset form
            setPrompt('')
            setReferenceImage(null)
            setReferenceImagePreview(null)
            setShowGenerateModal(false)
            
            // Refresh images list
            await fetchImages()
        } catch (err) {
            console.error('Failed to generate image:', err)
            const errorMessage = err.response?.data?.status?.message || 'Failed to generate image'
            setError(errorMessage)
            setSnackbarOpen(true)
        } finally {
            setGenerating(false)
        }
    }

    const handleDeleteImage = async (imageId) => {
        if (!window.confirm('Are you sure you want to delete this image?')) {
            return
        }

        try {
            await api.deleteImage(imageId)
            setSuccess('Image deleted successfully!')
            setSnackbarOpen(true)
            
            // Remove from local state
            setImages(images.filter(img => img.id !== imageId))
        } catch (err) {
            console.error('Failed to delete image:', err)
            const errorMessage = err.response?.data?.status?.message || 'Failed to delete image'
            setError(errorMessage)
            setSnackbarOpen(true)
        }
    }

    const handleReferenceImageChange = (event) => {
        const file = event.target.files[0]
        if (file) {
            // Validate file size (max 10MB)
            if (file.size > 10 * 1024 * 1024) {
                setError('Image file size must be less than 10MB')
                setSnackbarOpen(true)
                return
            }

            // Validate file type
            if (!file.type.startsWith('image/')) {
                setError('File must be an image')
                setSnackbarOpen(true)
                return
            }

            setReferenceImage(file)
            
            // Create preview
            const reader = new FileReader()
            reader.onloadend = () => {
                setReferenceImagePreview(reader.result)
            }
            reader.readAsDataURL(file)
        }
    }

    const handleCloseModal = () => {
        setShowGenerateModal(false)
        setPrompt('')
        setReferenceImage(null)
        setReferenceImagePreview(null)
    }

    const memoizedImages = useMemo(() => images, [images])

    return (
        <Box sx={{ maxWidth: 1200, mx: 'auto', p: 3 }}>
            {/* Header */}
            <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
                <Typography variant="h4" component="h1" fontWeight="bold" gutterBottom>
                AI Generated Images
                </Typography>
                {!loading && memoizedImages?.length !== 0 && <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={() => setShowGenerateModal(true)}
                    size="large">
                    Generate Image
                </Button>}
            </Stack>

            <Divider sx={{ mb: 3 }} />

            {/* Loading State */}
            {loading && (
                <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
                    <CircularProgress size={60} />
                </Box>
            )}

            {/* Images Grid */}
            {!loading && memoizedImages?.length > 0 && (
                <Fade in timeout={600}>
                    {/* <Grid container spacing={3}>
                        {memoizedImages.map((image) => (
                            <Grid item xs={12} sm={6} md={4} key={image.id}>
                                <Card elevation={3} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                                    <CardMedia
                                        component="img"
                                        image={image.image_url}
                                        alt={image.prompt}
                                        sx={{ 
                                            height: 300, 
                                            objectFit: 'cover',
                                            cursor: 'pointer'
                                        }}
                                        onClick={() => window.open(image.image_url, '_blank')}
                                    />
                                    <CardContent sx={{ flexGrow: 1 }}>
                                        <Typography variant="body2" color="text.secondary" gutterBottom>
                                            <Tooltip title={image.prompt}>
                                                <Typography variant="body2" color="text.secondary" gutterBottom>
                                                    {image.prompt}
                                                </Typography>
                                            </Tooltip>
                                        </Typography>
                                        <Stack direction="row" spacing={1} mt={1}>
                                            {image.is_variant && (
                                                <Chip label="Variant" size="small" color="primary" />
                                            )}
                                            {image.style && (
                                                <Chip label={image.style} size="small" color="secondary" />
                                            )}
                                        </Stack>
                                        <Typography variant="caption" color="text.disabled" display="block" mt={1}>
                                            {new Date(image.created_at).toLocaleDateString()}
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <IconButton
                                            color="error"
                                            onClick={() => handleDeleteImage(image.id)}
                                            size="small"
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))}
                    </Grid> */}
                    <ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}>
                        {memoizedImages.map((item) => (
                            <ImageListItem key={item.id}>
                            <img
                                onClick={() => window.open(item.image_url, '_blank')}
                                srcSet={`${item.image_url}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                                src={`${item.image_url}?w=164&h=164&fit=crop&auto=format`}
                                alt={item.prompt}
                                loading="lazy"
                            />
                            <ImageListItemBar
                                title={item.prompt}
                                subtitle={<span>Created at: {new Date(item.created_at).toLocaleDateString()}</span>}
                                actionIcon={
                                    <IconButton onClick={() => handleDeleteImage(item.id)} color="error">
                                        <DeleteIcon />
                                    </IconButton>
                                }
                            />
                            </ImageListItem>
                        ))}
                    </ImageList>
                </Fade>
            )}

            {/* Empty State */}
            {!loading && memoizedImages?.length === 0 && (
                <Paper 
                    elevation={0} 
                    sx={{ 
                        p: 8, 
                        textAlign: 'center',
                        bgcolor: 'background.default',
                        border: '2px dashed',
                        borderColor: 'divider'
                    }}
                >
                    <ImageIcon sx={{ fontSize: 80, color: 'text.disabled', mb: 2 }} />
                    <Typography variant="h6" color="text.secondary" gutterBottom>
                        No images found
                    </Typography>
                    <Typography variant="body2" color="text.disabled" mb={3}>
                        Generate your first AI image to get started
                    </Typography>
                    <Button 
                        variant="contained" 
                        color="primary" 
                        size="large"
                        startIcon={<AddIcon />}
                        onClick={() => setShowGenerateModal(true)}
                    >
                        Generate Image
                    </Button>
                </Paper>
            )}

            {/* Generate Image Modal */}
            <Dialog 
                open={showGenerateModal} 
                onClose={handleCloseModal}
                maxWidth="sm"
                fullWidth
            >
                <DialogTitle>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Typography variant="h6">Generate AI Image</Typography>
                        <IconButton onClick={handleCloseModal} size="small">
                            <CloseIcon />
                        </IconButton>
                    </Stack>
                </DialogTitle>
                <DialogContent dividers>
                    <Stack spacing={3}>
                        <TextField
                            label="Image Prompt"
                            placeholder="A serene mountain landscape at sunset..."
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            multiline
                            rows={4}
                            fullWidth
                            required
                            helperText="Describe the image you want to generate"
                        />

                        <Divider>
                            <Chip label="Optional" size="small" />
                        </Divider>

                        <Box>
                            <Typography variant="subtitle2" gutterBottom>
                                Reference Image (Optional)
                            </Typography>
                            <Typography variant="caption" color="text.secondary" display="block" mb={2}>
                                Upload a reference image to influence the style (max 10MB)
                            </Typography>
                            
                            <Button
                                variant="outlined"
                                component="label"
                                startIcon={<CloudUploadIcon />}
                                fullWidth
                            >
                                {referenceImage ? 'Change Reference Image' : 'Upload Reference Image'}
                                <input
                                    type="file"
                                    hidden
                                    accept="image/*"
                                    onChange={handleReferenceImageChange}
                                />
                            </Button>

                            {referenceImagePreview && (
                                <Box mt={2} position="relative">
                                    <img 
                                        src={referenceImagePreview} 
                                        alt="Reference preview"
                                        style={{ 
                                            width: '100%', 
                                            maxHeight: '200px', 
                                            objectFit: 'contain',
                                            borderRadius: '8px'
                                        }}
                                    />
                                    <IconButton
                                        size="small"
                                        sx={{
                                            position: 'absolute',
                                            top: 8,
                                            right: 8,
                                            bgcolor: 'background.paper'
                                        }}
                                        onClick={() => {
                                            setReferenceImage(null)
                                            setReferenceImagePreview(null)
                                        }}
                                    >
                                        <CloseIcon fontSize="small" />
                                    </IconButton>
                                </Box>
                            )}
                        </Box>
                    </Stack>
                </DialogContent>
                <DialogActions sx={{ p: 2 }}>
                    <Button onClick={handleCloseModal} disabled={generating}>
                        Cancel
                    </Button>
                    <Button
                        variant="contained"
                        onClick={handleGenerateImage}
                        disabled={generating || !prompt.trim()}
                        startIcon={generating ? <CircularProgress size={20} /> : <ImageIcon />}
                    >
                        {generating ? 'Generating...' : 'Generate'}
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Snackbar for notifications */}
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={() => setSnackbarOpen(false)}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert
                    onClose={() => setSnackbarOpen(false)}
                    severity={error ? 'error' : 'success'}
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    {error || success}
                </Alert>
            </Snackbar>
        </Box>
    )
}

export default Images 