import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, Card, CardMedia, CardContent, InputBase, Paper, IconButton } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
// import categoryImage1 from '../../assets/images/categoryImage1.png'; // Example image
// import categoryImage2 from '../../assets/images/categoryImage2.png'; // Example image
import courImage from '../../assets/images/categories.png'; // Import the image
import { ListAllCategories } from '../../services/CategoriesServices/CategoriesServices';
import { Spinner } from "react-bootstrap";
import "../../assets/styles/CoursesCard.css";

const CategoriesPage = () => {
  
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const categoryCount = categories.length;

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await ListAllCategories();
        console.log('Courses Response:', response);
        setCategories(response);
      } catch (error) {
        console.error("Erreur lors de la récupération des cours:", error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchCategories();
    // Le tableau de dépendances doit être vide si vous souhaitez exécuter l'effet une seule fois
  }, []); 

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
        {loading ? <Spinner /> : (
            categories.map((category) => {
              console.log(category.image); // Vérifie si l'URL est bien définie
              return (
                <Grid item xs={12} sm={6} md={3} key={category.id}>
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }} className='coursesCard'>
                  <CardMedia
                    component="img"
                    height="140"
                    image={category.image ? category.image : 'https://via.placeholder.com/150'}
                    alt={category.name}
                    sx={{ objectFit: 'cover' }}
                  />
                  <CardContent sx={{ flexGrow: 1 }} style={{textAlign: "left"}}>
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="div"
                      sx={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '10px' }}
                    >
                      {category.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ fontSize: '12px', marginBottom: '10px' }}>
                      {category.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              )
            }
          )
          )}
        </Grid>
      </Box>
    </Box>
  );
};

export default CategoriesPage;
