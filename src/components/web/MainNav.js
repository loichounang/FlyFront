import React, { useState, useEffect } from 'react';
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
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/images/logo.png';
import LoginModal from './LoginForm';
import axios from 'axios';

const MainNav = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Track authentication status
  const navigate = useNavigate();

  useEffect(() => {
    // Check authentication status on component mount
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const clearData = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refresh');
  };

  const handleLoginLogout = async () => {
    if (isAuthenticated) {
      // Handle logout
      try {
        const token = localStorage.getItem('token');
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        await axios.post(
          "http://127.0.0.1:8000/api/utilisateurs/logout/", 
          { refresh_token: localStorage.getItem("refresh") }, 
          config
        );

        clearData();
        setIsAuthenticated(false);
        navigate('/'); // Redirect to home or login page
      } catch (error) {
        const status = error.response?.status;
        const data = error.response?.data;

        let message = 'Erreur inconnue lors de la déconnexion. Veuillez réessayer.';
        if (status === 500) {
          message = "Echec de la déconnexion. Une erreur serveur s'est produite.";
        } else if (status === 404) {
          message = "Le chemin est introuvable.";
        } else if (status === 403) {
          message = data.detail || 'Accès refusé.';
        }

        console.error(message);
        alert(message); // Simple alert for errors; you might want to use a more sophisticated notification system
      }
    } else {
      // Handle login
      setLoginOpen(true);
    }
  };

  const closeLogin = () => setLoginOpen(false);

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
            onClick={handleLoginLogout}
            variant="contained"
            sx={{
              backgroundColor: '#66bfbe',
              color: 'white',
              '&:hover': { backgroundColor: '#55a4a3' },
              fontFamily: 'Poppins, sans-serif', // Apply Poppins font
            }}
          >
            {isAuthenticated ? 'Se déconnecter' : 'Se connecter'}
          </Button>
        </Box>
        <LoginModal 
            show={loginOpen}
            handleClose={closeLogin}
          />

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
                <ListItem button onClick={handleLoginLogout}>
                  <PersonIcon />
                  <ListItemText primary={isAuthenticated ? 'Se déconnecter' : 'Se connecter'} />
                </ListItem>
              </List>
            </Box>
          </Drawer>
          <IconButton>
            <SearchIcon />
          </IconButton>
          <IconButton onClick={handleLoginLogout}>
            <PersonIcon />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default MainNav;
