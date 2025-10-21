import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
  Stack,
  Divider,
  Chip,
  Alert,
  Snackbar,
  CircularProgress,
  Fade,
  Container
} from '@mui/material';
import {
  Email as EmailIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon,
  Schedule as ScheduleIcon,
  Send as SendIcon,
  CheckCircle as CheckCircleIcon,
  Support as SupportIcon,
  Business as BusinessIcon,
  Language as LanguageIcon
} from '@mui/icons-material';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [success, setSuccess] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setSuccess('Thank you for your message! We\'ll get back to you soon.');
      setSnackbarOpen(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setLoading(false);
    }, 2000);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const contactInfo = [
    {
      icon: <EmailIcon />,
      title: 'Email',
      content: 'support@outsider.com',
      description: 'Send us an email anytime'
    },
    {
      icon: <PhoneIcon />,
      title: 'Phone',
      content: '+1 (555) 123-4567',
      description: 'Mon-Fri 9am-6pm EST'
    },
    {
      icon: <LocationIcon />,
      title: 'Office',
      content: '123 Tech Street, Suite 100',
      description: 'San Francisco, CA 94105'
    },
    {
      icon: <ScheduleIcon />,
      title: 'Business Hours',
      content: 'Monday - Friday',
      description: '9:00 AM - 6:00 PM EST'
    }
  ];

  const supportTopics = [
    'Account Issues',
    'Technical Support',
    'Billing Questions',
    'Feature Requests',
    'Bug Reports',
    'General Inquiries'
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Fade in timeout={600}>
        <Box>
          {/* Header Section */}
          <Box textAlign="center" mb={6}>
            <Typography variant="h4" component="h1" fontWeight="bold" gutterBottom>
              Contact Us
            </Typography>
            <Typography variant="h6" color="text.secondary" maxWidth="600px" mx="auto">
              We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {/* Contact Information */}
            <Grid item size={{ xs: 12, md: 4 }}>
              <Stack spacing={3}>
                <Card elevation={2}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom color="primary">
                      Get in Touch
                    </Typography>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      Have questions? We're here to help! Reach out to us through any of the channels below.
                    </Typography>
                  </CardContent>
                </Card>

                {contactInfo.map((info, index) => (
                  <Card key={index} elevation={1} sx={{ p: 2 }}>
                    <Stack direction="row" spacing={2} alignItems="flex-start">
                      <Box
                        sx={{
                          bgcolor: 'primary.main',
                          color: 'white',
                          borderRadius: '50%',
                          p: 1,
                          minWidth: 40,
                          height: 40,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        {info.icon}
                      </Box>
                      <Box>
                        <Typography variant="subtitle1" fontWeight="bold">
                          {info.title}
                        </Typography>
                        <Typography variant="body2" color="primary" gutterBottom>
                          {info.content}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {info.description}
                        </Typography>
                      </Box>
                    </Stack>
                  </Card>
                ))}

                {/* Support Topics */}
                <Card elevation={1}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom color="primary">
                      <SupportIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                      Support Topics
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                      {supportTopics.map((topic, index) => (
                        <Chip
                          key={index}
                          label={topic}
                          size="small"
                          variant="outlined"
                          color="primary"
                        />
                      ))}
                    </Box>
                  </CardContent>
                </Card>
              </Stack>
            </Grid>

            {/* Contact Form */}
            <Grid item size={{ xs: 12, md: 8 }}>
              <Card elevation={3}>
                <CardContent sx={{ p: 4 }}>
                  <Typography variant="h5" gutterBottom color="primary">
                    Send us a Message
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    Fill out the form below and we'll get back to you within 24 hours.
                  </Typography>

                  <Divider sx={{ my: 3 }} />

                  <Box component="form" onSubmit={handleSubmit}>
                    <Grid container spacing={3}>
                      <Grid item size={{ xs: 12, sm: 6 }}>
                        <TextField
                          fullWidth
                          label="Your Name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          variant="outlined"
                        />
                      </Grid>
                      <Grid item size={{ xs: 12, sm: 6 }}>
                        <TextField
                          fullWidth
                          label="Email Address"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          variant="outlined"
                        />
                      </Grid>
                      <Grid item size={{ xs: 12 }}>
                        <TextField
                          fullWidth
                          label="Subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleInputChange}
                          required
                          variant="outlined"
                        />
                      </Grid>
                      <Grid item size={{ xs: 12 }}>
                        <TextField
                          fullWidth
                          label="Message"
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          required
                          multiline
                          rows={6}
                          variant="outlined"
                          placeholder="Tell us how we can help you..."
                        />
                      </Grid>
                    </Grid>

                    <Box sx={{ mt: 4, textAlign: 'right' }}>
                      <Button
                        type="submit"
                        variant="contained"
                        size="large"
                        startIcon={loading ? <CircularProgress size={20} /> : <SendIcon />}
                        disabled={loading}
                        sx={{ px: 4 }}
                      >
                        {loading ? 'Sending...' : 'Send Message'}
                      </Button>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* FAQ Section */}
          <Box mt={6}>
            <Typography variant="h4" component="h2" textAlign="center" gutterBottom color="primary">
              Frequently Asked Questions
            </Typography>
            <Grid container spacing={3} mt={2}>
              {[
                {
                  question: "How quickly do you respond to inquiries?",
                  answer: "We typically respond to all inquiries within 24 hours during business days."
                },
                {
                  question: "Do you offer phone support?",
                  answer: "Yes, we provide phone support during our business hours (9 AM - 6 PM EST, Monday-Friday)."
                },
                {
                  question: "Can I schedule a demo or consultation?",
                  answer: "Absolutely! Please mention in your message that you'd like to schedule a demo and we'll arrange a convenient time."
                },
                {
                  question: "What if I have a technical issue?",
                  answer: "For technical issues, please include as much detail as possible about the problem and we'll prioritize your request."
                }
              ].map((faq, index) => (
                <Grid item size={{ xs: 12, sm: 6 }} key={index}>
                  <Paper elevation={1} sx={{ p: 3, height: '100%' }}>
                    <Typography variant="h6" gutterBottom color="primary">
                      {faq.question}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {faq.answer}
                    </Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Box>

          {/* Footer CTA */}
          <Box mt={6} textAlign="center">
            <Paper
              elevation={2}
              sx={{
                p: 4,
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white'
              }}
            >
              <Typography variant="h5" gutterBottom>
                Ready to Get Started?
              </Typography>
              <Typography variant="body1" paragraph>
                Join thousands of users who trust our platform for their needs.
              </Typography>
              <Button
                variant="contained"
                size="large"
                sx={{
                  bgcolor: 'white',
                  color: 'primary.main',
                  '&:hover': {
                    bgcolor: 'grey.100'
                  }
                }}
              >
                Learn More
              </Button>
            </Paper>
          </Box>
        </Box>
      </Fade>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="success"
          variant="filled"
          icon={<CheckCircleIcon />}
        >
          {success}
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default Contact; 