import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Paper,
  Stack,
  Chip,
  Avatar,
  Container,
  Divider,
  Fade,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  Business as BusinessIcon,
  People as PeopleIcon,
  TrendingUp as TrendingUpIcon,
  Security as SecurityIcon,
  Speed as SpeedIcon,
  Support as SupportIcon,
  Code as CodeIcon,
  Public as PublicIcon,
  Star as StarIcon,
  CheckCircle as CheckCircleIcon
} from '@mui/icons-material';

function About() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const stats = [
    { number: '10K+', label: 'Active Users', icon: <PeopleIcon /> },
    { number: '99.9%', label: 'Uptime', icon: <TrendingUpIcon /> },
    { number: '50+', label: 'Countries', icon: <PublicIcon /> },
    { number: '24/7', label: 'Support', icon: <SupportIcon /> }
  ];

  const values = [
    {
      icon: <SecurityIcon />,
      title: 'Security First',
      description: 'We prioritize the security and privacy of our users with enterprise-grade encryption and security measures.'
    },
    {
      icon: <SpeedIcon />,
      title: 'Performance',
      description: 'Our platform is built for speed and reliability, ensuring optimal performance for all users.'
    },
    {
      icon: <CodeIcon />,
      title: 'Innovation',
      description: 'We continuously innovate and improve our platform with cutting-edge technology and user feedback.'
    },
    {
      icon: <SupportIcon />,
      title: 'Support',
      description: 'Our dedicated support team is here to help you succeed with 24/7 assistance and guidance.'
    }
  ];

  const team = [
    {
      name: 'Sarah Johnson',
      role: 'CEO & Founder',
      avatar: 'SJ',
      description: 'Visionary leader with 15+ years in tech industry'
    },
    {
      name: 'Michael Chen',
      role: 'CTO',
      avatar: 'MC',
      description: 'Full-stack architect passionate about scalable solutions'
    },
    {
      name: 'Emily Rodriguez',
      role: 'Head of Design',
      avatar: 'ER',
      description: 'Creative director focused on user experience excellence'
    },
    {
      name: 'David Kim',
      role: 'Lead Developer',
      avatar: 'DK',
      description: 'Senior developer specializing in modern web technologies'
    }
  ];

  const milestones = [
    { year: '2020', event: 'Company Founded', description: 'Started with a vision to revolutionize digital communication' },
    { year: '2021', event: 'First 1K Users', description: 'Reached our first major milestone of 1,000 active users' },
    { year: '2022', event: 'Series A Funding', description: 'Secured $5M in Series A funding to accelerate growth' },
    { year: '2023', event: 'Global Expansion', description: 'Expanded operations to 20+ countries worldwide' },
    { year: '2024', event: '10K+ Users', description: 'Celebrated reaching 10,000+ active users globally' }
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Fade in timeout={600}>
        <Box>
          {/* Hero Section */}
          <Box textAlign="center" mb={8}>
            <Typography variant="h4" component="h1" fontWeight="bold" gutterBottom>
              About Outsider
            </Typography>
            <Typography variant="h5" color="text.secondary" maxWidth="800px" mx="auto" paragraph>
              We're building the future of digital communication, one connection at a time.
            </Typography>
            <Typography variant="body1" color="text.secondary" maxWidth="600px" mx="auto">
              Founded in 2020, Outsider has grown from a small startup to a global platform serving thousands of users worldwide. 
              Our mission is to create meaningful connections and empower communities through innovative technology.
            </Typography>
          </Box>

          {/* Stats Section */}
          <Grid container spacing={3} mb={8}>
            {stats.map((stat, index) => (
              <Grid item size={{ xs: 6, md: 3 }} key={index}>
                <Card elevation={2} sx={{ textAlign: 'center', p: 3 }}>
                  <Avatar sx={{ bgcolor: 'primary.main', mx: 'auto', mb: 2, width: 60, height: 60 }}>
                    {stat.icon}
                  </Avatar>
                  <Typography variant="h4" fontWeight="bold" color="primary" gutterBottom>
                    {stat.number}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {stat.label}
                  </Typography>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* Mission & Vision */}
          <Grid container spacing={4} mb={8}>
            <Grid item size={{ xs: 12, md: 6 }}>
              <Card elevation={3} sx={{ height: '100%' }}>
                <CardContent sx={{ p: 4 }}>
                  <Typography variant="h4" gutterBottom color="primary">
                    Our Mission
                  </Typography>
                  <Typography variant="body1" paragraph>
                    To democratize digital communication by providing accessible, secure, and innovative 
                    tools that connect people and communities across the globe.
                  </Typography>
                  <Typography variant="body1">
                    We believe that technology should bring people together, not drive them apart. 
                    Our platform is designed to foster meaningful connections and enable collaboration 
                    in ways that were never possible before.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item size={{ xs: 12, md: 6 }}>
              <Card elevation={3} sx={{ height: '100%' }}>
                <CardContent sx={{ p: 4 }}>
                  <Typography variant="h4" gutterBottom color="primary">
                    Our Vision
                  </Typography>
                  <Typography variant="body1" paragraph>
                    To become the world's leading platform for digital communication, 
                    empowering billions of users to connect, collaborate, and create together.
                  </Typography>
                  <Typography variant="body1">
                    We envision a future where geographical boundaries don't limit human connection, 
                    where technology amplifies human potential, and where every voice can be heard 
                    and every idea can flourish.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* Values Section */}
          <Box mb={8}>
            <Typography variant="h4" component="h2" textAlign="center" gutterBottom color="primary" mb={4}>
              Our Values
            </Typography>
            <Grid container spacing={3}>
              {values.map((value, index) => (
                <Grid item size={{ xs: 12 }} key={index}>
                  <Paper elevation={2} sx={{ p: 3, height: '100%', textAlign: 'center' }}>
                    <Avatar sx={{ bgcolor: 'primary.main', mx: 'auto', mb: 2, width: 60, height: 60 }}>
                      {value.icon}
                    </Avatar>
                    <Typography variant="h6" gutterBottom color="primary">
                      {value.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {value.description}
                    </Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Box>

          {/* Team Section */}
          <Box mb={8}>
            <Typography variant="h4" component="h2" textAlign="center" gutterBottom color="primary" mb={4}>
              Meet Our Team
            </Typography>
            <Grid container spacing={3}>
              {team.map((member, index) => (
                <Grid item size={{ xs: 12, sm: 6, md: 4 }} key={index}>
                  <Card elevation={2} sx={{ textAlign: 'center', p: 3 }}>
                    <Avatar sx={{ bgcolor: 'primary.main', mx: 'auto', mb: 2, width: 80, height: 80, fontSize: '1.5rem' }}>
                      {member.avatar}
                    </Avatar>
                    <Typography variant="h6" gutterBottom>
                      {member.name}
                    </Typography>
                    <Typography variant="subtitle1" color="primary" gutterBottom>
                      {member.role}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {member.description}
                    </Typography>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>

          {/* Timeline Section */}
          <Box mb={8}>
            <Typography variant="h4" component="h2" textAlign="center" gutterBottom color="primary" mb={4}>
              Our Journey
            </Typography>
            <Box sx={{ position: 'relative' }}>
              {milestones.map((milestone, index) => (
                <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
                  <Box sx={{ minWidth: 100, textAlign: 'center', mr: 3 }}>
                    <Typography variant="h6" color="primary" fontWeight="bold">
                      {milestone.year}
                    </Typography>
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <Card elevation={2}>
                      <CardContent sx={{ p: 3 }}>
                        <Typography variant="h6" gutterBottom color="primary">
                          {milestone.event}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {milestone.description}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>

          {/* Technology Stack */}
          <Box mb={8}>
            <Typography variant="h4" component="h2" textAlign="center" gutterBottom color="primary" mb={4}>
              Technology Stack
            </Typography>
            <Card elevation={3}>
              <CardContent sx={{ p: 4 }}>
                <Grid container spacing={3}>
                  <Grid item size={{ xs: 12, md: 6 }}>
                    <Typography variant="h6" gutterBottom color="primary">
                      Frontend Technologies
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
                      {['React', 'Material-UI', 'TypeScript', 'Vite', 'Tailwind CSS'].map((tech) => (
                        <Chip key={tech} label={tech} color="primary" variant="outlined" />
                      ))}
                    </Box>
                  </Grid>
                  <Grid item size={{ xs: 12, md: 6 }}>
                    <Typography variant="h6" gutterBottom color="primary">
                      Backend Technologies
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                      {['Node.js', 'Express', 'PostgreSQL', 'Redis', 'Docker'].map((tech) => (
                        <Chip key={tech} label={tech} color="secondary" variant="outlined" />
                      ))}
                    </Box>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Box>

          {/* Call to Action */}
          <Box textAlign="center">
            <Paper
              elevation={3}
              sx={{
                p: 6,
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                borderRadius: 2
              }}
            >
              <Typography variant="h4" gutterBottom>
                Ready to Join Our Community?
              </Typography>
              <Typography variant="h6" paragraph>
                Be part of the future of digital communication
              </Typography>
              <Stack direction="row" spacing={2} justifyContent="center" flexWrap="wrap">
                <Chip
                  icon={<CheckCircleIcon />}
                  label="Free to join"
                  sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: 'white' }}
                />
                <Chip
                  icon={<StarIcon />}
                  label="No setup fees"
                  sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: 'white' }}
                />
                <Chip
                  icon={<SupportIcon />}
                  label="24/7 Support"
                  sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: 'white' }}
                />
              </Stack>
            </Paper>
          </Box>
        </Box>
      </Fade>
    </Container>
  );
}

export default About; 