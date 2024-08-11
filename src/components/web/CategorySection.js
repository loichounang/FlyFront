// src/components/CategorySection.js

import React from 'react';
import { Typography, Button, Box } from '@mui/material';
import businessIcon from '../../assets/images/business-icon.png'; // Assurez-vous que le chemin est correct
import marketingIcon from '../../assets/images/marketing-icon.png'; // Assurez-vous que le chemin est correct
import socialIcon from '../../assets/images/social-icon.png'; // Assurez-vous que le chemin est correct
import flypoolIcon from '../../assets/images/flypool-Icon.png'; // Assurez-vous que le chemin est correct

const CategorySection = () => {
  return (
    <Box sx={{ padding: '20px', backgroundColor: '#f9f9f9', overflow: 'hidden' }}>
      {/* Section des catégories */}
      <Typography variant="h2" sx={{ fontSize: '24px', color: '#0a0d6c', fontWeight: 'bold', marginBottom: '20px', textAlign: 'center' }}>
        CATEGORIES
      </Typography>
      <Typography variant="body1" sx={{ fontSize: '16px', color: '#0a0d6c', marginBottom: '40px', textAlign: 'center' }}>
        Découvrez nos meilleures catégories de cours
      </Typography>
      <Box className="category-scroll">
        <Box className="category-scroll-inner">
          <Box sx={{ display: 'inline-block', width: '250px', textAlign: 'center', margin: '0 10px' }}>
            <Box
              sx={{
                display: 'inline-block',
                backgroundColor: '#e8effa',
                borderRadius: '50%',
                padding: '10px',
                marginBottom: '10px',
              }}
            >
              <Box component="img" src={flypoolIcon} alt="Flypool.me" sx={{ height: '60px', width: '60px', borderRadius: '50%' }} />
            </Box>
            <Typography variant="h6" sx={{ fontSize: '16px', fontWeight: 'bold' }}>Flypool.me</Typography>
            <Typography variant="body2" sx={{ marginBottom: '10px' }}>4 cours</Typography>
            <Button variant="contained" sx={{ backgroundColor: '#66bfbe', color: 'white', '&:hover': { backgroundColor: '#55a4a3' } }}>
              PARCOURIR
            </Button>
          </Box>
          <Box sx={{ display: 'inline-block', width: '250px', textAlign: 'center', margin: '0 10px' }}>
            <Box
              sx={{
                display: 'inline-block',
                backgroundColor: '#e8effa',
                borderRadius: '50%',
                padding: '10px',
                marginBottom: '10px',
              }}
            >
              <Box component="img" src={businessIcon} alt="Business" sx={{ height: '60px', width: '60px', borderRadius: '50%' }} />
            </Box>
            <Typography variant="h6" sx={{ fontSize: '16px', fontWeight: 'bold' }}>Business (en anglais)</Typography>
            <Typography variant="body2" sx={{ marginBottom: '10px' }}>5 cours</Typography>
            <Button variant="contained" sx={{ backgroundColor: '#66bfbe', color: 'white', '&:hover': { backgroundColor: '#55a4a3' } }}>
              APPRENDRE PLUS
            </Button>
          </Box>
          <Box sx={{ display: 'inline-block', width: '250px', textAlign: 'center', margin: '0 10px' }}>
            <Box
              sx={{
                display: 'inline-block',
                backgroundColor: '#e8effa',
                borderRadius: '50%',
                padding: '10px',
                marginBottom: '10px',
              }}
            >
              <Box component="img" src={marketingIcon} alt="Marketing" sx={{ height: '60px', width: '60px', borderRadius: '50%' }} />
            </Box>
            <Typography variant="h6" sx={{ fontSize: '16px', fontWeight: 'bold' }}>Marketing</Typography>
            <Typography variant="body2" sx={{ marginBottom: '10px' }}>4 cours</Typography>
            <Button variant="contained" sx={{ backgroundColor: '#66bfbe', color: 'white', '&:hover': { backgroundColor: '#55a4a3' } }}>
              PARCOURIR
            </Button>
          </Box>
          <Box sx={{ display: 'inline-block', width: '250px', textAlign: 'center', margin: '0 10px' }}>
            <Box
              sx={{
                display: 'inline-block',
                backgroundColor: '#e8effa',
                borderRadius: '50%',
                padding: '10px',
                marginBottom: '10px',
              }}
            >
              <Box component="img" src={socialIcon} alt="Social Network" sx={{ height: '60px', width: '60px', borderRadius: '50%' }} />
            </Box>
            <Typography variant="h6" sx={{ fontSize: '16px', fontWeight: 'bold' }}>Réseau social</Typography>
            <Typography variant="body2" sx={{ marginBottom: '10px' }}>2 cours</Typography>
            <Button variant="contained" sx={{ backgroundColor: '#66bfbe', color: 'white', '&:hover': { backgroundColor: '#55a4a3' } }}>
              PARCOURIR
            </Button>
          </Box>
          {/* Duplication pour le défilement continu */}
          <Box sx={{ display: 'inline-block', width: '250px', textAlign: 'center', margin: '0 10px' }}>
            <Box
              sx={{
                display: 'inline-block',
                backgroundColor: '#e8effa',
                borderRadius: '50%',
                padding: '10px',
                marginBottom: '10px',
              }}
            >
              <Box component="img" src={flypoolIcon} alt="Flypool.me" sx={{ height: '60px', width: '60px', borderRadius: '50%' }} />
            </Box>
            <Typography variant="h6" sx={{ fontSize: '16px', fontWeight: 'bold' }}>Flypool.me</Typography>
            <Typography variant="body2" sx={{ marginBottom: '10px' }}>4 cours</Typography>
            <Button variant="contained" sx={{ backgroundColor: '#66bfbe', color: 'white', '&:hover': { backgroundColor: '#55a4a3' } }}>
              PARCOURIR
            </Button>
          </Box>
          <Box sx={{ display: 'inline-block', width: '250px', textAlign: 'center', margin: '0 10px' }}>
            <Box
              sx={{
                display: 'inline-block',
                backgroundColor: '#e8effa',
                borderRadius: '50%',
                padding: '10px',
                marginBottom: '10px',
              }}
            >
              <Box component="img" src={businessIcon} alt="Business" sx={{ height: '60px', width: '60px', borderRadius: '50%' }} />
            </Box>
            <Typography variant="h6" sx={{ fontSize: '16px', fontWeight: 'bold' }}>Business (en anglais)</Typography>
            <Typography variant="body2" sx={{ marginBottom: '10px' }}>5 cours</Typography>
            <Button variant="contained" sx={{ backgroundColor: '#66bfbe', color: 'white', '&:hover': { backgroundColor: '#55a4a3' } }}>
              APPRENDRE PLUS
            </Button>
          </Box>
          <Box sx={{ display: 'inline-block', width: '250px', textAlign: 'center', margin: '0 10px' }}>
            <Box
              sx={{
                display: 'inline-block',
                backgroundColor: '#e8effa',
                borderRadius: '50%',
                padding: '10px',
                marginBottom: '10px',
              }}
            >
              <Box component="img" src={marketingIcon} alt="Marketing" sx={{ height: '60px', width: '60px', borderRadius: '50%' }} />
            </Box>
            <Typography variant="h6" sx={{ fontSize: '16px', fontWeight: 'bold' }}>Marketing</Typography>
            <Typography variant="body2" sx={{ marginBottom: '10px' }}>4 cours</Typography>
            <Button variant="contained" sx={{ backgroundColor: '#66bfbe', color: 'white', '&:hover': { backgroundColor: '#55a4a3' } }}>
              PARCOURIR
            </Button>
          </Box>
          <Box sx={{ display: 'inline-block', width: '250px', textAlign: 'center', margin: '0 10px' }}>
            <Box
              sx={{
                display: 'inline-block',
                backgroundColor: '#e8effa',
                borderRadius: '50%',
                padding: '10px',
                marginBottom: '10px',
              }}
            >
              <Box component="img" src={socialIcon} alt="Social Network" sx={{ height: '60px', width: '60px', borderRadius: '50%' }} />
            </Box>
            <Typography variant="h6" sx={{ fontSize: '16px', fontWeight: 'bold' }}>Réseau social</Typography>
            <Typography variant="body2" sx={{ marginBottom: '10px' }}>2 cours</Typography>
            <Button variant="contained" sx={{ backgroundColor: '#66bfbe', color: 'white', '&:hover': { backgroundColor: '#55a4a3' } }}>
              PARCOURIR
            </Button>
          </Box>
        </Box>
      </Box>

    </Box>
  );
};

export default CategorySection;
