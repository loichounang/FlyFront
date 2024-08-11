// src/pages/HomePage.js

import React from 'react';
import { Box } from '@mui/material';
import Content from '../../components/web/Content'; // Ensure the path is correct
import Explore from '../../components/web/Explore';
import CategorySection from '../../components/web/CategorySection';
import RecommendedCourses from '../../components/web/RecommendedCourses';
import CommunitySection from '../../components/web/CommunitySection';
import AboutSection from '../../components/web/AboutSection';

const HomePage = () => {
  return (
    <Box sx={{ fontFamily: 'Poppins, sans-serif' }}>
      
      <Content />
      <AboutSection />
      <CategorySection />
      <Explore />
      <RecommendedCourses />
      <CommunitySection />

    </Box>
  );
};

export default HomePage;
