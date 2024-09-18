// src/pages/UserProfile.js

import React from 'react';
import { Box } from '@mui/material';
import UserProfile from '../../components/web/UserProfile';

const UserProfilePage = () => {
  return (
    <Box sx={{ fontFamily: 'Poppins, sans-serif' }}>
        <UserProfile />
    </Box>
  );
};

export default UserProfilePage;
