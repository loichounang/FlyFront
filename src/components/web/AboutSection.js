import React from 'react';
import { Box, Typography, Grid } from '@mui/material';
import { GroupWork, Stars, Public } from '@mui/icons-material';
import myMoocLogo from '../../assets/images/logo.png'; // Make sure this path is correct

const AboutSection = () => {
  return (
    <Box sx={{ padding: '40px', backgroundColor: '#e1eaea' }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <Typography variant="h4" sx={{ fontWeight: 'bold', marginBottom: '20px' }}>
            qu'est ce que FlyAcademy ?
          </Typography>
          <Typography variant="body1" paragraph>
            My Mooc est le leader francophone dans la recherche d’une formation en ligne gratuite et certifiante. Nous référençons plus de 10 000 MOOC (en français, anglais et chinois) issus de 550 établissements prestigieux.
          </Typography>
          <Typography variant="body1" paragraph>
            À la manière de Tripadvisor pour trouver un hôtel, vous pouvez consulter plusieurs dizaines de milliers d’avis qui vous offriront l’opportunité de trouver une formation qui vous correspond.
          </Typography>
          <Typography variant="body1" paragraph>
            Gestion de projet, informatique, apprentissage de langues étrangères... découvrez notre catalogue complet de ressources en ligne dans les onglets « MOOC » et « parcours ».
          </Typography>
          <Typography variant="body1" paragraph>
            Centralisez votre expérience d’apprentissage en ligne et retrouvez facilement au sein d’une seule plateforme l’ensemble des ressources en ligne qui vous aident à vous former gratuitement.
          </Typography>
        </Grid>
        <Grid item xs={12} md={4} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Box
            component="img"
            src={myMoocLogo}
            alt="My Mooc Logo"
            sx={{ width: '80%', height: 'auto', objectFit: 'contain' }}
          />
        </Grid>
      </Grid>
      <Box sx={{ marginTop: '40px' }}>
        <Typography variant="h5" sx={{ fontWeight: 'bold', marginBottom: '20px' }}>
          
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4} sx={{ textAlign: 'center' }}>
            <GroupWork sx={{ color: '#0a0d6c', fontSize: 50 }} />
            <Typography variant="body1" sx={{ marginTop: '10px' }}>
              Plusieurs milliers de formations en ligne gratuites et certifiantes disponibles à tout moment.
            </Typography>
          </Grid>
          <Grid item xs={12} md={4} sx={{ textAlign: 'center' }}>
            <Stars sx={{ color: '#55a4a3', fontSize: 50 }} />
            <Typography variant="body1" sx={{ marginTop: '10px' }}>
              Le leader francophone dans la recherche d’un MOOC avec 50 000 avis consultables.
            </Typography>
          </Grid>
          <Grid item xs={12} md={4} sx={{ textAlign: 'center' }}>
            <Public sx={{ color: '#0a0d6c', fontSize: 50 }} />
            <Typography variant="body1" sx={{ marginTop: '10px' }}>
              Une plateforme disponible en 5 langues et accessible gratuitement sur tous supports.
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default AboutSection;
