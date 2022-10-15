import React, { createContext, useEffect } from "react";

export const ThemeContext = createContext();

const defaultTheme = "light";
const darkTheme = "dark";

const ThemeProvider = ({ children }) => {
  const ToggleTheme = () => {
    const oldTheme = getTheme();
    const newTheme = oldTheme === defaultTheme ? darkTheme : defaultTheme;

    updateTheme(newTheme, oldTheme);
  };

  useEffect(() => {
    const applyTheme = getTheme();
    if (!applyTheme) updateTheme(defaultTheme);
    else updateTheme(applyTheme);
  }, []);

  return (
    <ThemeContext.Provider value={{ ToggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;

// reusable Theme Methods

const getTheme = () => localStorage.getItem("theme");

const updateTheme = (theme, themeToRemove) => {
  if (themeToRemove) document.documentElement.classList.remove(themeToRemove);

  document.documentElement.classList.add(theme);
  localStorage.setItem("theme", theme);
};
