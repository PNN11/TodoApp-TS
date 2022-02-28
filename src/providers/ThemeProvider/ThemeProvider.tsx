import React, {
  useState,
  createContext,
  useCallback,
  useContext,
  useEffect,
} from "react";
import {
  createTheme,
  GlobalStyles,
  ThemeProvider as Provider,
} from "@mui/material";

import { ThemeContextType } from "./ThemeProvider.types";
import {
  getItemFromLocalStorage,
  setItemToLocalStorage,
} from "helpers/localStorage";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const lightTheme = createTheme({
  palette: {
    mode: "light",
  },
});

const ThemeContext = createContext<ThemeContextType>({});
export const useTheme = () => useContext(ThemeContext);

const ThemeProvider: React.FC = ({ children }) => {
  const [theme, setTheme] = useState<string>(
    getItemFromLocalStorage("theme") || "light"
  );

  useEffect(() => {
    setItemToLocalStorage("theme", theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  }, []);

  return (
    <Provider theme={theme === "light" ? lightTheme : darkTheme}>
      <GlobalStyles
        styles={{
          body: {
            backgroundColor: theme === "light" ? "#fff" : "#121212",
          },
        }}
      />
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
        {children}
      </ThemeContext.Provider>
    </Provider>
  );
};

export default ThemeProvider;
