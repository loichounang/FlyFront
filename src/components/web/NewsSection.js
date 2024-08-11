import React from 'react';
import { Box, Typography, Link } from '@mui/material';

const NewsSection = () => {
  return (
    <Box sx={{ marginTop: '40px' }}>
      <Typography variant="h4" sx={{ margin: '0', fontSize: '24px' }}>
        OUR NEWS & BLOGS
      </Typography>
      <Typography variant="h6" sx={{ margin: '5px 0', fontSize: '18px', color: '#666' }}>
        Latests News & Blogs
      </Typography>
      <Link href="#" sx={{ color: '#007bff', fontWeight: 'bold' }}>
        VIEW ALL POSTS
      </Link>
    </Box>
  );
};

export default NewsSection;
