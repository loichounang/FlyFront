import React from 'react';
import { Grid, Box, Typography, ButtonBase } from '@mui/material';
import categoryIcon from '../../assets/images/categorie.jpeg';
import courseIcon from '../../assets/images/cours.png';

const Explore = () => {
  const handleCategoryClick = () => {
    // Handle the click event for the category section
    console.log('Category section clicked');
    // You can navigate to another page or show a modal, etc.
  };

  const handleCourseClick = () => {
    // Handle the click event for the course section
    console.log('Course section clicked');
    // You can navigate to another page or show a modal, etc.
  };

  return (
    <Box sx={{ padding: '20px' }}>
      {/* Sections additionnelles */}
      <Grid container spacing={2} sx={{ marginTop: '40px' }}>
        <Grid item xs={12} md={6}>
          <ButtonBase
            onClick={handleCategoryClick}
            sx={{
              display: 'block',
              width: '100%',
              textAlign: 'left',
              '&:hover': {
                backgroundColor: '#f1f1f1',
                boxShadow: '0px 6px 12px rgba(0, 0, 0, 0.2)',
              },
              padding: '20px',
              borderRadius: '8px',
              boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
              backgroundColor: '#ffffff',
              textDecoration: 'none',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: '20px',
              }}
            >
              <Box
                component="img"
                src={categoryIcon}
                alt="Catégories"
                sx={{ height: '80px', width: '80px', borderRadius: '8px' }}
              />
              <Box style={{ minHeight: "100px"}}>
                <Typography variant="h4" sx={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '10px' }}>
                  DÉCOUVREZ TOUTES LES CATÉGORIES
                </Typography>
                <Typography variant="body1" sx={{ fontSize: '16px', marginBottom: '20px' }}>
                  Apprenez en ligne avec nos Parcours constitués des meilleures ressources en ligne gratuites.
                </Typography>
              </Box>
            </Box>
          </ButtonBase>
        </Grid>
        <Grid item xs={12} md={6}>
          <ButtonBase
            onClick={handleCourseClick}
            sx={{
              display: 'block',
              width: '100%',
              textAlign: 'left',
              '&:hover': {
                backgroundColor: '#f1f1f1',
                boxShadow: '0px 6px 12px rgba(0, 0, 0, 0.2)',
              },
              padding: '20px',
              borderRadius: '8px',
              boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
              backgroundColor: '#f9f9f9',
              textDecoration: 'none',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: '20px',
              }}
            >
              <Box
                component="img"
                src={courseIcon}
                alt="Cours"
                sx={{ height: '80px', width: '80px', borderRadius: '8px' }}
              />
              <Box style={{ minHeight: "100px"}}>
                <Typography variant="h4" sx={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '10px' }}>
                  TOUS LES COURS DISPONIBLES
                </Typography>
                <Typography variant="body1" sx={{ fontSize: '16px', marginBottom: '20px' }}>
                  Montez en compétences sur divers sujets gratuitement en vous certifiant.
                </Typography>
              </Box>
            </Box>
          </ButtonBase>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Explore;
