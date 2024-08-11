import React, { useState } from 'react';
import { ListGroup, Nav, NavDropdown } from 'react-bootstrap';
import { Dashboard, TrendingUp, Settings, HelpOutline } from '@mui/icons-material';
import './Sidebar.css'; // Import des styles personnalisés

const Sidebar = () => {
  const [open, setOpen] = useState('');

  const handleToggle = (menu) => {
    setOpen(open === menu ? '' : menu);
  };

  return (
    <div className="sidebar">
      <Nav className="flex-column">
        <Nav.Link href="#" className="nav-item">
          <Dashboard className="nav-icon" />
          Dashboard
        </Nav.Link>
        <NavDropdown
          title={
            <>
              <TrendingUp className="nav-icon" />
              Formations
            </>
          }
          id="analytics-dropdown"
          className="nav-item"
          show={open === 'analytics'}
          onClick={() => handleToggle('analytics')}
        >
          <NavDropdown.Item href="#">
            <ListGroup className="nav-icon" />
            Leçons
          </NavDropdown.Item>
          <NavDropdown.Item href="#">
            <Settings className="nav-icon" />
            Settings
          </NavDropdown.Item>
        </NavDropdown>
        <Nav.Link href="#" className="nav-item">
          <HelpOutline className="nav-icon" />
          Help
        </Nav.Link>
      </Nav>
    </div>
  );
};

export default Sidebar;
