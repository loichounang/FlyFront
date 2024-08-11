import React from 'react';
import { AppBar, Toolbar, Typography, Box } from '@mui/material';
import { styled } from '@mui/system';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';

const CustomToolbar = styled(Toolbar)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '40px',  // Set the desired height
  padding: '0',  // Remove padding if necessary
}));

const CustomTypography = styled(Typography)(({ theme }) => ({
  fontFamily: 'Poppins, sans-serif',
  fontSize: '13px',
  textAlign: 'center',
  flex: 1,
  lineHeight: '40px',  // Align text vertically
  [theme.breakpoints.down('sm')]: {
    fontSize: '10px',  // Smaller font size for small screens
  },
  marginBottom: '17px', // Adjust margin to move text up
}));

const CustomIcon = styled(Box)(({ theme }) => ({
  fontSize: '18px',
  [theme.breakpoints.down('sm')]: {
    fontSize: '15px',
  },
  marginBottom: '17px', // Adjust margin to move icon up
}));

const Separator = styled(Box)(({ theme }) => ({
  height: '24px',
  width: '1px',
  backgroundColor: '#ffffff',
  margin: '0 15px',
  marginBottom: '17px', // Adjust margin 
}));

const TopNav = () => {
  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: '#13017c',
        color: '#ffffff',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1300,
        height: '40px',  // Ensure height matches Toolbar
      }}
    >
      <CustomToolbar>
        <Box display="flex" alignItems="center" sx={{ marginRight: '20px' }}>
          <CustomIcon as={EmailIcon} />
          <CustomTypography variant="body2" sx={{ marginLeft: '5px' }}>Info@flypool.me</CustomTypography>
        </Box>
        <Separator />
        <Box display="flex" alignItems="center">
          <CustomIcon as={PhoneIcon} />
          <CustomTypography variant="body2" sx={{ marginLeft: '5px' }}>+33 9 86 87 49 30</CustomTypography>
        </Box>
      </CustomToolbar>
    </AppBar>
  );
};

export default TopNav;
