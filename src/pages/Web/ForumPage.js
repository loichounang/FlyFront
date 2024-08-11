import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import eventImg1 from '../../assets/images/event_img_2_1.png'; // Ensure the path is correct
import eventImg2 from '../../assets/images/event_img_2_2.png'; // Ensure the path is correct
import designImg from '../../assets/images/design_sans_titre_4_2.png'; // Ensure the path is correct

const ForumPage = () => {
  return (
    <Box sx={{ padding: '20px' }}>
      <Box sx={{ marginBottom: '20px', display: 'flex', alignItems: 'center' }}>
        <Box
          component="img"
          src={eventImg1}
          alt="Event 1"
          sx={{ width: '100px', height: '100px', marginRight: '10px' }}
        />
        <Box>
          <Typography variant="h6">Introduce yourself as a FlyPool Ambassador</Typography>
          <Typography variant="body2" sx={{ color: 'gray' }}>January 31, 2024 - 10:01 am</Typography>
          <Button variant="outlined" sx={{ marginTop: '10px' }}>VIEW SUBJECT</Button>
        </Box>
      </Box>

      <Box sx={{ marginBottom: '20px', display: 'flex', alignItems: 'center' }}>
        <Box
          component="img"
          src={eventImg2}
          alt="Event 2"
          sx={{ width: '100px', height: '100px', marginRight: '10px' }}
        />
        <Box>
          <Typography variant="h6">First steps and actions to promote FlyPool at a new airport</Typography>
          <Typography variant="body2" sx={{ color: 'gray' }}>January 31, 2024 - 10:50 am</Typography>
          <Button variant="outlined" sx={{ marginTop: '10px' }}>VIEW SUBJECT</Button>
        </Box>
      </Box>

      <Box sx={{ marginBottom: '20px', display: 'flex', alignItems: 'center' }}>
        <Box
          component="img"
          src={designImg}
          alt="Design"
          sx={{ width: '100px', height: '100px', marginRight: '10px' }}
        />
        <Box>
          <Typography variant="h6">The most common challenges you face at airports</Typography>
          <Typography variant="body2" sx={{ color: 'gray' }}>January 31, 2024 - 10:01 am</Typography>
          <Button variant="outlined" sx={{ marginTop: '10px' }}>VIEW SUBJECT</Button>
        </Box>
      </Box>

      <Box sx={{ marginTop: '40px' }}>
        <Typography variant="h5" sx={{ fontWeight: 'bold', marginBottom: '20px' }}>OUR NEWS & BLOGS</Typography>
        <Typography variant="h6">Latest News & Blogs</Typography>
        <Button variant="contained" sx={{ marginTop: '10px' }}>VIEW ALL POSTS</Button>
      </Box>
    </Box>
  );
};

export default ForumPage;
