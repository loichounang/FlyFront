// src/components/CommunitySection.js

import React from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import communityImage from '../../assets/images/communityImage.png'; // Make sure this path is correct

const CommunitySection = () => {
  return (
    <Box sx={{ backgroundColor: '#f5f5f5', padding: '40px 0' }}>
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: 'center',
            gap: '20px',
          }}
        >
          <Box
            component="img"
            src={communityImage}
            alt="Community"
            sx={{
              width: { xs: '100%', md: '50%' },
              borderRadius: '8px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            }}
          />
          <Box sx={{ textAlign: { xs: 'center', md: 'left' }, maxWidth: '500px' }}>
            <Typography variant="h4" sx={{ fontWeight: 'bold', marginBottom: '20px' }}>
              Partagez vos expériences avec notre communauté
            </Typography>
            <Typography variant="body1" sx={{ marginBottom: '20px' }}>
              Vous pouvez partager vos expériences, vos incompréhensions et vos défis avec la communauté à laquelle vous appartenez. Rejoignez-nous et faites partie de la conversation !
            </Typography>
            <Button
              variant="contained"
              size="large"
              href="/community"
              sx={{
                backgroundColor: '#55a4a3',
                '&:hover': {
                  backgroundColor: '#46938b', // Slightly darker shade for hover state
                },
              }}
            >
              Accéder à la communauté
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default CommunitySection;
