import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Avatar, Menu, MenuItem } from '@mui/material';
import { InputBase } from '@mui/material';
import { Search as SearchIcon, Settings} from '@mui/icons-material';
import './Navbar.css';  // Pour les styles
import ThemeSwitcher from '../../../config/ThemeSwitcher';

const DashboardNavbar = ({ theme, toggleTheme }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleSearchChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);

    // Logique pour effectuer la recherche automatique
    if (query) {
      console.log('Recherche automatique pour : ', query);
      // Appelle une fonction pour effectuer la recherche ou filtrer les résultats ici
    }
  };

  return (
    <AppBar position="static" className="navbar-custom">
      <Toolbar className="toolbar-custom">
        <div className="search-container">
          <div className="search-icon">
            <SearchIcon />
          </div>
          <InputBase
            placeholder="Rechercher..."
            classes={{
              root: 'inputRoot',
              input: 'inputInput',
            }}
            inputProps={{ 'aria-label': 'search' }}
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
        
        <div className="profile-section">
          <ThemeSwitcher 
            styles={{
              float: "right",
              position: "relative",
              right: "0",
            }}
          />
          <IconButton onClick={toggleTheme} color="inherit">
            <Settings/>
          </IconButton>
          <IconButton edge="end" onClick={handleProfileMenuOpen} color="inherit">
            <Avatar alt="User Avatar" src="/static/images/avatar/1.jpg" />
          </IconButton>
          
        </div>
        
        <Menu
          anchorEl={anchorEl}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          keepMounted
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
          <MenuItem onClick={handleMenuClose}>Mon compte</MenuItem>
          <MenuItem onClick={handleMenuClose}>Déconnexion</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default DashboardNavbar;
