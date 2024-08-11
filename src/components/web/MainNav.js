import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Button,
  Box,
  InputBase,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import { Search as SearchIcon, Menu as MenuIcon, Person as PersonIcon } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo.png';

const MainNav = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const menuItems = [
    { text: 'Mes cours', link: '/mes-cours' },
    { text: 'Catégories', link: '/mes-catégories' },
    { text: 'Team', link: '#' },
  ];

  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: '#ffffff',
        borderBottom: '2px solid #66bfbe',
        top: '40px', // Offset to be directly below the TopNav
        left: 0,
        right: 0,
        zIndex: 1200,
        fontFamily: 'Poppins, sans-serif', // Apply Poppins font
      }}
    >
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {/* Logo */}
        <Button component={Link} to="/" sx={{ padding: 0, minWidth: 0 }}>
          <Box component="img" src={logo} alt="Flypool Logo" sx={{ height: '50px' }} />
        </Button>

        {/* Search Bar */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexGrow: 1 }}>
          <Box className="SearchBar" display={{ xs: 'none', md: 'flex' }} alignItems="center">
            <InputBase placeholder="Rechercher..." className="searchInput" />
            <Button>
              <SearchIcon />
            </Button>
          </Box>
        </Box>

        {/* Menu Items and Connection Icon */}
        <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
          {menuItems.map((item, index) => (
            <Button
              key={index}
              component={Link}
              to={item.link}
              sx={{ color: '#13017c', fontFamily: 'Poppins, sans-serif' }}
            >
              {item.text}
            </Button>
          ))}
          <Button
            variant="contained"
            sx={{
              backgroundColor: '#66bfbe',
              color: 'white',
              '&:hover': { backgroundColor: '#55a4a3' },
              fontFamily: 'Poppins, sans-serif', // Apply Poppins font
            }}
          >
            Se connecter
          </Button>
        </Box>

        {/* Mobile Menu */}
        <Box sx={{ display: { xs: 'flex', md: 'none' }, alignItems: 'center' }}>
          <IconButton onClick={toggleDrawer(true)}>
            <MenuIcon />
          </IconButton>
          <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
            <Box
              sx={{ width: 250 }}
              role="presentation"
              onClick={toggleDrawer(false)}
              onKeyDown={toggleDrawer(false)}
            >
              <List>
                {menuItems.map((item, index) => (
                  <ListItem button key={index} component={Link} to={item.link}>
                    <ListItemText primary={item.text} />
                  </ListItem>
                ))}
                <ListItem button>
                  <PersonIcon />
                </ListItem>
              </List>
            </Box>
          </Drawer>
          <IconButton>
            <SearchIcon />
          </IconButton>
          <IconButton>
            <PersonIcon />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default MainNav;
