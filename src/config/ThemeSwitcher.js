import React, { useState } from 'react';
import { useTheme } from './ThemeProvider';
import './themeSwitcher.css';

const ThemeSwitcher = ({styles}) => {
  const { toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const themes = [
    { name: 'Light Theme', value: 'light', color: '#ffffff' },
    { name: 'Dark Theme', value: 'dark', color: '#333333' },
    { name: 'Orange Theme', value: 'orange', color: '#ff9800' },
    { name: 'Blue Theme', value: 'blue', color: '#2196f3' },
    { name: 'Custom Theme', value: 'custom', color: '#9c27b0' },
  ];

  const handleToggle = () => setIsOpen(!isOpen);

  return (
    <div className="theme-switcher-container" style={{...styles}}>
      <button onClick={handleToggle} className="theme-switcher-button" style={{textAlign: "right"}}>Change Theme</button>
      {isOpen && (
        <ul className="theme-list">
          {themes.map((theme) => (
            <li key={theme.value} onClick={() => toggleTheme(theme.value)} className="theme-item">
              <span className="theme-color" style={{ backgroundColor: theme.color }}></span>
              {theme.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ThemeSwitcher;
