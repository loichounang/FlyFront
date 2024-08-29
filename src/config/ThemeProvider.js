import React, { createContext, useState, useContext } from 'react';

// Crée le contexte
const ThemeContext = createContext();

// Hook pour accéder au contexte
export const useTheme = () => useContext(ThemeContext);

// Thèmes disponibles
const themes = {
  light: 'lightTheme',
  dark: 'darkTheme',
  orange: 'orangeTheme',
  blue: 'blueTheme',
  custom: 'customTheme'
};

// Fournisseur de contexte
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(themes.dark); // Par défaut : Dark Theme

  const toggleTheme = (newTheme) => {
    setTheme(themes[newTheme]);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme}>{children}</div>
    </ThemeContext.Provider>
  );
};
