// src/components/CategorySection.js

import React, { useEffect, useState } from 'react';
import { Typography, Button, Box } from '@mui/material';
import { ListAllCategories } from '../../services/CategoriesServices/CategoriesServices';
import { Spinner } from 'react-bootstrap';


const CategorySection = () => {

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchCategories = async () => {

      try {
        const response = await ListAllCategories();
        console.log(response);
        setCategories(Array.isArray(response) ? response : []);
      } catch (error) {
        console.error("Une erreur est survenue lors de la récupération des catégories : ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);


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
          {loading ? <Spinner /> : (
            categories.map((category, index) => {
              return (
                <Box sx={{ display: 'inline-block', width: '250px', textAlign: 'center', margin: '0 10px' }} key={index}>
                  <Box
                    sx={{
                      display: 'inline-block',
                      backgroundColor: '#e8effa',
                      borderRadius: '50%',
                      padding: '10px',
                      marginBottom: '10px',
                    }}
                  >
                    <Box component="img" src={category.image} alt="Flypool.me" sx={{ height: '60px', width: '60px', borderRadius: '50%' }} />
                  </Box>
                  <Typography variant="h6" sx={{ fontSize: '16px', fontWeight: 'bold' }}>{category.name}</Typography>
                  <Typography variant="body2" sx={{ marginBottom: '10px' }}>{category.value + " cour(s)"}</Typography>
                  <Button variant="contained" sx={{ backgroundColor: '#66bfbe', color: 'white', '&:hover': { backgroundColor: '#55a4a3' } }}>
                    PARCOURIR
                  </Button>
                </Box>
              )
            })
          )}
        </Box>
      </Box>

    </Box>
  );
};

export default CategorySection;
