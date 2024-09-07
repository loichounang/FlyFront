import React, { useState } from 'react';
import { Nav } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { ListItem, ListItemIcon, ListItemText, IconButton} from '@mui/material';
import { Dashboard, People, Forum, BarChart, Notifications, Folder, Menu} from '@mui/icons-material';
import './Sidebar.css';  // Pour les styles

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

  return (
    <div className="sidebar">
      <IconButton
        className={`sidebar-button ${isOpen ? 'active' : ''}`}
        onClick={toggleSidebar}
      >
        <Menu />
      </IconButton>
      <div className={`sidebar ${isOpen ? '' : 'sidebar-hidden'}`}>
                {/* Contenu de la sidebar */}
                <Nav defaultActiveKey="/dashboard" className="flex-column">
        <ListItem button component={Link} to="/admin/dashboard">
          <ListItemIcon>
            <Dashboard />
          </ListItemIcon>
          <ListItemText primary="Dashboard"  />
        </ListItem>
        <ListItem button component={Link} to="/admin/users">
          <ListItemIcon>
            <People />
          </ListItemIcon>
          <ListItemText primary="Utilisateurs" />
        </ListItem>
        <ListItem button component={Link} to="/admin/courses">
          <ListItemIcon>
            <Folder />
          </ListItemIcon>
          <ListItemText primary="Cours" />
        </ListItem>
        <ListItem button component={Link} to="/admin/forum">
          <ListItemIcon>
            <Forum />
          </ListItemIcon>
          <ListItemText primary="Forum" />
        </ListItem>
        <ListItem button component={Link} to="/admin/statistics">
          <ListItemIcon>
            <BarChart />
          </ListItemIcon>
          <ListItemText primary="Statistiques" />
        </ListItem>
        <ListItem button component={Link} to="/admin/notifications">
          <ListItemIcon>
            <Notifications />
          </ListItemIcon>
          <ListItemText primary="Notifications" />
        </ListItem>
      </Nav>
      </div>
    </div>
  );
};

export default Sidebar;
