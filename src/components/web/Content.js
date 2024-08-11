import React from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';
import mainImage from '../../assets/images/main.jpg';

const Content = () => {
  return (
    <div>
      {/* Main Image with Overlay */}
      <Box
  sx={{
    position: 'relative',
    width: '100%',
    overflow: 'hidden',
    marginTop: { xs: '98px', md: '0' }, // Add margin top for mobile screens
    '& img': {
      width: '100%',
      height: 'auto',
      objectFit: 'cover',
      maxHeight: '670px',
    },
  }}
>
  <img src={mainImage} alt="Main" />
  <Box
    sx={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      color: '#ffffff',
      textAlign: 'center',
      padding: '20px',
      background: 'rgba(0, 0, 0, 0.5)',
      borderRadius: '10px',
      fontFamily: 'Poppins, sans-serif', // Apply Poppins font
    }}
  >
    <Typography variant="h1" sx={{ fontSize: { xs: '15px', md: '24px' }, marginBottom: '20px' }}>
      DÉVELOPPEZ GRATUITEMENT VOS COMPÉTENCES EN LIGNE
    </Typography>
    <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: '30px' }}>
      <TextField
        variant="outlined"
        placeholder="Que souhaitez-vous apprendre ?"
        sx={{
          backgroundColor: '#ffffff', // Set background color to white
          borderRadius: '5px 0 0 5px',
          '& .MuiOutlinedInput-root': {
            borderRadius: '5px 0 0 5px',
            '& fieldset': { border: 'none' }, // Remove border
          },
          '& .MuiInputBase-input': {
            padding: '10px', // Adjust padding if needed
          },
          fontFamily: 'Poppins, sans-serif', // Apply Poppins font
          width: { xs: '200px', sm: '300px', md: '400px' }, // Responsive width
        }}
      />
      <Button
        variant="contained"
        sx={{
          backgroundColor: '#66bfbe',
          color: 'white',
          borderRadius: '0 5px 5px 0',
          '&:hover': { backgroundColor: '#55a4a3' },
          fontFamily: 'Poppins, sans-serif', // Apply Poppins font
          padding: { xs: '6px 10px', md: '10px 16px' }, // Responsive padding
        }}
      >
        RECHERCHER
      </Button>
    </Box>
    <Button
      variant="contained"
      sx={{
        backgroundColor: '#13017c',
        color: 'white',
        borderRadius: '5px',
        '&:hover': { backgroundColor: '#0a0d6c' },
        fontFamily: 'Poppins, sans-serif', // Apply Poppins font
        padding: { xs: '6px 10px', md: '10px 16px' }, // Responsive padding
      }}
    >
      REJOINDRE VOTRE COMMUNAUTE
    </Button>
  </Box>
</Box>

      {/* Content Container */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          justifyContent: 'space-between',
          margin: '20px',
          fontFamily: 'Poppins, sans-serif',
        }}
      >
        {/* Video Container */}
        <Box
          sx={{
            flex: 1,
            marginBottom: { xs: '20px', md: 0 },
            marginRight: { md: '20px' },
            border: '2px solid #55a4a3',
            borderRadius: '10px',
            overflow: 'hidden',
          }}
        >
          <iframe
            src="https://www.youtube.com/embed/Okg7BS5lUeI"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{ width: '100%', height: '315px' }}
          ></iframe>
        </Box>
        {/* Description Container */}
        <Box sx={{ flex: 1 }}>
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: '20px', md: '24px' },
              fontWeight: 'bold', // Make text bold
              marginBottom: '10px',
            }}
          >
            Mot du PDG de FlyPool
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: '20px' }}>
            Mathieu Butthey, le PDG de FlyPool, vous dévoile les clés de son succès. Découvrez la vision unique de FlyPool, la façon dont il révolutionne le voyage et les stratégies qui le distinguent des autres applications de covoiturage. Rejoignez-nous dans cette conversation perspicace où Mathieu discute des défis, de l'expérience des ambassadeurs et des étapes dynamiques vers l'expansion de notre présence mondiale.
          </Typography>
          <Button
            variant="contained"
            sx={{
              backgroundColor: '#13017c',
              color: 'white',
              borderRadius: '5px',
              '&:hover': { backgroundColor: '#0a0d6c' },
              fontFamily: 'Poppins, sans-serif', // Apply Poppins font
              padding: { xs: '6px 10px', md: '10px 16px' }, // Responsive padding
            }}
          >
            Demarrer
          </Button>
        </Box>
      </Box>
    </div>
  );
};

export default Content;
