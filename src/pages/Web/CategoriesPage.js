import React from 'react';
import { Box, Typography, Grid, Card, CardMedia, CardContent, InputBase, Paper, IconButton } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import categoryImage1 from '../../assets/images/categoryImage1.png'; // Example image
import categoryImage2 from '../../assets/images/categoryImage2.png'; // Example image
import courImage from '../../assets/images/categories.png'; // Import the image

const categories = [
  {
    id: 1,
    image: categoryImage1,
    title: 'Développement Web',
    description: 'Apprenez les bases du développement web, HTML, CSS, et JavaScript.',
  },
  {
    id: 2,
    image: categoryImage2,
    title: 'Développement Mobile',
    description: 'Créez des applications mobiles pour Android et iOS.',
  },
  {
    id: 3,
    image: categoryImage1,
    title: 'Data Science',
    description: 'Analysez des données et apprenez le machine learning.',
  },
  {
    id: 4,
    image: categoryImage2,
    title: 'Cybersécurité',
    description: 'Protégez les systèmes informatiques contre les cybermenaces.',
  },
  // Add more categories as needed
];

const CategoriesPage = () => {
  const categoryCount = categories.length;

  return (
    <Box sx={{ backgroundColor: '#e1eaea' }}>
      <Box sx={{ position: 'relative', width: '100%', height: '400px' }}>
        <Box
          component="img"
          src={courImage}
          alt="Categories Banner"
          sx={{
            width: '100%',
            height: '400px', // Set the image height to 400px
            objectFit: 'cover',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            top: '50%', // Center vertically
            left: '50%',
            transform: 'translate(-50%, -50%)', // Center horizontally and vertically
            textAlign: 'center',
            backgroundColor: 'rgba(255, 255, 255, 0.7)',
            padding: '10px 20px',
            borderRadius: '8px',
          }}
        >
          <Typography
            variant="h2"
            sx={{
              fontSize: '24px',
              color: '#0a0d6c',
              fontWeight: 'bold',
            }}
          >
            Toutes les Catégories ({categoryCount})
          </Typography>
          <Typography
            variant="h6"
            sx={{
              fontSize: '18px',
              color: '#0a0d6c',
              fontWeight: 'normal',
              marginTop: '10px',
            }}
          >
            Explorez nos meilleures catégories de cours
          </Typography>
        </Box>
      </Box>
      <Box sx={{ padding: '40px', backgroundColor: '#f9f9f9' }}>
        <Paper
          component="form"
          sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: '100%', marginBottom: '20px' }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Rechercher une categorie"
            inputProps={{ 'aria-label': 'Rechercher une categorie' }}
          />
          <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
            <SearchIcon />
          </IconButton>
        </Paper>
        <Grid container spacing={4}>
          {categories.map((category) => (
            <Grid item xs={12} sm={6} md={3} key={category.id}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardMedia
                  component="img"
                  height="140"
                  image={category.image}
                  alt={category.title}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    sx={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '10px' }}
                  >
                    {category.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ fontSize: '12px', marginBottom: '10px' }}>
                    {category.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default CategoriesPage;
