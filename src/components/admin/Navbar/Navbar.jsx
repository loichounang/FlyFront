import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Avatar, Menu, MenuItem } from '@mui/material';
import { InputBase } from '@mui/material';
import { Search as SearchIcon, Settings} from '@mui/icons-material';
import './Navbar.css';  // Pour les styles
import ThemeSwitcher from '../../../config/ThemeSwitcher';
import { useNavigate } from 'react-router-dom';
//import APIBaseURL from '../../../services/ApiServices';
import { useSnackbar } from "notistack";
import axios from 'axios';

const DashboardNavbar = ({ theme, toggleTheme }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar(); // Utilisez `useSnackbar` pour afficher les notifications

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const clearData = () => {
    localStorage.clear();
  }

  const showErrorNotification = (title, duration, type) => {
    enqueueSnackbar(title, {
      variant: type,
      autoHideDuration: duration,
    });
  }

  const handleLogout = async () => {
    try {
        // Récupération du token d'authentification de l'utilisateur connecté
        const token = localStorage.getItem('token'); // Assurez-vous que le token est stocké lors de la connexion
  
        // Configuration des en-têtes avec le token
        const config = {
            headers: {
                Authorization: `Bearer ${token}`, // Ajoutez le token Bearer dans les en-têtes
            },
        };
  
        const logoutResponse = await axios.post(
            "http://127.0.0.1:8000/api/utilisateurs/logout/", 
            { refresh_token: localStorage.getItem("refresh") }, 
            config // Ajoutez les en-têtes ici
        );
  
        if (logoutResponse.status >= 200 && logoutResponse.status < 300) {
            enqueueSnackbar(logoutResponse.data.message || 'Déconnexion réussie', {
                variant: 'success',
                autoHideDuration: 3000,
            });
  
            setTimeout(() => {
                navigate('/'); // Redirige vers la page d'accueil ou de connexion
                clearData(); // Nettoie les données stockées (token, user info, etc.)
            }, 3000);
        }
    } catch (error) {
        // Accéder correctement à l'objet d'erreur retourné par Axios
        const status = error.response?.status;
        const data = error.response?.data; // Utilisez `error.response` pour obtenir le statut de l'erreur
        switch (status) {
            case 500:
                showErrorNotification("Echec de la déconnexion. Une erreur serveur s'est produite.", {
                    anchorOrigin: { vertical: 'top', horizontal: 'right' },
                    ContentProps: {
                        style: {
                            backgroundColor: '#ffa445', // Change le fond de cette notification seulement
                            color: '#fff',               // Couleur du texte
                            fontSize: '16px',            // Ajuste la taille du texte
                            borderRadius: '8px',         // Coins arrondis
                        },
                    },
                    variant: 'error',
                    autoHideDuration: 5000,
                });
                break;
            case 404:
                showErrorNotification("Le chemin est introuvable.", {
                    anchorOrigin: { vertical: 'top', horizontal: 'right' },
                    ContentProps: {
                        style: {
                            backgroundColor: '#eac255', // Change le fond de cette notification seulement
                            color: '#fff',               // Couleur du texte
                            fontSize: '16px',            // Ajuste la taille du texte
                            borderRadius: '8px',         // Coins arrondis
                        },
                    },
                    variant: 'error',
                    autoHideDuration: 5000,
                });
                break;
            case 403:
                showErrorNotification(data.detail, {
                    variant: 'error',
                    autoHideDuration: 5000,
                });
                break;
            default:
                showErrorNotification(data.detail ? "Code d'erreur : " + status + " Message : " + data.detail : "Erreur inconnue lors de la déconnexion. Veuillez réessayer.", {
                    variant: "error",
                    autoHideDuration: 5000,
                });
                break;
        }
    }
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
          <MenuItem onClick={() => {
            handleMenuClose();
            handleLogout();
          }}>
            Déconnexion
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default DashboardNavbar;
