import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Avatar, InputBase, Box } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import SearchIcon from '@mui/icons-material/Search';
import logo from "../../../assets/images/logo.png";
import "./Navbar.css";
import { alpha, styled } from '@mui/material/styles';
//import { white, blue, lightBlue } from "@mui/material/colors";

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.black, 0.05),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.black, 0.1),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '20ch',
      '&:focus': {
        width: '30ch',
      },
    },
  },
}));

const Navbar = () => {
  return (
    <AppBar position="static" color="default" className="dashboard-header">
      <Toolbar className="d-flex justify-content-between">
        {/* Logo et Titre */}
        <Box className="d-flex align-items-center">
          <img src={logo} alt="Logo" height="40" className="me-2" />
        </Box>

        {/* Barre de Recherche */}
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Rechercher..."
            inputProps={{ 'aria-label': 'search' }}
          />
        </Search>

        {/* Icônes et Profil Utilisateur */}
        <Box className="header-icons d-flex align-items-center">
          <IconButton color="primary">
            <NotificationsIcon />
          </IconButton>
          <IconButton color="primary">
            <Brightness4Icon />
          </IconButton>
          <IconButton color="primary">
            <SettingsIcon />
          </IconButton>
          {/* User Menu */}
          <Box className="user-menu d-flex align-items-center ms-2">
            <Avatar alt="User Avatar" src="path/to/user-avatar.jpg" />
            <Typography className="user-name ms-2">Administrateur</Typography>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
