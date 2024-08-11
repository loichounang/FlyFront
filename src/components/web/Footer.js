import React from 'react';
import { Box, Typography, Button, IconButton, Link, Grid } from '@mui/material';
import { Facebook, Twitter, Instagram, LinkedIn } from '@mui/icons-material';
import flypoolLogo from '../../assets/images/flypool.png';

const Footer = () => {
  return (
    <Box component="footer" sx={{ backgroundColor: '#0a0d6c', color: '#fff', padding: '40px 20px', marginTop: '30px' }}>
      <Grid container spacing={4}>
        <Grid item xs={12} sm={6} md={3}>
          <Box sx={{
            textAlign: { xs: 'justify', sm: 'left' },
            display: { xs: 'flex', sm: 'block' },
            flexDirection: 'column',
            alignItems: 'center',
          }}>
            <Typography variant="h6" sx={{ marginBottom: '16px', fontWeight: 'bold' }}>About Us</Typography>
            <Typography variant="body2" sx={{ marginBottom: '16px', textAlign: 'justify', maxWidth: '500px',lineHeight:'px' }}>
              Nous proposons une formation professionnelle pour améliorer votre expérience en tant qu'ambassadeurs FlyPool. Explorez nos cours et passez à la vitesse supérieure.
            </Typography>
            <Button variant="contained" sx={{ backgroundColor: '#66bfbe', alignSelf: { xs: 'center', sm: 'flex-start' } }}>Démarrer</Button>
          </Box>
        </Grid>
        <Grid item xs={6} sm={6} md={3}>
          <Typography variant="h6" sx={{ marginBottom: '16px', fontWeight: 'bold' }}>Quick Links</Typography>
          <Box component="ul" sx={{ padding: 0, listStyle: 'none' }}>
            <Box component="li" sx={{ marginBottom: '8px' }}>
              <Link href="#about" color="inherit" sx={{ textDecoration: 'none' }}>Mes cours</Link>
            </Box>
            <Box component="li" sx={{ marginBottom: '8px' }}>
              <Link href="#courses" color="inherit" sx={{ textDecoration: 'none' }}>Catégories</Link>
            </Box>
            <Box component="li" sx={{ marginBottom: '8px' }}>
              <Link href="#events" color="inherit" sx={{ textDecoration: 'none' }}>Team</Link>
            </Box>
            <Box component="li" sx={{ marginBottom: '8px' }}>
              <Link href="#blog" color="inherit" sx={{ textDecoration: 'none' }}>Contact</Link>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={6} sm={6} md={3}>
          <Typography variant="h6" sx={{ marginBottom: '16px', fontWeight: 'bold' }}>Contact Us</Typography>
          <Typography variant="body2" sx={{ marginBottom: '8px' }}>
            Email: <Link href="mailto:Info@flypool.me" color="inherit" sx={{ textDecoration: 'none' }}>Info@flypool.me</Link>
          </Typography>
          <Typography variant="body2">Phone: +33 9 86 87 49 30</Typography>
        </Grid>
        <Grid
      item
      xs={12}
      sm={6}
      md={3}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: { xs: 'center', sm: 'flex-start' }, // Center on mobile, align to start on larger screens
        textAlign: { xs: 'center', sm: 'left' },
      }}
    >
      <Typography variant="h6" sx={{ marginBottom: '16px', fontWeight: 'bold' }}>
        Follow Us
      </Typography>
      <Box sx={{ marginBottom: '16px' }}>
        <img src={flypoolLogo} alt="Flypool Logo" style={{ width: '150px' }} />
      </Box>
      <Box sx={{ display: 'flex', gap: '8px', justifyContent: { xs: 'center', sm: 'flex-start' } }}>
        <IconButton href="https://facebook.com" target="_blank" rel="noopener noreferrer" sx={{ color: '#fff' }}>
          <Facebook />
        </IconButton>
        <IconButton href="https://twitter.com" target="_blank" rel="noopener noreferrer" sx={{ color: '#fff' }}>
          <Twitter />
        </IconButton>
        <IconButton href="https://instagram.com" target="_blank" rel="noopener noreferrer" sx={{ color: '#fff' }}>
          <Instagram />
        </IconButton>
        <IconButton href="https://linkedin.com" target="_blank" rel="noopener noreferrer" sx={{ color: '#fff' }}>
          <LinkedIn />
        </IconButton>
      </Box>
    </Grid>
      </Grid>
      <Box sx={{ textAlign: 'center', marginTop: '20px' }}>
        <Typography variant="body2">&copy; Copyright 2024 FLYPOOL. All rights reserved.</Typography>
      </Box>
    </Box>
  );
};

export default Footer;
