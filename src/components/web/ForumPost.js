import React from 'react';
import { Box, Typography, Link } from '@mui/material';

const ForumPost = ({ image, title, date, time }) => {
  return (
    <Box sx={{
      display: 'flex',
      alignItems: 'center',
      borderBottom: '1px solid #ddd',
      paddingBottom: '20px',
      marginBottom: '20px',
    }}>
      <Box
        component="img"
        src={image}
        alt="Event"
        sx={{
          width: '100px',
          height: '100px',
          objectFit: 'cover',
          borderRadius: '8px',
          marginRight: '20px',
        }}
      />
      <Box>
        <Typography variant="h6" sx={{ margin: '0 0 10px 0', fontSize: '18px' }}>
          {title}
        </Typography>
        <Typography variant="body2" sx={{ color: '#666' }}>
          {date} - {time}
        </Typography>
        <Link href="#" sx={{ color: '#007bff', fontWeight: 'bold' }}>
          VIEW SUBJECT
        </Link>
      </Box>
    </Box>
  );
};

export default ForumPost;
